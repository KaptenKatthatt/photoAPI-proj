-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: localhost    Database: fedfed25_API_inluppg1_JO
-- ------------------------------------------------------
-- Server version	8.0.45-0ubuntu0.24.04.1

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
-- Table structure for table `Album`
--

DROP TABLE IF EXISTS `Album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Album` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Album_user_id_fkey` (`user_id`),
  CONSTRAINT `Album_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Album`
--

LOCK TABLES `Album` WRITE;
/*!40000 ALTER TABLE `Album` DISABLE KEYS */;
INSERT INTO `Album` VALUES (1,'Pelles Album',2),(4,'Nytt namn',1),(5,'Kalles Album',1),(6,'Kalles Album',1);
/*!40000 ALTER TABLE `Album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Photo`
--

DROP TABLE IF EXISTS `Photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Photo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Photo_user_id_fkey` (`user_id`),
  CONSTRAINT `Photo_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Photo`
--

LOCK TABLES `Photo` WRITE;
/*!40000 ALTER TABLE `Photo` DISABLE KEYS */;
INSERT INTO `Photo` VALUES (1,'Kalles foto','https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thesprucepets.com%2Fthmb%2FMcbUQHhIUU0wfROe7lD_TfesZ0g%3D%2F3551x0%2Ffilters%3Ano_upscale()%3Astrip_icc()%2Fred-lored-amazon--amazona-autumnalus--pair--close-up-200161784-001-5b4fef6f46e0fb0037792080.jpg&f=1&nofb=1&ipt=e57fbf8b9584aec86d4295a565fa5fc55bb1e7fb41ba98cddfab991d770aa2ce','Kalles första bild',1),(2,'Pelles foto1','https://www.google.pl/photo2.gif','Photo of stuff',2),(3,'Pelles foto2','https://www.google.pl/photo2.gif','Photo of stuff',2),(4,'Pelles foto3','https://www.google.pl/photo2.gif','Photo of stuff',2),(5,'Pelles foto3','https://www.google.pl/photo2.gif','Photo of stuff',2),(6,'Pelles foto3','https://www.google.pl/photo2.gif','Photo of stuff',2),(7,'Pelles foto3','https://www.google.pl/photo2.gif','Photo of stuff',2),(8,'Kalles foto','https://www.google.pl/photo2.gif','Photo of stuff',1),(9,'Kalles foto','https://www.google.pl/photo2.gif','Photo of stuff',1),(10,'Kalles foto','https://www.google.pl/photo2.gif','Photo of stuff',1),(11,'Kalles foto','https://www.google.pl/photo2.gif','Photo of stuff',1),(12,'Kalles foto','https://www.google.pl/photo2.gif','Photo of stuff',1),(13,'Pelles foto3','https://www.google.pl/photo2.gif','Photo of stuff',1);
/*!40000 ALTER TABLE `Photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'kalle@test.nu','$2b$10$bCIhxoSa0y/UlMlTwYwcS.N/mshAULvrTZoMfyHx79144zyxjC0bq','Kalle','Kallesson'),(2,'pelle@test.nu','$2b$10$I2IONGMYs3jujZPpR8t1KOOviAq0HaLg0zFmXHXZGV4mG1DMtFv86','Pelle','Pellesson');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_AlbumToPhoto`
--

DROP TABLE IF EXISTS `_AlbumToPhoto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_AlbumToPhoto` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_AlbumToPhoto_AB_unique` (`A`,`B`),
  KEY `_AlbumToPhoto_B_index` (`B`),
  CONSTRAINT `_AlbumToPhoto_A_fkey` FOREIGN KEY (`A`) REFERENCES `Album` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_AlbumToPhoto_B_fkey` FOREIGN KEY (`B`) REFERENCES `Photo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_AlbumToPhoto`
--

LOCK TABLES `_AlbumToPhoto` WRITE;
/*!40000 ALTER TABLE `_AlbumToPhoto` DISABLE KEYS */;
INSERT INTO `_AlbumToPhoto` VALUES (4,1),(1,2),(1,3),(1,4),(1,5),(1,6),(4,8),(4,9);
/*!40000 ALTER TABLE `_AlbumToPhoto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('28807a5b-378f-4c23-97ec-5d612ad50091','2bbcb8ef12059a0de3812a4d051ad9bc85e844e4779ea867bfcd2755cf89c201','2026-01-31 20:38:59.915','20260128181554_put_optional_on_user_id_for_easier_updating',NULL,NULL,'2026-01-31 20:38:59.565',1),('8b35520e-8548-4a85-8ea7-e29f9a365725','947a9413767e172a940e72a0e07f0805c138af41765e230c6bcb152675caff56','2026-01-31 20:38:59.405','20260127090250_init',NULL,NULL,'2026-01-31 20:38:59.075',1),('8fe62a70-363d-474f-bd06-9ccef42aef42','4b68165c7b863257c18dc0303be90ce518f092c157da77eed324a2113f5e0db1','2026-01-31 20:39:00.408','20260131180018_removed_optional_from_user',NULL,NULL,'2026-01-31 20:39:00.171',1),('91489660-70e9-4718-82e7-f0347fe0b4be','bbf5a226dc38199083f567521c1fed732f370b96280148b605b06748a9987bfa','2026-01-31 20:38:59.465','20260127100455_added_optional_comment_on_photo',NULL,NULL,'2026-01-31 20:38:59.408',1),('a6592d32-28c3-49e1-93d4-5217710c9741','36cbadd61c069d949bce8de4bb990e197574f95751d5c35e069693d40d24d5ea','2026-01-31 20:38:59.488','20260127134112_made_email_unique',NULL,NULL,'2026-01-31 20:38:59.467',1),('e081daa4-2201-4f81-978a-012ae6b60385','37ed70633143f3819ab86111e02dbec679abff0feab745d5d810711eaf4fa89c','2026-01-31 20:39:00.168','20260131074623_namechange_column_user_id_user_id',NULL,NULL,'2026-01-31 20:38:59.920',1),('e4979136-9146-48b2-8f07-451a06ba55a0','f23d0ffd16128a02821b6c809bd63c37273be0b44a5d8c82eeb55f4ea0275a40','2026-01-31 20:38:59.560','20260127184504_added_text_to_url_for_longer_strings',NULL,NULL,'2026-01-31 20:38:59.493',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'fedfed25_API_inluppg1_JO'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-06 15:17:59
