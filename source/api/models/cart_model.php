<?php

class CartModel extends BaseModel
{
    public $id;
    public $quantity;
    public $price;

    protected $TableName = 'cartItems';
    protected $ModelName = 'CartModel';

    
    //
    // Save the payload as a new Item in to the Database
    //
    public function addToCart($itemId,$userId)
    {
        // Using sprintf to format the query in a nicer way
        $query = sprintf(
            "INSERT INTO cartItems (userId, itemId, quantity) VALUES ('%d', '%d', '%d')",
            $userId,
            $itemId,
            1
        );

        $result = $this->db_connection->query($query);
        
        if (!$result) {
            throw new Exception("Database error: {$this->db_connection->error}", 500);
        }        
    }

    public function getTotal($userId){
        $query = sprintf("SELECT SUM(items.price) as total FROM cartItems JOIN items on cartItems.itemId = items.id WHERE userId= %d", $userId);
       
        $result = $this->db_connection->query($query);
        
        if (!$result) {
            throw new Exception("Database error: {$this->db_connection->error}", 500);            
        };
       

        $total = $result->fetch_object($this->ModelName)->total;
     
        return number_format($total,2, '.', '');
    }

    public function getItems($userId){
        
        $items=array();
        $query = sprintf("SELECT items.id,items.name,cartItems.quantity,items.price,items.image
                FROM cartItems 
                JOIN items on cartItems.itemId = items.id 
                WHERE userId=%d",$userId);
        $result = $this->db_connection->query($query);
        
        if (!$result) {
            throw new Exception("Database error: {$this->db_connection->error}", 500);            
        }
        while ($item = $result->fetch_object($this->ModelName)) {
            $items[] = $item;
        }
        
       
        return $items;


    }


}
