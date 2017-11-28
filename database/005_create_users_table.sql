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

  INSERT INTO `users` (`id`, `username`, `firstName`,`password`, `isAdmin`) VALUES (1, 'user','Im a User','$2y$10$EpsEQrCFbvNBsQcs.Hf2VeZsbsx/11N1jYl173u9WuisZ6qb2PCW2',0);
  INSERT INTO `users` (`id`, `username`, `firstName`,`password`, `isAdmin`) VALUES (2, 'admin','Im a Admin','$2y$10$ExBUI1mZFjy.yavP2e7Lh.T8TQMU/JDKL6S3BYKPD1Q6zHEyPj/X2',1);



