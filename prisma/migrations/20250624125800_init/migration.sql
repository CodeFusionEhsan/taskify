/*
  Warnings:

  - Added the required column `uploaded_by` to the `Prospect` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prospect" ADD COLUMN     "uploaded_by" TEXT NOT NULL;
