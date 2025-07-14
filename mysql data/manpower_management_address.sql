-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: manpower_management
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address_line1` varchar(255) DEFAULT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `door_no` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (3,'1st Cross Street','Anna Nagar','Chennai','600040','Tamil Nadu','12B'),(4,'1st Cross Street','Anna Nagar','Chennai','600040','Tamil Nadu','12B'),(5,'1st Cross Street','Anna Nagar','Chennai','600040','Tamil Nadu','12B'),(6,'1st Cross Street','Anna Nagar','Chennai','600040','Tamil Nadu','12A'),(7,'Rajaji Nagar','3rd Block','Bangalore','560010','Karnataka','404'),(8,'Main Street','Area Zone','Hyderabad','600003','Telangana','3A'),(9,'Main Street','Area Zone','Coimbatore','600004','Maharashtra','4A'),(10,'Main Street','Area Zone','Pune','600005','Kerala','5A'),(11,'Main Street','Area Zone','Mumbai','600006','Uttar Pradesh','6A'),(12,'Main Street','Area Zone','Delhi','600007','Rajasthan','7A'),(13,'Main Street','Area Zone','Kochi','600008','Delhi','8A'),(14,'Main Street','Area Zone','Lucknow','600009','Gujarat','9A'),(15,'Main Street','Area Zone','Jaipur','600010','Punjab','10A'),(16,'Main Street','Area Zone','Chennai','600011','Tamil Nadu','11A'),(17,'Main Street','Area Zone','Bangalore','600012','Karnataka','12A'),(18,'Main Street','Area Zone','Hyderabad','600013','Telangana','13A'),(19,'Main Street','Area Zone','Coimbatore','600014','Maharashtra','14A'),(20,'Main Street','Area Zone','Pune','600015','Kerala','15A'),(21,'Main Street','Area Zone','Mumbai','600016','Uttar Pradesh','16A'),(22,'Main Street','Area Zone','Delhi','600017','Rajasthan','17A'),(23,'Main Street','Area Zone','Kochi','600018','Delhi','18A'),(24,'Main Street','Area Zone','Lucknow','600019','Gujarat','19A'),(25,'Main Street','Area Zone','Jaipur','600020','Punjab','20A');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-14  8:16:40
