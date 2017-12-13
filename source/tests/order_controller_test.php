<?php

use PHPUnit\Framework\TestCase;

require __DIR__.'/../api/controllers/order_controller.php';
require_once __DIR__.'/../api/models/base_model.php';
require __DIR__.'/../api/models/order_model.php';

final class OrderControllerTest extends TestCase
{
    public function testCreateWithNoUser(): void
    {
        $controller = new OrderController(null);
        
        $payload = array('totalPrice' => '123');
        
        $this->expectException(Exception::class);
        $this->expectExceptionCode(400);
        $this->expectExceptionMessage('`userId` should be provided!');
        
        $controller->createOrder($payload,$user);
    }

    public function testCreateWithValidData(){
        
        // Setting Up the Mock Object for ItemModel
        $mockModel = $this->createMock(OrderModel::class);
        
        $mockModel->expects($this->once())
                  ->method('createOrder');
        
        $payload = array('totalPrice' => 12);
        
        $controller = new OrderController($mockModel);
        $controller->createOrder($payload,1);
    }
}