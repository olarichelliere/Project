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
  FULLTEXT(name, descriptionShort,descriptionLong,colour),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Insert some values to the items table
#
INSERT INTO `items` (`id`, `name`, `descriptionShort`, `descriptionLong`,`colour`, `price`,`image`, `dateTimeAdded`) 
VALUES (1,'Rado','HyperChrome Match Point Automatic','Details & Care
Blending classic Swiss precision with innovative high-tech materials, this automatic chronograph watch is a masterpiece of performance in an elegantly refined package. This limited-edition timepiece features a sporty, tennis-inspired design with practical multifunctionality.
45mm case; 13mm case depth; 21mm band width
Adjustable bracelet. Links can be removed at your local Nordstrom. Find a store.
Deployant clasp closure
Swiss automatic movement
Date window
Water-resistant to 10 ATM (100 meters)
Exhibition caseback
Super LumiNova detailing
Sapphire crystal face
Plasma high-tech ceramic/stainless steel
Swiss made
Item #5461714','Silver',7000.00,'w1.jpg','2017-09-20 18:24:11');

INSERT INTO `items` (`id`, `name`, `descriptionShort`, `descriptionLong`,`colour`, `price`,`image`, `dateTimeAdded`) 
VALUES (2,'Rado','HyperChrome Match Point Automatic','Details & Care
Blending classic Swiss precision with innovative high-tech materials, this automatic chronograph watch is a masterpiece of performance in an elegantly refined package. This limited-edition timepiece features a sporty, tennis-inspired design with practical multifunctionality.
45mm case; 13mm case depth; 21mm band width
Adjustable bracelet. Links can be removed at your local Nordstrom. Find a store.
Deployant clasp closure
Swiss automatic movement
Date window
Water-resistant to 10 ATM (100 meters)
Exhibition caseback
Super LumiNova detailing
Sapphire crystal face
Plasma high-tech ceramic/stainless steel
Swiss made
Item #5461714','Black',7000.00,'w2.jpg','2017-09-20 18:24:11');

INSERT INTO `items` (`id`, `name`, `descriptionShort`, `descriptionLong`,`colour`, `price`,`image`, `dateTimeAdded`) 
VALUES (3,'Rado','HyperChrome Match Point Automatic','Details & Care
Blending classic Swiss precision with innovative high-tech materials, this automatic chronograph watch is a masterpiece of performance in an elegantly refined package. This limited-edition timepiece features a sporty, tennis-inspired design with practical multifunctionality.
45mm case; 13mm case depth; 21mm band width
Adjustable bracelet. Links can be removed at your local Nordstrom. Find a store.
Deployant clasp closure
Swiss automatic movement
Date window
Water-resistant to 10 ATM (100 meters)
Exhibition caseback
Super LumiNova detailing
Sapphire crystal face
Plasma high-tech ceramic/stainless steel
Swiss made
Item #5461714','Silver',7000.00,'w3.jpg','2017-09-20 18:24:11');

INSERT INTO `items` (`id`, `name`, `descriptionShort`, `descriptionLong`,`colour`, `price`,`image`, `dateTimeAdded`) 
VALUES (4,'Rado','HyperChrome Match Point Automatic','Details & Care
Blending classic Swiss precision with innovative high-tech materials, this automatic chronograph watch is a masterpiece of performance in an elegantly refined package. This limited-edition timepiece features a sporty, tennis-inspired design with practical multifunctionality.
45mm case; 13mm case depth; 21mm band width
Adjustable bracelet. Links can be removed at your local Nordstrom. Find a store.
Deployant clasp closure
Swiss automatic movement
Date window
Water-resistant to 10 ATM (100 meters)
Exhibition caseback
Super LumiNova detailing
Sapphire crystal face
Plasma high-tech ceramic/stainless steel
Swiss made
Item #5461714','Black',7000.00,'w4.jpg','2017-09-20 18:24:11');

INSERT INTO `items` (`id`, `name`, `descriptionShort`, `descriptionLong`,`colour`, `price`,`image`, `dateTimeAdded`) 
VALUES (5,'Rado','HyperChrome Match Point Automatic','Details & Care
Blending classic Swiss precision with innovative high-tech materials, this automatic chronograph watch is a masterpiece of performance in an elegantly refined package. This limited-edition timepiece features a sporty, tennis-inspired design with practical multifunctionality.
45mm case; 13mm case depth; 21mm band width
Adjustable bracelet. Links can be removed at your local Nordstrom. Find a store.
Deployant clasp closure
Swiss automatic movement
Date window
Water-resistant to 10 ATM (100 meters)
Exhibition caseback
Super LumiNova detailing
Sapphire crystal face
Plasma high-tech ceramic/stainless steel
Swiss made
Item #5461714','Silver',7000.00,'w5.jpg','2017-09-20 18:24:11');

INSERT INTO `items` (`id`, `name`, `descriptionShort`, `descriptionLong`,`colour`, `price`,`image`, `dateTimeAdded`) 
VALUES (6,'Rado','HyperChrome Match Point Automatic','Details & Care
Blending classic Swiss precision with innovative high-tech materials, this automatic chronograph watch is a masterpiece of performance in an elegantly refined package. This limited-edition timepiece features a sporty, tennis-inspired design with practical multifunctionality.
45mm case; 13mm case depth; 21mm band width
Adjustable bracelet. Links can be removed at your local Nordstrom. Find a store.
Deployant clasp closure
Swiss automatic movement
Date window
Water-resistant to 10 ATM (100 meters)
Exhibition caseback
Super LumiNova detailing
Sapphire crystal face
Plasma high-tech ceramic/stainless steel
Swiss made
Item #5461714','Black',7000.00,'w7.jpg','2017-09-20 18:24:11');