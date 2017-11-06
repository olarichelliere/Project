# 
# Create the Item - Categories table
#
CREATE TABLE `orders_items` (
  `orderId` int(11),
  `itemId` int(11),
  `quantity` int(11),
  `dateTimeAdded` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`orderId` , `itemId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


