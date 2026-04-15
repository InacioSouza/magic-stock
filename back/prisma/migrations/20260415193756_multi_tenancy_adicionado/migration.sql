/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `enterpriseID` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enterpriseID` to the `Movement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enterpriseID` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Movement" DROP CONSTRAINT "Movement_userID_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "enterpriseID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Movement" ADD COLUMN     "enterpriseID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "enterpriseID" INTEGER NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Enterprise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Enterprise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserApp" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'OPERATOR',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "enterpriseID" INTEGER NOT NULL,

    CONSTRAINT "UserApp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserApp_email_key" ON "UserApp"("email");

-- AddForeignKey
ALTER TABLE "UserApp" ADD CONSTRAINT "UserApp_enterpriseID_fkey" FOREIGN KEY ("enterpriseID") REFERENCES "Enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_enterpriseID_fkey" FOREIGN KEY ("enterpriseID") REFERENCES "Enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_enterpriseID_fkey" FOREIGN KEY ("enterpriseID") REFERENCES "Enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_userID_fkey" FOREIGN KEY ("userID") REFERENCES "UserApp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_enterpriseID_fkey" FOREIGN KEY ("enterpriseID") REFERENCES "Enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
