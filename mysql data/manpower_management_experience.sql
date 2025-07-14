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
-- Table structure for table `experience`
--

DROP TABLE IF EXISTS `experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experience` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) DEFAULT NULL,
  `from_date` date DEFAULT NULL,
  `to_date` date DEFAULT NULL,
  `employee_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKl2jnevdmibil233ecogbvoff4` (`employee_id`),
  CONSTRAINT `FKl2jnevdmibil233ecogbvoff4` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experience`
--

LOCK TABLES `experience` WRITE;
/*!40000 ALTER TABLE `experience` DISABLE KEYS */;
INSERT INTO `experience` VALUES (1,'ABC Technologies','2022-06-01','2024-12-31',NULL),(2,'XYZ Solutions','2025-01-01','2025-06-30',NULL),(3,'ABC Technologies','2022-06-01','2024-12-31',NULL),(4,'XYZ Solutions','2025-01-01','2025-06-30',NULL),(5,'ABC Technologies','2022-06-01','2024-12-31',3),(6,'XYZ Solutions','2025-01-01','2025-06-30',NULL),(8,'ABC Technologies','2022-06-01','2024-12-31',3),(9,'Technogenesis Software Solutions Pvt Limited','2022-06-01','2024-12-31',3),(10,'TCS','2020-05-01','2022-12-31',4),(11,'Infosys','2018-03-01','2020-04-30',4),(12,'Wipro','2020-02-01','2022-08-15',5),(13,'Wipro','2019-01-01','2021-12-31',6),(14,'Tech Mahindra','2016-01-01','2018-12-31',6),(15,'Capgemini','2019-01-01','2021-12-31',7),(16,'Freshworks','2016-01-01','2018-12-31',7),(17,'Zoho','2019-01-01','2021-12-31',8),(18,'IBM','2016-01-01','2018-12-31',8),(19,'Tech Mahindra','2019-01-01','2021-12-31',9),(20,'Cognizant','2016-01-01','2018-12-31',9),(21,'Freshworks','2019-01-01','2021-12-31',10),(22,'L&T','2016-01-01','2018-12-31',10),(23,'IBM','2019-01-01','2021-12-31',11),(24,'TCS','2016-01-01','2018-12-31',11),(25,'Cognizant','2019-01-01','2021-12-31',12),(26,'Infosys','2016-01-01','2018-12-31',12),(27,'L&T','2019-01-01','2021-12-31',13),(28,'Wipro','2016-01-01','2018-12-31',13),(29,'TCS','2019-01-01','2021-12-31',14),(30,'Capgemini','2016-01-01','2018-12-31',14),(31,'Infosys','2019-01-01','2021-12-31',15),(32,'Zoho','2016-01-01','2018-12-31',15),(33,'Wipro','2019-01-01','2021-12-31',16),(34,'Tech Mahindra','2016-01-01','2018-12-31',16),(35,'Capgemini','2019-01-01','2021-12-31',17),(36,'Freshworks','2016-01-01','2018-12-31',17),(37,'Zoho','2019-01-01','2021-12-31',18),(38,'IBM','2016-01-01','2018-12-31',18),(39,'Tech Mahindra','2019-01-01','2021-12-31',19),(40,'Cognizant','2016-01-01','2018-12-31',19),(41,'Freshworks','2019-01-01','2021-12-31',20),(42,'L&T','2016-01-01','2018-12-31',20),(43,'IBM','2019-01-01','2021-12-31',21),(44,'TCS','2016-01-01','2018-12-31',21),(45,'Cognizant','2019-01-01','2021-12-31',22),(46,'Infosys','2016-01-01','2018-12-31',22),(47,'L&T','2019-01-01','2021-12-31',23),(48,'Wipro','2016-01-01','2018-12-31',23);
/*!40000 ALTER TABLE `experience` ENABLE KEYS */;
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
