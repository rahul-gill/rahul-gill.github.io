---
title: App Ideas 
---

## Cricket app
- db for stroring result; and some state machine like thing for app

<details>
<summary>Database schema sql</summary>

	CREATE TABLE `Tournament` (
	  `tid` int PRIMARY KEY,
	  `winnerTeamId` int,
	  `manOfTheMatchId` int,
	  `ongoing` boolean
	);
	
	CREATE TABLE `TournamentTeamStats` (
	  `statsTeamId` int PRIMARY KEY,
	  `points` int NOT NULL,
	  `matches` int NOT NULL,
	  `wins` int NOT NULL,
	  `losses` int NOT NULL
	);
	
	CREATE TABLE `Match` (
	  `matchId` int PRIMARY KEY AUTO_INCREMENT,
	  `tournamentId` int,
	  `matchStatus` ENUM ('Live', 'Finished', 'Cancelled', 'Drawn') NOT NULL,
	  `matchFormat` MatchFormat,
	  `teamAId` int NOT NULL,
	  `teamBId` int NOT NULL,
	  `currentBattingTeamId` int NOT NULL,
	  `currentBatsmanId` int NOT NULL,
	  `currentonStrikeBatsmanId` int,
	  `currentBowlerId` int NOT NULL,
	  `winnerTeamId` int,
	  `manOfTheMatchId` int
	);
	
	CREATE TABLE `Team` (
	  `teamId` int PRIMARY KEY AUTO_INCREMENT,
	  `name` varchar(255) NOT NULL,
	  `numOvers` int NOT NULL,
	  `numBowlsInCurrentOver` int NOT NULL,
	  `totalRuns` int NOT NULL,
	  `wickets` int NOT NULL
	);
	
	CREATE TABLE `Player` (
	  `playerId` int PRIMARY KEY AUTO_INCREMENT,
	  `teamId` int,
	  `battingRecord` int NOT NULL,
	  `bowlingRecord` int NOT NULL,
	  `isBowling` boolean NOT NULL,
	  `isBatting` boolean NOT NULL,
	  `WicketType` ENUM ('Bold', 'CatchOut', 'Stump', 'RunOut', 'LBW', 'Other')
	);
	
	CREATE TABLE `BattingRecord` (
	  `battingRecordId` int PRIMARY KEY AUTO_INCREMENT,
	  `numOvers` int NOT NULL,
	  `numBowls` int NOT NULL,
	  `totalRuns` int NOT NULL,
	  `sixes` int NOT NULL,
	  `fours` int NOT NULL,
	  `singleRuns` int NOT NULL,
	  `doubleRuns` int NOT NULL,
	  `tripleRuns` int NOT NULL,
	  `dotBowls` int NOT NULL
	);
	
	CREATE TABLE `BowlingRecord` (
	  `bowlingRecordId` int PRIMARY KEY AUTO_INCREMENT,
	  `numOvers` int NOT NULL,
	  `numBowls` int NOT NULL,
	  `wickets` int NOT NULL,
	  `maidenOvers` int NOT NULL,
	  `extraRunsGiven` int NOT NULL,
	  `totalRunsGiven` int NOT NULL,
	  `sixes` int NOT NULL,
	  `fours` int NOT NULL,
	  `singleRuns` int NOT NULL,
	  `doubleRuns` int NOT NULL,
	  `tripleRuns` int NOT NULL,
	  `dotBowls` int NOT NULL
	);
	
	CREATE TABLE `Bowl` (
	  `bowlId` int PRIMARY KEY AUTO_INCREMENT,
	  `teamId` int NOT NULL,
	  `batsmanId` int NOT NULL,
	  `bowlerId` int NOT NULL,
	  `overNumber` int NOT NULL,
	  `bowlNumberOfOver` int NOT NULL,
	  `ballType` ENUM ('Normal', 'Wide', 'NoBall', 'Wicket') NOT NULL,
	  `runType` ENUM ('NoRun', 'SingleRun', 'DoubleRun', 'TripleRun', 'Four', 'Six', 'Wide', 'NoBowl', 'Bye', 'LegBye') NOT NULL,
	  `runType2` ENUM ('NoRun', 'SingleRun', 'DoubleRun', 'TripleRun', 'Four', 'Six', 'Wide', 'NoBowl', 'Bye', 'LegBye')
	);
	
	ALTER TABLE `Team` ADD FOREIGN KEY (`teamId`) REFERENCES `Tournament` (`winnerTeamId`);
	
	ALTER TABLE `Player` ADD FOREIGN KEY (`playerId`) REFERENCES `Tournament` (`manOfTheMatchId`);
	
	ALTER TABLE `Team` ADD FOREIGN KEY (`teamId`) REFERENCES `TournamentTeamStats` (`statsTeamId`);
	
	ALTER TABLE `Team` ADD FOREIGN KEY (`teamId`) REFERENCES `Match` (`winnerTeamId`);
	
	ALTER TABLE `Player` ADD FOREIGN KEY (`playerId`) REFERENCES `Match` (`manOfTheMatchId`);
	
	ALTER TABLE `Team` ADD FOREIGN KEY (`teamId`) REFERENCES `Match` (`currentBattingTeamId`);
	
	ALTER TABLE `Team` ADD FOREIGN KEY (`teamId`) REFERENCES `Match` (`teamAId`);
	
	ALTER TABLE `Team` ADD FOREIGN KEY (`teamId`) REFERENCES `Match` (`teamBId`);
	
	ALTER TABLE `Player` ADD FOREIGN KEY (`playerId`) REFERENCES `Match` (`currentBatsmanId`);
	
	ALTER TABLE `Player` ADD FOREIGN KEY (`playerId`) REFERENCES `Match` (`currentonStrikeBatsmanId`);
	
	ALTER TABLE `Player` ADD FOREIGN KEY (`playerId`) REFERENCES `Match` (`currentBowlerId`);
	
	ALTER TABLE `Player` ADD FOREIGN KEY (`teamId`) REFERENCES `Team` (`teamId`);
	
	ALTER TABLE `BattingRecord` ADD FOREIGN KEY (`battingRecordId`) REFERENCES `Player` (`battingRecord`);
	
	ALTER TABLE `BowlingRecord` ADD FOREIGN KEY (`bowlingRecordId`) REFERENCES `Player` (`bowlingRecord`);
	
	ALTER TABLE `Team` ADD FOREIGN KEY (`teamId`) REFERENCES `Bowl` (`teamId`);
	
	ALTER TABLE `Player` ADD FOREIGN KEY (`playerId`) REFERENCES `Bowl` (`batsmanId`);
	
	ALTER TABLE `Player` ADD FOREIGN KEY (`playerId`) REFERENCES `Bowl` (`bowlerId`);
