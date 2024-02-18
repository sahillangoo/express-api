/*
  Warnings:

  - The values [LIVE,ARCHIVED] on the enum `UPDATE_STATUS` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `name` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `userId` on the `Update` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,belongsToId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UPDATE_STATUS_new" AS ENUM ('IN_PROGRESS', 'SHIPPED', 'DEPRECATED');
ALTER TABLE "Update" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Update" ALTER COLUMN "status" TYPE "UPDATE_STATUS_new" USING ("status"::text::"UPDATE_STATUS_new");
ALTER TYPE "UPDATE_STATUS" RENAME TO "UPDATE_STATUS_old";
ALTER TYPE "UPDATE_STATUS_new" RENAME TO "UPDATE_STATUS";
DROP TYPE "UPDATE_STATUS_old";
ALTER TABLE "Update" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS';
COMMIT;

-- DropForeignKey
ALTER TABLE "Update" DROP CONSTRAINT "Update_userId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Update" DROP COLUMN "userId",
ALTER COLUMN "title" SET DATA TYPE TEXT,
ALTER COLUMN "asset" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_belongsToId_key" ON "Product"("id", "belongsToId");
