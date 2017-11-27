# 
# Create the Categories table
#
CREATE TABLE `reviews` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idItem` int(11) NOT NULL DEFAULT 0,
  `star` int(11) NULL DEFAULT 0,
  `userId` int(11) NOT NULL DEFAULT 0,
  `review` text,
  `dateTimeAdded` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
