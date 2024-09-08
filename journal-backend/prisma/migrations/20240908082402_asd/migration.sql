-- CreateTable
CREATE TABLE "CLass" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "classColor" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "cLassId" INTEGER,
    CONSTRAINT "Student_cLassId_fkey" FOREIGN KEY ("cLassId") REFERENCES "CLass" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "CLass_name_key" ON "CLass"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
