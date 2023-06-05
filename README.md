-Backend run at loclajost:8080

-Before to use, please run this script for mysql

    CREATE DATABASE `tournament` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;


    -- tournament.team definition

    CREATE TABLE `team` (
    `id` int NOT NULL AUTO_INCREMENT,
    `description` varchar(100) NOT NULL,
    `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`,`description`)
    ) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



    -- tournament.pokemon definition

    CREATE TABLE `pokemon` (
    `id` int NOT NULL AUTO_INCREMENT,
    `team_id` int NOT NULL,
    `base_experience` int DEFAULT NULL,
    `image` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
    `types` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
    `abilities` varchar(250) DEFAULT NULL,
    `name` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-Under app/config/db.config.js set the credentials for connect to database


-For run
    node server.js