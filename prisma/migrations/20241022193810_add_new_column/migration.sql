/*
  Warnings:

  - Added the required column `userEmail` to the `CompanyReview` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CompanyReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CompanyReview_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CompanyReview" ("companyId", "createdAt", "id", "rating") SELECT "companyId", "createdAt", "id", "rating" FROM "CompanyReview";
DROP TABLE "CompanyReview";
ALTER TABLE "new_CompanyReview" RENAME TO "CompanyReview";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
