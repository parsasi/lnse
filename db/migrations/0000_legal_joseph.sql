CREATE TABLE `assets` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer,
	`updatedAt` integer,
	`path` text NOT NULL,
	`session` text,
	FOREIGN KEY (`session`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer,
	`updatedAt` integer
);
