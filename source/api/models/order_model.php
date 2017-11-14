<?php

class OrderModel extends BaseModel
{


    protected $TableName = 'orders';
    protected $ModelName = 'OrderModel';

    
    //
    // Save the payload as a new Item in to the Database
    //
    public function createOrder($payload, $user)
    {
        // Using sprintf to format the query in a nicer way
        $query = sprintf(
            "INSERT INTO orders (userId, totalPrice) VALUES ('%d', '%s')",
            $user,
            $payload->totalPrice
            
        );
        error_log("createOrder SQL: $query");

        $result = $this->db_connection->query($query);
        
        if (!$result) {
            throw new Exception("Database error: {$this->db_connection->error}", 500);
        } 
        return $this->db_connection->insert_id;
    }

    public function createOrderItems($user, $orderId){
        
        // Using sprintf to format the query in a nicer way
        $query = sprintf(
            "INSERT INTO orders_items (orderId,itemId, quantity) SELECT '%d', itemId, quantity FROM cartItems WHERE userId = '%d'",
            $orderId,
            $user
        );
        error_log("createOrderItems SQL: $query");
        $result = $this->db_connection->query($query);
        
        if (!$result) {
            throw new Exception("Database error: {$this->db_connection->error}", 500);
        } 
       
    }

    public function deleteFromCart($user){
        // Using sprintf to format the query in a nicer way
        $query = sprintf(
            "DELETE FROM cartItems WHERE userId = '%d'",
            $user
        );
        error_log("deleteFromCart SQL: $query");
        $result = $this->db_connection->query($query);
        
        if (!$result) {
            throw new Exception("Database error: {$this->db_connection->error}", 500);
        } 
    }

}
