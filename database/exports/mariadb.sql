-- -------------------------------------------------------------
-- TablePlus 5.3.2(490)
--
-- https://tableplus.com/
--
-- Database: mariadb
-- Generation Time: 2023-02-22 13:55:42.7000
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
  `noteCollectionId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Note_noteCollectionId_fkey` (`noteCollectionId`),
  CONSTRAINT `Note_noteCollectionId_fkey` FOREIGN KEY (`noteCollectionId`) REFERENCES `NoteCollection` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
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

INSERT INTO `Note` (`id`, `title`, `content`, `noteCollectionId`) VALUES
('03870b8d-3b3a-5f3e-a299-6b0509902d30', 'Note 1', 'Content 1', 'b9c13633-8e11-59e2-bb62-97f47f774b8e');

INSERT INTO `NoteCollection` (`id`, `title`, `userId`) VALUES
('b9c13633-8e11-59e2-bb62-97f47f774b8e', 'NoteCollection 1', 'f15e9d13-2766-570a-8d3e-3d766cbcf547');

INSERT INTO `User` (`id`, `username`, `password`, `firstname`, `lastname`, `age`, `gender`) VALUES
('f15e9d13-2766-570a-8d3e-3d766cbcf547', 'jonathan_russ', '$2a$10$pI9k47Ugd/u1PJ0Y1smtz.NNl/0ooSbEmM21GVzQeSUiUHpWvJKre', 'Jonathan', 'Russ', 17, 'Male');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;