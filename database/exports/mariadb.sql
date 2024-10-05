-- -------------------------------------------------------------
-- TablePlus 5.3.2(490)
--
-- https://tableplus.com/
--
-- Database: mariadb
-- Generation Time: 2023-02-28 09:09:58.3300
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
('03870b8d-3b3a-5f3e-a299-6b0509902d30', 'Grocery List', 'Eggs\nMilk\nBread\nBananas\nChicken breasts\nBroccoli\nCarrots\nPotatoes\nCheese', 'b9c13633-8e11-59e2-bb62-97f47f774b8e'),
('1d0cd0bc-78c4-5175-b6ba-8581f6de599a', 'Brainstorming Session', 'Generated ideas for new product features\nDiscussed customer feedback and pain points\nPrioritized features based on impact and feasibility\nAssigned tasks to team members for next steps\nScheduled follow-up meeting', 'b9c13633-8e11-59e2-bb62-97f47f774b8e'),
('57cac3d2-190e-5402-8c0a-c3013e526a1e', 'Meeting Notes', 'Discussed progress on current project\nIdentified roadblocks and potential solutions\nAgreed on timeline for next steps\nAssigned tasks to team members\nScheduled next meeting', 'b9c13633-8e11-59e2-bb62-97f47f774b8e'),
('b291ceb3-0c11-5171-90fc-9209b3df9dbe', 'Recipe', 'Ingredients:\n1 lb ground beef\n1 onion, chopped\n2 cloves garlic, minced\n1 can diced tomatoes\n1 can kidney beans\n1 tbsp chili powder\nSalt and pepper to taste\nDirections:\nBrown the ground beef in a large pot over medium-high heat.\nAdd the onion and garlic and cook until softened.\nAdd the diced tomatoes, kidney beans, chili powder, salt, and pepper.\nSimmer for 20 minutes, stirring occasionally.', 'e3e59734-2d21-5a09-a126-d4851f0a97dc'),
('ef4fc691-c1f1-5cf3-9ff4-f656c061b988', 'Travel Itinerary', 'Flight to Tokyo on May 5th\n3 nights in Tokyo\nTrain to Kyoto on May 8th\n4 nights in Kyoto\nTrain to Hiroshima on May 12th\n2 nights in Hiroshima\nFlight back on May 14th', '414cd979-8237-51c9-a362-fc6f20ce2657');

INSERT INTO `NoteCollection` (`id`, `title`, `userId`) VALUES
('25d10876-8f26-5369-a8fb-b73c34dd9c80', 'Exploring the World', 'f15e9d13-2766-570a-8d3e-3d766cbcf547'),
('414cd979-8237-51c9-a362-fc6f20ce2657', 'A Journey Through the Mind', 'f15e9d13-2766-570a-8d3e-3d766cbcf547'),
('4de794f8-e9b2-5025-ab64-f9b38bc193a1', 'Life Lessons Learned', 'f15e9d13-2766-570a-8d3e-3d766cbcf547'),
('b9c13633-8e11-59e2-bb62-97f47f774b8e', 'Musings and Reflections', 'e61d63b0-7824-5d39-8837-a4018b1ca868'),
('e3e59734-2d21-5a09-a126-d4851f0a97dc', 'From Ideas to Action', 'e61d63b0-7824-5d39-8837-a4018b1ca868');

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