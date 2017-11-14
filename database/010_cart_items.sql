# 
# Create the Cart Items table
#
CREATE TABLE `cartItems` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) unsigned NOT NULL,
  `itemId` int(11) unsigned NOT NULL,
  `quantity` int(11) unsigned NOT NULL,
  `dateTimeAdded` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
