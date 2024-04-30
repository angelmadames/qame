/*
  Warnings:

  - You are about to drop the column `desc` on the `Device` table. All the data in the column will be lost.
  - Added the required column `name` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL
);
INSERT INTO "new_Device" ("active", "brand", "id", "model") SELECT "active", "brand", "id", "model" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
CREATE UNIQUE INDEX "Device_name_key" ON "Device"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
