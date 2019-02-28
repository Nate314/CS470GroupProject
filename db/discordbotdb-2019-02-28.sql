-- MySQL dump 10.13  Distrib 5.7.23, for Win64 (x86_64)
--
-- Host: localhost    Database: DiscordBot
-- ------------------------------------------------------
-- Server version	5.7.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aliases`
--

DROP TABLE IF EXISTS `aliases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aliases` (
  `AliasID` int(11) NOT NULL AUTO_INCREMENT,
  `CommandID` int(11) NOT NULL,
  `Title` varchar(20) NOT NULL,
  PRIMARY KEY (`AliasID`),
  KEY `CommandID` (`CommandID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aliases`
--

LOCK TABLES `aliases` WRITE;
/*!40000 ALTER TABLE `aliases` DISABLE KEYS */;
/*!40000 ALTER TABLE `aliases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `CategoryID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(20) NOT NULL,
  PRIMARY KEY (`CategoryID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collectibles`
--

DROP TABLE IF EXISTS `collectibles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `collectibles` (
  `CollectibleID` int(11) NOT NULL AUTO_INCREMENT,
  `ResourceID` int(11) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `Currency` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`CollectibleID`),
  KEY `ResourceID` (`ResourceID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collectibles`
--

LOCK TABLES `collectibles` WRITE;
/*!40000 ALTER TABLE `collectibles` DISABLE KEYS */;
/*!40000 ALTER TABLE `collectibles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commands`
--

DROP TABLE IF EXISTS `commands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `commands` (
  `CommandID` int(11) NOT NULL AUTO_INCREMENT,
  `CategoryID` int(11) NOT NULL,
  `DescriptionID` int(11) NOT NULL,
  `Title` varchar(20) NOT NULL,
  `RequiresArgs` tinyint(1) NOT NULL DEFAULT '1',
  `Argument` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`CommandID`),
  KEY `CategoryID` (`CategoryID`),
  KEY `DescriptionID` (`DescriptionID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commands`
--

LOCK TABLES `commands` WRITE;
/*!40000 ALTER TABLE `commands` DISABLE KEYS */;
/*!40000 ALTER TABLE `commands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `descriptions`
--

DROP TABLE IF EXISTS `descriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `descriptions` (
  `DescriptionID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(200) NOT NULL,
  `ResourceID` int(11) DEFAULT NULL,
  PRIMARY KEY (`DescriptionID`),
  KEY `ResourceID` (`ResourceID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `descriptions`
--

LOCK TABLES `descriptions` WRITE;
/*!40000 ALTER TABLE `descriptions` DISABLE KEYS */;
/*!40000 ALTER TABLE `descriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discordusercollectibles`
--

DROP TABLE IF EXISTS `discordusercollectibles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discordusercollectibles` (
  `DiscordUserID` int(11) NOT NULL,
  `CollectibleID` int(11) NOT NULL,
  `Date` timestamp NULL DEFAULT NULL,
  KEY `DiscordUserID` (`DiscordUserID`),
  KEY `CollectibleID` (`CollectibleID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discordusercollectibles`
--

LOCK TABLES `discordusercollectibles` WRITE;
/*!40000 ALTER TABLE `discordusercollectibles` DISABLE KEYS */;
/*!40000 ALTER TABLE `discordusercollectibles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discordusers`
--

DROP TABLE IF EXISTS `discordusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discordusers` (
  `DiscordUserID` int(20) NOT NULL,
  `UserName` varchar(32) NOT NULL,
  `UserHash` int(4) NOT NULL,
  `Currency` int(11) NOT NULL DEFAULT '0',
  `LastDaily` timestamp NULL DEFAULT NULL,
  `RaffleID` int(11) DEFAULT NULL,
  `ResourceID` int(11) NOT NULL,
  PRIMARY KEY (`DiscordUserID`),
  KEY `RaffleID` (`RaffleID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discordusers`
--

LOCK TABLES `discordusers` WRITE;
/*!40000 ALTER TABLE `discordusers` DISABLE KEYS */;
INSERT INTO `discordusers` VALUES (0,'Test',1234,0,NULL,NULL,9);
/*!40000 ALTER TABLE `discordusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discorduserservers`
--

DROP TABLE IF EXISTS `discorduserservers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discorduserservers` (
  `DiscordUserID` int(11) NOT NULL,
  `ServerID` int(11) NOT NULL,
  `JoinDate` timestamp NOT NULL,
  PRIMARY KEY (`DiscordUserID`,`ServerID`),
  KEY `ServerID` (`ServerID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discorduserservers`
--

LOCK TABLES `discorduserservers` WRITE;
/*!40000 ALTER TABLE `discorduserservers` DISABLE KEYS */;
/*!40000 ALTER TABLE `discorduserservers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discordusersocialmedias`
--

DROP TABLE IF EXISTS `discordusersocialmedias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discordusersocialmedias` (
  `DiscordUserID` int(11) NOT NULL,
  `SocialMediaID` int(11) NOT NULL,
  `Handle` varchar(200) NOT NULL,
  KEY `DiscordUserID` (`DiscordUserID`),
  KEY `SocialMediaID` (`SocialMediaID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discordusersocialmedias`
--

LOCK TABLES `discordusersocialmedias` WRITE;
/*!40000 ALTER TABLE `discordusersocialmedias` DISABLE KEYS */;
/*!40000 ALTER TABLE `discordusersocialmedias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `raffles`
--

DROP TABLE IF EXISTS `raffles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `raffles` (
  `RaffleID` int(11) NOT NULL AUTO_INCREMENT,
  `ServerID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `EndTime` timestamp NULL DEFAULT NULL,
  `Currency` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`RaffleID`,`Name`),
  KEY `ServerID` (`ServerID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `raffles`
--

LOCK TABLES `raffles` WRITE;
/*!40000 ALTER TABLE `raffles` DISABLE KEYS */;
/*!40000 ALTER TABLE `raffles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resources`
--

DROP TABLE IF EXISTS `resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resources` (
  `ResourceID` int(11) NOT NULL AUTO_INCREMENT,
  `Link` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`ResourceID`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resources`
--

LOCK TABLES `resources` WRITE;
/*!40000 ALTER TABLE `resources` DISABLE KEYS */;
INSERT INTO `resources` VALUES (1,'https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_1-facebook-256.png'),(2,'https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_6-twitter-256.png'),(3,'https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_3-instagram-256.png'),(4,'https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_7-snapchat-256.png'),(5,'https://cdn1.iconfinder.com/data/icons/logotypes/32/youtube-256.png'),(6,'https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_20-reddit-256.png'),(7,'https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_14-linkedin-256.png'),(8,'https://cdn2.iconfinder.com/data/icons/gaming-platforms-logo-shapes/250/discord_logo-256.png'),(9,'https://cdn.discordapp.com/avatars/309176098590294026/620608a6e942f2da95e3899a0aa5822c.jpg');
/*!40000 ALTER TABLE `resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servercategories`
--

DROP TABLE IF EXISTS `servercategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servercategories` (
  `ServerID` int(11) NOT NULL,
  `CategoryID` int(11) NOT NULL,
  `Enabled` tinyint(1) NOT NULL DEFAULT '0',
  KEY `ServerID` (`ServerID`),
  KEY `CategoryID` (`CategoryID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servercategories`
--

LOCK TABLES `servercategories` WRITE;
/*!40000 ALTER TABLE `servercategories` DISABLE KEYS */;
/*!40000 ALTER TABLE `servercategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servers`
--

DROP TABLE IF EXISTS `servers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servers` (
  `ServerID` int(20) NOT NULL,
  `ServerURL` varchar(200) DEFAULT NULL,
  `CreationDate` timestamp NOT NULL,
  PRIMARY KEY (`ServerID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servers`
--

LOCK TABLES `servers` WRITE;
/*!40000 ALTER TABLE `servers` DISABLE KEYS */;
/*!40000 ALTER TABLE `servers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialmedias`
--

DROP TABLE IF EXISTS `socialmedias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `socialmedias` (
  `SocialMediaID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(20) NOT NULL,
  `URL` varchar(200) NOT NULL,
  `ResourceID` int(11) NOT NULL,
  PRIMARY KEY (`SocialMediaID`),
  KEY `ResourceID` (`ResourceID`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialmedias`
--

LOCK TABLES `socialmedias` WRITE;
/*!40000 ALTER TABLE `socialmedias` DISABLE KEYS */;
INSERT INTO `socialmedias` VALUES (1,'Facebook','https://www.facebook.com/',1),(2,'Twitter','https://twitter.com/',2),(3,'Instagram','https://www.instagram.com/',3),(4,'Snapchat','https://www.snapchat.com/',4),(5,'YouTube','https://www.youtube.com/',5),(6,'Reddit','https://www.reddit.com/',6),(7,'LinkedIn','https://www.linkedin.com/',7),(8,'Discord','https://discordapp.com/',8);
/*!40000 ALTER TABLE `socialmedias` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-28 13:57:57
