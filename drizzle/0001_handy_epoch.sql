CREATE TABLE `ai_suggestions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`suggestionDate` date NOT NULL,
	`mealType` enum('breakfast','lunch','dinner','snack','supper') NOT NULL,
	`suggestionText` text NOT NULL,
	`foodIds` json DEFAULT ('[]'),
	`rationale` text,
	`accepted` tinyint,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `ai_suggestions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `daily_summaries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`summaryDate` date NOT NULL,
	`totalKcal` float DEFAULT 0,
	`totalProteinG` float DEFAULT 0,
	`totalCarbG` float DEFAULT 0,
	`totalFatG` float DEFAULT 0,
	`totalSodiumMg` float DEFAULT 0,
	`totalFibreG` float DEFAULT 0,
	`totalSugarG` float DEFAULT 0,
	`mealCount` int DEFAULT 0,
	`goalAdherenceScore` float,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `daily_summaries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `meal_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`logDate` date NOT NULL,
	`mealType` enum('breakfast','lunch','dinner','snack','supper') NOT NULL,
	`loggedAt` timestamp NOT NULL DEFAULT (now()),
	`foodId` varchar(64),
	`foodName` varchar(256) NOT NULL,
	`portionDescription` varchar(128),
	`portionGrams` float,
	`servings` float DEFAULT 1,
	`kcal` float,
	`proteinG` float,
	`carbG` float,
	`fatG` float,
	`sodiumMg` float,
	`fibreG` float,
	`sugarG` float,
	`source` enum('search','restaurant','manual','ai_suggestion') DEFAULT 'search',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `meal_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`age` int,
	`gender` enum('male','female','other'),
	`heightCm` float,
	`weightKg` float,
	`activityLevel` enum('sedentary','light','moderate','active','very_active'),
	`objectives` json DEFAULT ('[]'),
	`dailyCalorieTarget` int,
	`dailySodiumTargetMg` int DEFAULT 2000,
	`dailyProteinTargetG` float,
	`dailyCarbTargetG` float,
	`dailyFatTargetG` float,
	`dailyFibreTargetG` float DEFAULT 25,
	`dietaryPreferences` json DEFAULT ('[]'),
	`onboardingCompleted` tinyint DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_profiles_userId_unique` UNIQUE(`userId`)
);
