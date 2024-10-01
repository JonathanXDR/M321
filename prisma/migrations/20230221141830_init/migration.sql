-- CreateTable
CREATE TABLE `Book` (
    `id` VARCHAR(36) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `releaseYear` YEAR NOT NULL,
    `author` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(36) NOT NULL,
    `username` VARCHAR(30) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `firstname` VARCHAR(30) NOT NULL,
    `lastname` VARCHAR(30) NOT NULL,
    `age` TINYINT NOT NULL,
    `gender` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Note` (
    `id` VARCHAR(36) NOT NULL,
    `title` VARCHAR(100) NULL,
    `content` TEXT NOT NULL,
    `noteCollectionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NoteCollection` (
    `id` VARCHAR(36) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_noteCollectionId_fkey` FOREIGN KEY (`noteCollectionId`) REFERENCES `NoteCollection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NoteCollection` ADD CONSTRAINT `NoteCollection_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
