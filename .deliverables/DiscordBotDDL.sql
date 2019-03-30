-- Database: DiscordBot
-- ------------------------------------------------------

--
-- Table structure for table collectibles
--
CREATE TABLE collectibles (
  CollectibleID int(11) NOT NULL AUTO_INCREMENT,
  ResourceID int(11) NOT NULL,
  Name varchar(20) NOT NULL,
  Currency int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (CollectibleID),
  KEY ResourceID (ResourceID)
);

--
-- Table structure for table commands
--
CREATE TABLE commands (
  CommandID int(11) NOT NULL AUTO_INCREMENT,
  Name varchar(20) NOT NULL,
  Description varchar(100) DEFAULT NULL,
  ResourceID int(11) DEFAULT NULL,
  PRIMARY KEY (CommandID)
);

--
-- Table structure for table currencytransactions
--
CREATE TABLE currencytransactions (
  CreditTransactionID int(15) NOT NULL AUTO_INCREMENT,
  FromDiscordUserID varchar(20) NOT NULL,
  ToDiscordUserID varchar(20) NOT NULL,
  Date timestamp NOT NULL,
  Amount int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (CreditTransactionID)
);

--
-- Table structure for table discordusercollectibles
--
CREATE TABLE discordusercollectibles (
  DiscordUserID varchar(20) NOT NULL,
  CollectibleID int(11) NOT NULL,
  Date timestamp NULL DEFAULT NULL,
  KEY DiscordUserID (DiscordUserID),
  KEY CollectibleID (CollectibleID)
);

--
-- Table structure for table discorduserraffles
--
CREATE TABLE discorduserraffles (
  DiscordUserID varchar(20) NOT NULL,
  RaffleID int(11) NOT NULL,
  JoinDate timestamp NOT NULL,
  PRIMARY KEY (DiscordUserID,RaffleID)
);

--
-- Table structure for table discordusers
--
CREATE TABLE discordusers (
  DiscordUserID varchar(20) NOT NULL,
  UserName varchar(32) NOT NULL,
  UserHash int(4) NOT NULL,
  Currency int(11) NOT NULL DEFAULT '0',
  LastDaily timestamp NULL DEFAULT NULL,
  ResourceID int(11) NOT NULL,
  PRIMARY KEY (DiscordUserID)
);

--
-- Table structure for table discorduserservers
--
CREATE TABLE discorduserservers (
  DiscordUserID varchar(20) NOT NULL,
  ServerID varchar(20) NOT NULL,
  JoinDate timestamp NOT NULL,
  PRIMARY KEY (DiscordUserID,ServerID),
  KEY ServerID (ServerID)
);

--
-- Table structure for table discordusersocialmedias
--
CREATE TABLE discordusersocialmedias (
  DiscordUserID varchar(20) NOT NULL,
  SocialMediaID int(11) NOT NULL,
  Handle varchar(200) NOT NULL,
  KEY DiscordUserID (DiscordUserID),
  KEY SocialMediaID (SocialMediaID)
);

--
-- Table structure for table raffles
--
CREATE TABLE raffles (
  RaffleID int(11) NOT NULL AUTO_INCREMENT,
  ServerID varchar(20) NOT NULL,
  Name varchar(50) NOT NULL,
  EndTime timestamp NULL DEFAULT NULL,
  Currency int(11) NOT NULL DEFAULT '0',
  DiscordUserID varchar(20) NOT NULL,
  PRIMARY KEY (RaffleID,ServerID),
  UNIQUE KEY Name_UNIQUE (Name),
  KEY ServerID (ServerID)
);

--
-- Table structure for table rafflehistory
--
CREATE TABLE rafflehistory (
  RaffleID INT(11) NOT NULL,
  ServerID VARCHAR(20) NOT NULL,
  Name VARCHAR(50) NOT NULL,
  EndTime TIMESTAMP NULL,
  Currency INT(11) NOT NULL,
  DiscordUserID VARCHAR(20) NOT NULL,
  WinnerDiscordUserID VARCHAR(20) NOT NULL,
  PRIMARY KEY (RaffleID, ServerID)
);

--
-- Table structure for table resources
--
CREATE TABLE resources (
  ResourceID int(11) NOT NULL AUTO_INCREMENT,
  Link varchar(2000) DEFAULT NULL,
  PRIMARY KEY (ResourceID)
);

--
-- Table structure for table servers
--
CREATE TABLE servers (
  ServerID varchar(20) NOT NULL,
  ServerURL varchar(200) DEFAULT NULL,
  CreationDate timestamp NOT NULL,
  ResourceID int(11) DEFAULT NULL,
  serverscol varchar(45) DEFAULT NULL,
  PRIMARY KEY (ServerID)
);

--
-- Table structure for table socialmedias
--
CREATE TABLE socialmedias (
  SocialMediaID int(11) NOT NULL AUTO_INCREMENT,
  Title varchar(20) NOT NULL,
  URL varchar(200) NOT NULL,
  ResourceID int(11) NOT NULL,
  PRIMARY KEY (SocialMediaID),
  KEY ResourceID (ResourceID)
);
