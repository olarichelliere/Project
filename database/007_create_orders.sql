

# 
# Create the items table
#
CREATE TABLE `orders` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL DEFAULT 0,
  `shipToStreet` varchar(255) NOT NULL DEFAULT '',
  `shipToCity` varchar(255) NOT NULL DEFAULT '',
  `shipToProvince` varchar(255) NOT NULL DEFAULT '',
  `shipToCountry` varchar(255) NOT NULL DEFAULT '',
  `shipToPostalCode` varchar(255) NOT NULL DEFAULT '',
  `status` varchar(255) NOT NULL DEFAULT '',
  `totalPrice` varchar(255) NOT NULL DEFAULT '',
  `datetimeAdded` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

