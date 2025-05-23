/*
  Warnings:

  - You are about to drop the column `amazonId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `reviewsAverageRating` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `reviewsCount` on the `Product` table. All the data in the column will be lost.
  - Added the required column `asin` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviews_count` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "amazonId",
DROP COLUMN "reviewsAverageRating",
DROP COLUMN "reviewsCount",
ADD COLUMN     "asin" TEXT NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "reviews_count" INTEGER NOT NULL;
