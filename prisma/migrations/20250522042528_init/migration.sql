/*
  Warnings:

  - Added the required column `amazonId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewsAverageRating` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewsCount` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "amazonId" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "reviewsAverageRating" INTEGER NOT NULL,
ADD COLUMN     "reviewsCount" INTEGER NOT NULL;
