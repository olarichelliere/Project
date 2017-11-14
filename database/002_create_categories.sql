# 
# Create the Categories table
#
CREATE TABLE `categories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `description` text,
  `image` varchar(255) NOT NULL DEFAULT '',
  `dateTimeAdded` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Insert some values to the categories table
#
INSERT INTO `categories` (`id`, `name`, `description`,`image`) VALUES (1, 'Analog','clock-face with 12 hours, an hour hand, and a minute hand','analog.svg');
INSERT INTO `categories` (`id`, `name`, `description`,`image`) VALUES (2, 'Digital','numbers on the watch','digital.png');
INSERT INTO `categories` (`id`, `name`, `description`,`image`) VALUES (3, 'Men','watch for men','men.png');
