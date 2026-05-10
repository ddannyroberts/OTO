-- CreateTable
CREATE TABLE "RevenueDaily" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "guests" INTEGER NOT NULL,
    "revenue" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RevenueDaily_date_key" ON "RevenueDaily"("date");
