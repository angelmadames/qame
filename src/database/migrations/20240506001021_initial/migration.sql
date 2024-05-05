-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "BrowserEngine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Browser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "browserEngineId" TEXT NOT NULL,
    CONSTRAINT "Browser_browserEngineId_fkey" FOREIGN KEY ("browserEngineId") REFERENCES "BrowserEngine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DeviceBrand" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "deviceBrandId" TEXT NOT NULL,
    CONSTRAINT "Device_deviceBrandId_fkey" FOREIGN KEY ("deviceBrandId") REFERENCES "DeviceBrand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ApplicationEnvironment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BrowserEngine_name_key" ON "BrowserEngine"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Browser_name_key" ON "Browser"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceBrand_name_key" ON "DeviceBrand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Device_name_key" ON "Device"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationEnvironment_name_key" ON "ApplicationEnvironment"("name");
