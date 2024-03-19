CREATE TABLE `assets` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer,
	`updatedAt` integer,
	`path` text NOT NULL,
	`session` text,
	FOREIGN KEY (`session`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `attributes` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer,
	`updatedAt` integer,
	`entity` text,
	`key` text NOT NULL,
	`value` text NOT NULL,
	FOREIGN KEY (`entity`) REFERENCES `entities`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `entities` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer,
	`updatedAt` integer,
	`session` text,
	`asset` text,
	`type` text NOT NULL,
	`identifier` text NOT NULL,
	`data` text,
	FOREIGN KEY (`session`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`asset`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `relationships` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer,
	`updatedAt` integer,
	`from` text,
	`to` text,
	FOREIGN KEY (`from`) REFERENCES `entities`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`to`) REFERENCES `entities`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer,
	`updatedAt` integer,
	`status` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `entities_identifier_unique` ON `entities` (`identifier`);