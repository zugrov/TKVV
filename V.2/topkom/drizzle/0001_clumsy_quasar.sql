CREATE TABLE `connection_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`requestNumber` varchar(32) NOT NULL,
	`formId` varchar(64) NOT NULL,
	`settlement` varchar(128) NOT NULL,
	`address` varchar(255) NOT NULL,
	`phone` varchar(32) NOT NULL,
	`name` varchar(128),
	`tariffId` varchar(32),
	`organization` varchar(255),
	`status` enum('new','in_progress','closed') NOT NULL DEFAULT 'new',
	`consentAt` timestamp NOT NULL,
	`consentVersion` varchar(32) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `connection_requests_id` PRIMARY KEY(`id`),
	CONSTRAINT `connection_requests_requestNumber_unique` UNIQUE(`requestNumber`)
);
