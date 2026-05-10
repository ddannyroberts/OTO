import cors from "cors";
import express from "express";
import { fileURLToPath } from "node:url";
import prismaPkg from "@prisma/client";
import {
  EXPECTED_SPEND_PER_GUEST,
  GUEST_DELTA_ALERT_THRESHOLD,
  buildInsights,
  computeSummary,
  enrichRevenueRows,
  isValidDateString
} from "./lib/revenue-rules.js";
import { createRevenueSource } from "./services/revenue-source.js";

const { PrismaClient } = prismaPkg;

const prisma = new PrismaClient();
const PORT = 4000;
const defaultRevenueSource = createRevenueSource({ prisma });
const CACHE_TTL_MS = 60_000;

export function createApp({ revenueSource = defaultRevenueSource } = {}) {
  const app = express();
  const cacheStore = new Map();

  app.use(cors());
  app.use(express.json());

  // Simple Auth Middleware (Mock for now, can be improved with JWT)
  const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader === "Bearer secret-session-token") {
      return next();
    }
    res.status(401).json({ error: "Unauthorized" });
  };

  app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (user && user.password === password) {
      return res.json({ 
        ok: true, 
        token: "secret-session-token", // In real apps, generate a real JWT
        user: { username: user.username }
      });
    }

    res.status(401).json({ error: "Invalid username or password" });
  });

  app.get("/api/me", (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader === "Bearer secret-session-token") {
      return res.json({ username: "admin" });
    }
    res.status(401).json({ error: "Not logged in" });
  });

  app.get("/health", (_req, res) => {
    res.json({
      ok: true,
      sourceMode: revenueSource.mode
    });
  });

  app.get("/api/revenue", authMiddleware, async (req, res, next) => {
    try {
      const { startDate, endDate } = req.query;

      if (startDate && !isValidDateString(startDate)) {
        return res.status(400).json({ error: "Invalid startDate format. Use YYYY-MM-DD" });
      }
      if (endDate && !isValidDateString(endDate)) {
        return res.status(400).json({ error: "Invalid endDate format. Use YYYY-MM-DD" });
      }
      if (startDate && endDate && startDate > endDate) {
        return res.status(400).json({ error: "startDate must be <= endDate" });
      }

      const cacheKey = `${revenueSource.mode}_${startDate || "all"}_${endDate || "all"}`;
      const now = Date.now();
      const cached = cacheStore.get(cacheKey);

      if (cached && now < cached.expireAt) {
        return res.json({ source: "cache", ...cached.data });
      }

      const rawRows = await revenueSource.listRevenueRows({ startDate, endDate });
      const rows = enrichRevenueRows(rawRows);
      const summary = computeSummary(rows);
      const insights = buildInsights(rows, summary);

      const payload = {
        rows,
        summary,
        insights,
        meta: {
          sourceMode: revenueSource.mode,
          cacheTtlSeconds: CACHE_TTL_MS / 1000,
          expectedSpendPerGuest: EXPECTED_SPEND_PER_GUEST,
          guestDeltaAlertThreshold: GUEST_DELTA_ALERT_THRESHOLD
        },
        filters: {
          startDate: startDate || null,
          endDate: endDate || null
        }
      };

      cacheStore.set(cacheKey, { data: payload, expireAt: now + CACHE_TTL_MS });
      return res.json({ source: "fresh", ...payload });
    } catch (err) {
      return next(err);
    }
  });

  app.post("/api/revenue", authMiddleware, async (req, res, next) => {
    try {
      if (revenueSource.mode !== "database") {
        return res.status(400).json({ error: "Data entry is only available in database mode" });
      }

      const { date, guests, revenue, discount } = req.body ?? {};
      if (!isValidDateString(date)) {
        return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD" });
      }

      const parsedGuests = Number.parseInt(String(guests), 10);
      const parsedRevenue = Number.parseInt(String(revenue), 10);
      const parsedDiscount = Number.parseInt(String(discount), 10);

      if (!Number.isInteger(parsedGuests) || parsedGuests < 0) {
        return res.status(400).json({ error: "guests must be a non-negative integer" });
      }
      if (!Number.isInteger(parsedRevenue) || parsedRevenue < 0) {
        return res.status(400).json({ error: "revenue must be a non-negative integer" });
      }
      if (!Number.isInteger(parsedDiscount) || parsedDiscount < 0) {
        return res.status(400).json({ error: "discount must be a non-negative integer" });
      }
      if (parsedDiscount > parsedRevenue) {
        return res.status(400).json({ error: "discount must be <= revenue" });
      }

      const created = await prisma.revenueDaily.upsert({
        where: { date },
        update: {
          guests: parsedGuests,
          revenue: parsedRevenue,
          discount: parsedDiscount
        },
        create: {
          date,
          guests: parsedGuests,
          revenue: parsedRevenue,
          discount: parsedDiscount
        }
      });

      cacheStore.clear();
      return res.status(201).json({
        ok: true,
        message: "Revenue row saved",
        row: created
      });
    } catch (err) {
      return next(err);
    }
  });

  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  });

  return app;
}

export function startServer() {
  const app = createApp();
  return app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT} (source=${defaultRevenueSource.mode})`);
  });
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  startServer();
}