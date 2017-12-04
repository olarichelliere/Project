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

// would try to use the create from base class

    {
        $query = sprintf(
            "INSERT INTO cartItems (userId, itemId, quantity) VALUES ('%d', '%d', '%d')",
            $userId,
            $itemId,
            1
        );
        error_log("QUERY: $query");
        $result = $this->db_connection->query($query);
        
        if (!$result) {
            throw new Exception("Database error: {$this->db_connection->error}", 500);
        }        
    }

    public function addToCart1($payload){
        $this->insert($payload);
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

        /**
     * getFilteredItems returns the list of items based on the parameters specified
     */
    public function getFilteredItems($userId) {
        $join_clause  = 'JOIN items ON cartItems.itemId = items.id';
        $where_clause = "WHERE userId = {$userId}";
        //return parent::getFiltered($join_clause,$where_clause)
        return $this->getFiltered($join_clause, $where_clause);
    }

    public function getFiltered($join_clause = '', $where_clause = '')
    {
        $items = array();
        $query = "SELECT *,cartItems.id As cartId FROM {$this->TableName} {$join_clause} {$where_clause}";

        error_log("QUERY: $query");
        
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
