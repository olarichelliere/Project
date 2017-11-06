CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NULL,
  `password` VARCHAR(255) NULL,
  `firstName` VARCHAR(255) NULL,
  `lastName` VARCHAR(255) NULL,
  `street` VARCHAR(255) NULL,
  `city` VARCHAR(255) NULL,
  `province` VARCHAR(255) NULL,
  `country` VARCHAR(255) NULL,
  `postalCode` VARCHAR(255) NULL,
  `email` VARCHAR(255) NULL,
  `createdDateTime` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `lastLoginDateTime` DATETIME NULL,
  `isAdmin` INT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC));


INSERT INTO `users` (`id`, `username`, `password`,`isAdmin`)  VALUES (1,'admin','1234',1);
INSERT INTO `users` (`id`, `username`, `password`,`isAdmin`)  VALUES (2,'user','1234',0);
