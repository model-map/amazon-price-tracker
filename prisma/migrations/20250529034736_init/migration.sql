-- CreateTable
CREATE TABLE "ProductDataHistory" (
    "id" SERIAL NOT NULL,
    "asin" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "reviews_count" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductDataHistory_pkey" PRIMARY KEY ("id")
);
