# 
# Create the Item - Categories table
#
CREATE TABLE `items_categories` (
  `itemId` int(11),
  `categoryId` int(11),
  `dateTimeAdded` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`itemId` , `categoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Insert some values to the item-categories table
#
INSERT INTO `items_categories` (`itemId`, `categoryId`) VALUES (1, 1);
INSERT INTO `items_categories` (`itemId`, `categoryId`) VALUES (2, 1);

INSERT INTO `items_categories` (`itemId`, `categoryId`) VALUES (3, 3);
INSERT INTO `items_categories` (`itemId`, `categoryId`) VALUES (3, 4);

INSERT INTO `items_categories` (`itemId`, `categoryId`) VALUES (4, 2);
INSERT INTO `items_categories` (`itemId`, `categoryId`) VALUES (5, 2);
INSERT INTO `items_categories` (`itemId`, `categoryId`) VALUES (6, 3);
