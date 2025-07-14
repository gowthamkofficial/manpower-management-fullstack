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
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `emp_code` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `joining_date` date DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `address_id` bigint DEFAULT NULL,
  `department_id` bigint DEFAULT NULL,
  `salary_id` bigint DEFAULT NULL,
  `date_of_joining` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKqrbsk9ljmhfje93me0n7xwdxq` (`address_id`),
  UNIQUE KEY `UK2w7fjaj0v5xnxeup7mwddestc` (`salary_id`),
  KEY `FKbejtwvg9bxus2mffsm3swj3u9` (`department_id`),
  CONSTRAINT `FKbejtwvg9bxus2mffsm3swj3u9` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`),
  CONSTRAINT `FKga73hdtpb67twlr9c1i337tyt` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`),
  CONSTRAINT `FKightkvlpv3s9rmg3mid68bw06` FOREIGN KEY (`salary_id`) REFERENCES `salary` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'gowtham.k@example.com','EMP0001','Gowtham',NULL,'K','9876543210',3,1,1,'2025-07-10'),(2,'kumar.d@example.com','EMP0011','Kumar',NULL,'D','9566721028',4,1,2,'2025-07-10'),(3,'Mahendenran.T@example.com','EMP003','mahendran',NULL,'T','9566721048',5,5,3,'2025-07-10'),(4,'arun.kumar@example.com','EMP004','Arun',NULL,'Kumar','98765437210',6,4,4,'2023-01-15'),(5,'priya.sharma@example.com','EMP005','Priya',NULL,'Sharma','9123456789',7,5,5,'2022-09-01'),(6,'karthik.m@example.com','EMP006','Karthik',NULL,'M','9034567803',8,3,6,'2023-01-01'),(7,'meena.reddy@example.com','EMP007','Meena',NULL,'Reddy','9044567804',9,4,7,'2023-01-01'),(8,'rajesh.verma@example.com','EMP008','Rajesh',NULL,'Verma','9054567805',10,5,8,'2023-01-01'),(9,'anjali.menon@example.com','EMP009','Anjali',NULL,'Menon','9064567806',11,6,9,'2023-01-01'),(10,'suresh.patil@example.com','EMP0010','Suresh',NULL,'Patil','9074567807',12,7,10,'2023-01-01'),(11,'neha.joshi@example.com','EMP0011','Neha',NULL,'Joshi','9084567808',13,8,11,'2023-01-01'),(12,'deepak.nair@example.com','EMP0012','Deepak',NULL,'Nair','9094567809',14,9,12,'2023-01-01'),(13,'sneha.iyer@example.com','EMP0013','Sneha',NULL,'Iyer','9104567810',15,1,13,'2023-01-01'),(14,'vikram.singh@example.com','EMP0014','Vikram',NULL,'Singh','9114567811',16,2,14,'2023-01-01'),(15,'divya.agarwal@example.com','EMP0015','Divya',NULL,'Agarwal','9124567812',17,3,15,'2023-01-01'),(16,'ravi.das@example.com','EMP0016','Ravi',NULL,'Das','9134567813',18,4,16,'2023-01-01'),(17,'aishwarya.nambiar@example.com','EMP0017','Aishwarya',NULL,'Nambiar','9144567814',19,5,17,'2023-01-01'),(18,'naveen.yadav@example.com','EMP0018','Naveen',NULL,'Yadav','9154567815',20,6,18,'2023-01-01'),(19,'lakshmi.pillai@example.com','EMP0019','Lakshmi',NULL,'Pillai','9164567816',21,7,19,'2023-01-01'),(20,'santosh.shetty@example.com','EMP0020','Santosh',NULL,'Shetty','9174567817',22,8,20,'2023-01-01'),(21,'preeti.chopra@example.com','EMP0021','Preeti',NULL,'Chopra','9184567818',23,9,21,'2023-01-01'),(22,'manoj.sinha@example.com','EMP0022','Manoj',NULL,'Sinha','9194567819',24,1,22,'2023-01-01'),(23,'swathi.bose@example.com','EMP0023','Swathi',NULL,'Bose','9204567820',25,2,23,'2023-01-01');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
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
