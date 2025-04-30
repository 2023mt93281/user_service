/*
  Warnings:

  - The values [banned] on the enum `User_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `latitude` on the `useraddress` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `useraddress` table. All the data in the column will be lost.
  - You are about to drop the `usersession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `usersession` DROP FOREIGN KEY `UserSession_userId_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `useraddress` DROP COLUMN `latitude`,
    DROP COLUMN `longitude`;

-- DropTable
DROP TABLE `usersession`;
