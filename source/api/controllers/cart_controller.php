<?php

class CartController
{
    private $model;

    public function __construct($model){
        $this->model = $model;
    }
    
    public function getUserCart($userId){
      
        $total=$this->model->getTotal($userId);
    
        return $userCart=array(
            "total"=> $total,
            //"items"=> $this->model->getItems($userId)
            "items"=> $this->model->getFilteredItems($userId)
        );
    }

    public function add($payload, $user){
        // Validating the data inside the JSON

        if (!$user) {
            throw new Exception('`userId` should be provided!', 400);
        } elseif (!array_key_exists('itemId', $payload)) {
            throw new Exception('`item` should be provided!', 400);
        }
      
        return $this->model->addToCart($payload->itemId, $user);
    }
}


    