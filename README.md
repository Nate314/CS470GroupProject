# CS470GroupProject
By Nathan Gawith, Samuel Lim, Ronny Soto
--------------------------------
Group 4 (Nathan Gawith, Samuel Lim, Ronny Soto) is creating a Discord Bot with a 2 layer architecture
Information Collection and Requirements, Scope
Architecture, Ideas, Platform, Team member role etc.

Team Member Roles:
- Nathan - Primarily on the API/DB
- Ronny - Primarily on the UI
- Sam - Primarily working on the Bot

Information Collection:
- We will be collecting information on users on the Discord Server that this bot is on and inserting that information into the DB as needed.

Scope:
- We will be setting up two ends for user interaction, namely an Angular website for statistics and settings and a command interface on the Discord platform itself, connecting to a Python API and, in doing so, a MySQL database. We had thought of adding mobile applications for the project, but our current direction seems to leave the idea out of the scope of this course. We will be making neither a mobile end nor extending our bot to other messaging platforms.

Project Ideas/Features:
- Currency system
	- Daily						=> command to receive credits (limit of 1 request per day to receive x credits)
	- Transfer					=> command to transfer x credits to another 
	- Lottery/Raffle			=> command to enter into a raffle with x credits. After some time, a random user will win all of the credits put into the raffle
	- Collectibles				=> command to purchase collectibles
- Profile Data
	- Picture, user info		=> command to return an embed of profile data for a specific user including social media links and collectibles
	- Configurable
		- Social Media links	=> add social media links to your profile
- Scholarly Data				=> Google scholar/text book search
- Rate my professor command		=> retrieves info from http://www.ratemyprofessors.com/
- Wolfram alpha command			=> command to query https://www.wolframalpha.com/

Architecture [Scope]:

     ____________________________ 
    |   _________    _________   |
    |  | Angular |  | Discord |  | Angular Site - Used by admins to look at information
    |  |   Site  |  |   Bot   |  |   about their server and perform simple queries
    |  |_________|  |_________|  |
    |  \                     /   | Discord Bot - available to use through discord
    |   \                   /    |   by sending commands as messages
    |    \_____       _____/     |
    |          \     /           | Python API - used under the hood of the Angular Site
    |         __\___/__          |   and the Discord Bot to parse requests and interact with the DB
    |        | Python  |         |
    |        |   API   |         | MySQL DB - we are using MySQL for the Database
    |        |_________|         |   which will be accessed through the Python API
    |         ____|____          |
    |        |  MySQL  |         |
    |        |    DB   |         |
    |        |_________|         |
    |____________________________|

Tables and columns for the DB [Information Collection and Requirements]:
- Servers - ServerID, URL
- DiscordUsers - DiscordUserID, UserName, Currency, LastDaily, RaffleID
- DiscordUserServers - DiscordUserID, ServerID, Date
- Raffles - RaffleID, ServerID, Name, EndTime, Currency
- Collectibles - CollectableID, Name, Picture, Currency
- DiscordUserCollectables - DiscordUserID, CollectableID, Date
- Command - CommandID, Name, Description
- Embeds - EmbedID, CommandID, Value
- SocialMedias - SocialMediaID, Name, URL, Picture
- DiscordUserSocialMedias - DiscordUserID, SocialMediaID, Handle
