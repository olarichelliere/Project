CREATE DATABASE IF NOT EXISTS CCE_PHPMySQL2;

# 
# Create the items table
#
CREATE TABLE `items` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `descriptionShort` varchar(255) NOT NULL DEFAULT '',
  `descriptionLong` text,
  `colour` varchar(255) NOT NULL DEFAULT '',
  `price` float DEFAULT NULL,
  `image` varchar(255) NOT NULL DEFAULT '',
  `datetimeAdded` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Insert some values to the items table
#
INSERT INTO `items` (`id`, `name`, `descriptionShort`, `descriptionLong`,`colour`, `price`, `dateTimeAdded`) 
VALUES (1,'Expert PHP & MySQL','Book','BookLong','Black',75.34,'2017-09-20 18:24:11');

INSERT INTO `items` (`id`, `name`, `descriptionShort`, `descriptionLong`,`colour`, `price`, `dateTimeAdded`) 
VALUES (2,'Modular Programming with PHP 7','Book','BookLong','White',87.43,'2017-09-20 18:25:03');

