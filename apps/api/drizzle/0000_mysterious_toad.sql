CREATE TABLE `tag` (
	`id` int AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL,
	`text` varchar(50) NOT NULL,
	`creatorId` int,
	CONSTRAINT `tag_id` PRIMARY KEY(`id`),
	CONSTRAINT `tag_text_unique` UNIQUE(`text`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`createdAt` timestamp NOT NULL,
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`lastLoginAt` timestamp,
	`email` varchar(255) NOT NULL,
	`isEmailVerified` boolean DEFAULT false,
	`hashedPassword` varchar(128) NOT NULL,
	`salt` varchar(128) NOT NULL,
	`firstName` varchar(20),
	`lastName` varchar(20),
	`username` varchar(20),
	`profileImageUrl` varchar(255),
	`birthDate` date,
	`isAdmin` boolean DEFAULT false,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `userInterestTag` (
	`userId` int NOT NULL,
	`tagId` int NOT NULL,
	`createdAt` timestamp NOT NULL,
	CONSTRAINT `userInterestTag_userId_tagId_pk` PRIMARY KEY(`userId`,`tagId`)
);
