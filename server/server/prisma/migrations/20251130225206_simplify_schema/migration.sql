/*
  Warnings:

  - You are about to drop the column `inStock` on the `ProductSize` table. All the data in the column will be lost.
  - You are about to drop the column `freeOver` on the `ShippingMethod` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `ShippingMethod` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductSize" DROP COLUMN "inStock";

-- AlterTable
ALTER TABLE "ShippingMethod" DROP COLUMN "freeOver",
DROP COLUMN "isActive";
