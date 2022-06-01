-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `commentId` int NOT NULL AUTO_INCREMENT,
  `authorId` int NOT NULL,
  `content` varchar(1500) NOT NULL,
  `postId` int NOT NULL,
  `insertionDate` datetime DEFAULT NULL,
  PRIMARY KEY (`commentId`),
  KEY `fk_authorId_id` (`authorId`),
  KEY `fk_postId_id` (`postId`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `user` (`userId`) ON DELETE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `post` (`postId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (86,134,'Nobody  here?',227,'2022-01-12 10:11:54'),(89,132,'Welcome Miles',227,'2022-01-12 10:14:09'),(90,131,'Hello Daniel this is Aretha',229,'2022-01-12 10:15:43'),(91,134,'Thank you Aretha',230,'2022-01-12 10:17:17'),(92,138,'Thank you and hello',230,'2022-01-12 19:34:23');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `postId` int NOT NULL AUTO_INCREMENT,
  `authorId` int NOT NULL,
  `message` varchar(1500) NOT NULL,
  `image` varchar(600) DEFAULT NULL,
  `insertionDate` datetime DEFAULT NULL,
  PRIMARY KEY (`postId`),
  KEY `fk_authorId_id` (`authorId`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `user` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=233 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (227,134,'Hi everybody!','','2022-01-12 10:11:03'),(229,132,'Hello','','2022-01-12 10:14:27'),(230,131,'Welcome everybody','','2022-01-12 10:15:24');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `position` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(600) NOT NULL,
  `avatar` varchar(1500) DEFAULT NULL,
  `insertionDate` datetime DEFAULT NULL,
  `updateDate` datetime DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `id` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (131,'Aretha','Franklin','chanteuse','7ac5f08bc04f1f6726c0aac76b99ba2dcbd2910397427d8888f1eec2285f7daa347efccc9b4c9b9691862e925aeba2735b00209865c3586c24e88be7ddd98a2a','$2b$10$DD/jr.ofuTOmeOs5I5C1XOGYs6uKZX.tpCeDp2AU2rPwHOe24vbBi','http://localhost:3000/images/aretha_franklin.jpg1641977613586.jpg','2022-01-12 09:53:33',NULL,'admin'),(132,'Daniel','craig','acteur','71f253154ce9cccbecc1db46350bfa6c55dc046bfa4ac899224a88e5e10e7f7b8774ab97d0b51ef1605ea14287b765a215f04a25c455c5bed86a187d44a344bd','$2b$10$578azRaskFc/G64WfiBTO.KFjkZfnhNTIsLmu9OBc5eq.B9INCTie','http://localhost:3000/images/Daniel_Craig_-_Film_Premiere__Spectre__007_-_on_the_Red_Carpet_in_Berlin_(22387409720)_(cropped).jpg1641977869965.jpg','2022-01-12 09:57:50',NULL,NULL),(134,'Miles','Davis','Trompettiste','a4b9cf8ec62f8c873724149745e3b0af3b2f8db278635b7c792ec9f5c1c5bf4b2f977d236707116fb26764520a3bd868db161e510a8b71ca4b6432aa003bcc20','$2b$10$duq7L22UJuyJwmBMufCf3.ntVYKIL1szQonH.ctCUbFv5Gylu5xXe','http://localhost:3000/images/miles-davis.jpg1641978618279.jpg','2022-01-12 10:10:18',NULL,NULL),(138,'Lady','Gaga','chanteuse','003c846f5992c9cd76df93cf923f51e76cba18ba87c868385c23b84bac33b102cdcc6347e9eec61e9454530cebc54d914a6d0659b67e53caf6cc7bbff07a72a3','$2b$10$g2veiT1pOeoh2viRoFCMXOBXfgJ9b/FHfUFinwTbX/yLYZLHPEu2O','http://localhost:3000/images/lady_gaga.jpg1642012412617.jpg','2022-01-12 19:33:32','2022-01-12 19:36:43',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-12 21:51:21
