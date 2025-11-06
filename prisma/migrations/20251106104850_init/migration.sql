-- CreateTable
CREATE TABLE "NFT" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "minted" BOOLEAN NOT NULL,
    "image" TEXT NOT NULL,
    "owner" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "attributes" JSONB NOT NULL,

    CONSTRAINT "NFT_pkey" PRIMARY KEY ("_id")
);
