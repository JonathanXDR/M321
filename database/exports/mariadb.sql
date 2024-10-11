-- -------------------------------------------------------------
-- TablePlus 5.3.2(490)
--
-- https://tableplus.com/
--
-- Database: mariadb
-- Generation Time: 2023-03-06 07:50:57.4970
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `Note`;
CREATE TABLE `Note` (
  `id` varchar(36) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `content` text NOT NULL,
  `userId` varchar(36) NOT NULL,
  `noteCollectionId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Note_userId_fkey` (`userId`),
  KEY `Note_noteCollectionId_fkey` (`noteCollectionId`),
  CONSTRAINT `Note_noteCollectionId_fkey` FOREIGN KEY (`noteCollectionId`) REFERENCES `NoteCollection` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Note_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `NoteCollection`;
CREATE TABLE `NoteCollection` (
  `id` varchar(36) NOT NULL,
  `title` varchar(100) NOT NULL,
  `userId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `NoteCollection_userId_fkey` (`userId`),
  CONSTRAINT `NoteCollection_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `id` varchar(36) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `age` tinyint(4) NOT NULL,
  `gender` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_username_key` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Note` (`id`, `title`, `content`, `userId`, `noteCollectionId`) VALUES
('2b1478e3-3a24-5c32-bca3-0d311fa7f89b', 'Non-Fiction', 'The Power of Habit by Charles Duhigg, Thinking, Fast and Slow by Daniel Kahneman, and Sapiens: A Brief History of Humankind by Yuval Noah Harari', 'e61d63b0-7824-5d39-8837-a4018b1ca868', 'a53d93f8-084c-5b90-9262-cd14d8a1df95'),
('3c3c3bdf-d7c8-51c7-957c-cc1e8730cf35', 'Ingredients for dinner', 'Chicken, potatoes, broccoli, and carrots', 'e61d63b0-7824-5d39-8837-a4018b1ca868', '859f60d8-7c02-5c0d-9b9a-dc764d1f39cc'),
('3e9e771a-9f9d-5e77-9a80-bec24f5c5b6e', 'Mobile App Development', 'Create a fitness tracking app for iOS and Android', 'f15e9d13-2766-570a-8d3e-3d766cbcf547', '47fbf5bb-b35a-5d57-b6b8-2b4db9f80fae'),
('45d413b1-1b7a-54d1-8dfc-6ba065ecb234', 'Web Development', 'Build an e-commerce site using React and Node.js', 'f15e9d13-2766-570a-8d3e-3d766cbcf547', '47fbf5bb-b35a-5d57-b6b8-2b4db9f80fae'),
('4a7b34eb-6e22-57d1-9652-ffeb5c61d5a5', 'Snacks for the party', 'Chips, salsa, guacamole, cheese and crackers', 'e61d63b0-7824-5d39-8837-a4018b1ca868', '859f60d8-7c02-5c0d-9b9a-dc764d1f39cc'),
('5035d5a5-5c5b-52f8-83c7-9d316b0fa7e3', 'Mountain Vacation', 'Colorado, Switzerland, or New Zealand', 'f15e9d13-2766-570a-8d3e-3d766cbcf547', '1359b3e3-4d8f-55a4-b87f-2d429c326944'),
('5a15e1a8-83e3-5c88-85a4-4d9a70a74a7a', 'Cardio Day', '20 minutes of running, 30 minutes of cycling, and 10 minutes of jumping jacks', 'f15e9d13-2766-570a-8d3e-3d766cbcf547', '31b6e17b-0779-5de1-8d8c-b08c7496db5f'),
('7f78e281-0b80-5b90-9d14-c5d5be48cf0c', 'Strength Training Day', '3 sets of bench press, 3 sets of deadlifts, and 3 sets of squats', 'f15e9d13-2766-570a-8d3e-3d766cbcf547', '31b6e17b-0779-5de1-8d8c-b08c7496db5f'),
('b5560f91-df70-5c10-81f6-63c96f2087de', 'Fiction', 'The Great Gatsby by F. Scott Fitzgerald, To Kill a Mockingbird by Harper Lee, and 1984 by George Orwell', 'e61d63b0-7824-5d39-8837-a4018b1ca868', 'a53d93f8-084c-5b90-9262-cd14d8a1df95'),
('e10fa89d-c18a-58c9-9f0b-bfaa28a8d1c7', 'Beach Vacation', 'Florida, Hawaii, or Caribbean Islands', 'f15e9d13-2766-570a-8d3e-3d766cbcf547', '1359b3e3-4d8f-55a4-b87f-2d429c326944');

INSERT INTO `NoteCollection` (`id`, `title`, `userId`) VALUES
('1359b3e3-4d8f-55a4-b87f-2d429c326944', 'Vacation Ideas', 'f15e9d13-2766-570a-8d3e-3d766cbcf547'),
('31b6e17b-0779-5de1-8d8c-b08c7496db5f', 'Workout Plan', 'f15e9d13-2766-570a-8d3e-3d766cbcf547'),
('47fbf5bb-b35a-5d57-b6b8-2b4db9f80fae', 'Project Ideas', 'f15e9d13-2766-570a-8d3e-3d766cbcf547'),
('859f60d8-7c02-5c0d-9b9a-dc764d1f39cc', 'Grocery List', 'e61d63b0-7824-5d39-8837-a4018b1ca868'),
('a53d93f8-084c-5b90-9262-cd14d8a1df95', 'Books to Read', 'e61d63b0-7824-5d39-8837-a4018b1ca868');

INSERT INTO `User` (`id`, `username`, `password`, `firstname`, `lastname`, `age`, `gender`) VALUES
('e61d63b0-7824-5d39-8837-a4018b1ca868', 'username', '$2a$10$GuvQCEzYPC4rsht7OriHPuohNy4wlNopatcizt6Yqf8PWkg58MpGq', 'username', 'password', 99, 'Credentials'),
('f15e9d13-2766-570a-8d3e-3d766cbcf547', 'jonathan_russ', '$2a$10$pI9k47Ugd/u1PJ0Y1smtz.NNl/0ooSbEmM21GVzQeSUiUHpWvJKre', 'Jonathan', 'Russ', 17, 'Male');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;