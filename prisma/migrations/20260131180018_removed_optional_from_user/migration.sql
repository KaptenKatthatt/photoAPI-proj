/*
 Warnings:
 
 - Made the column `user_id` on table `Album` required. This step will fail if there are existing NULL values in that column.
 - Made the column `user_id` on table `Photo` required. This step will fail if there are existing NULL values in that column.
 
 */
-- Clean up data that violates the new constraint
DELETE FROM `Album`
WHERE `user_id` IS NULL;
DELETE FROM `Photo`
WHERE `user_id` IS NULL;
-- DropForeignKey
ALTER TABLE `Album` DROP FOREIGN KEY `Album_user_id_fkey`;
-- DropForeignKey
ALTER TABLE `Photo` DROP FOREIGN KEY `Photo_user_id_fkey`;
-- DropIndex
DROP INDEX `Album_user_id_fkey` ON `Album`;
-- DropIndex
DROP INDEX `Photo_user_id_fkey` ON `Photo`;
-- AlterTable
ALTER TABLE `Album`
MODIFY `user_id` INTEGER NOT NULL;
-- AlterTable
ALTER TABLE `Photo`
MODIFY `user_id` INTEGER NOT NULL;
-- AddForeignKey
ALTER TABLE `Album`
ADD CONSTRAINT `Album_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `Photo`
ADD CONSTRAINT `Photo_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;