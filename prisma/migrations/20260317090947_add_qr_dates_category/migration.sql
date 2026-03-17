-- AlterTable
ALTER TABLE "NFT" ADD COLUMN     "category" TEXT,
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "issuedAt" TIMESTAMP(3);
