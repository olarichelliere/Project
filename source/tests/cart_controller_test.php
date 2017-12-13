<?php

use PHPUnit\Framework\TestCase;

require __DIR__.'/../api/controllers/cart_controller.php';
require_once __DIR__.'/../api/models/base_model.php';
require __DIR__.'/../api/models/cart_model.php';

final class CartControllerTest extends TestCase
{
    public function testCartWithUserId(): void
    {
        $controller = new CartController(null);
        $payload = array('itemId' => 5,'quantity' => 1);
    
        
        
        $this->expectException(Exception::class);
        $this->expectExceptionCode(400);
        $this->expectExceptionMessage('`userId` should be provided!');
        
        $controller->add($payload,$user);
    }   
    
    public function testCartDelete(): void
    {
        $controller = new CartController(null);
    
        $this->expectException(Exception::class);
        $this->expectExceptionCode(400);
        $this->expectExceptionMessage('`id` should be provided!');
        
        $controller->delete($id);
    }


}