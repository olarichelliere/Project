<?php

class OrderController
{
    private $model;

    public function __construct($model){
        $this->model = $model;
    }
    
    public function createOrder($payload, $user){
      
        if (!$user) {
            throw new Exception('`userId` should be provided!', 400);
        } elseif (!array_key_exists('totalPrice', $payload)) {
            throw new Exception('`totalPrice` should be provided!', 400);
        }

        return $this->model->createOrder($payload, $user);
    }

    public function createOrderItems($user, $orderId){
        if (!$user) {
            throw new Exception('`userId` should be provided!', 400);
        } elseif (!$orderId) {
            throw new Exception('`OrderId` should be provided!', 400);
        }

        return $this->model->createOrderItems($user, $orderId);
    }

    public function deleteFromCart($user){
        if (!$user) {
            throw new Exception('`userId` should be provided!', 400);
        }

        return $this->model->deleteFromCart($user);
    }
}


    