</details>


## College Space

- Use of the notification implemented in Recurrence app, also option to set notification at fixed time before start or at end.
- Event types(ClassEvent, ClubEvent, PersonalEvent) different kind of notifications for these(a notification at begining of day of events on that day)
- A way to post blogs/posts with support for markdow and links to other parts of the app(like embedding events/blog links in them)  
- A list of events that'll be happening; related to clubs/classes(like a workshop organized by some club)
- Lists for individual club/classes and a list for all events for the user with filters
- Comment support on events and blogs
- A way to disable events with specific properties
- community admin screen for managing that community(name, pic, description etc.) General purpose, access based on user type
- managing communities: joining a new one or exiting a joined one and list of all joined
- will/won't join class or something
- class attendance
- notes and material space; just drive links
- User Entity: name, email, college, password, communities, subscriptions(events for which the user will get notification)
- organize events like share cab, organize a late night fun event etc.

### classes_flow
- admin adds you to a class/club group
- you can leave the group if you want
- classes/club events automatically get added to your list
- **pref:** you can choose if you want to show classes to weekView/compactView/notifications
- you have a chat screen to chat with members
- each group have archives for links to previous related things
### UserMenu
- name, pic
- result, rank
- atttendence record
### Some user group ideas
- share cab
- fresher guide
### WeekView
  - weekly repeating classes
  - assignment deadlines
  - infinite scrolling event list
  - event screen axis switch
  - firebase synced ao that CR can remove classes

### Attendance
- saving classes on different time on different weekdays
- notifications
<details>
	<summary>Screen UI</summary>
	<ul>
		<li>attendence goal(75% for us)</li>
		<img src="/img/docs/51f7ba17634098a2928c3aa85297a955.png" />
		<li>sections like this</li>
		<img src="/img/docs/25b8704adf8903c03e333a81d37786ba.png" />
		<li>attendence report section</li>
		<img src="/img/docs/7dda7f16e41dc09d737356d6f7bd6b8b.png" />
		<li>week view for class schedule</li>
		<li>timline view</li>
		<img src="/img/docs/b6e9728bf2c5a88810aea3068e4b8a48.png" />
		<li>data export-import</li>
		<li>subject details: name, total classes happended, total attended(no info also: class was scheduled but no attended/not info)</li>
		<li>monthly data show(like habit tracker app)</li>
		<img src="/img/docs/6e83ba1f27da3bc0804ff1d2a6c29282.png" />
		<img src="/img/docs/e5067d36b845e80d65ce999a17465ed6.png" />
		<li>maybe this kind of screen</li>
		<img src="/img/docs/ab9ca083b0786ec030529c97c0aced63.png" />
	</ul>
</details>


- other things
	- swipe to reveal edit of subject
	- subject rearrange
	- app pin
	- late or similar option option



## Expense tracker
- Tracker model which which will contain all this info
  - categories cache(sorted by most used&recent) chips
  - set an icon (by default set by major category
  - goals
- Details of transactions with filter daily/weekly/monthly etc summary
- recurring type of expense/income
- pending type of
- incoming type of


## Video game apps
- lets play together
- stats
- share your achievement and results(today I scored this much)

## Opinions app
- Groups nad inside that group opinions and these are upvoted devoted
- A way to find the opinion you have and if someone has posted it already on the app 


## Topics
- room database migration and nested objects
- a file sharing application
- dagger2
- **create copy of prateikjena/Attend
- encrypted shared preferences and other security things

