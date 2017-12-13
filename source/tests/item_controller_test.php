<?php

use PHPUnit\Framework\TestCase;

require __DIR__.'/../api/controllers/item_controller.php';
require_once __DIR__.'/../api/models/base_model.php';
require __DIR__.'/../api/models/item_model.php';

final class ItemControllerTest extends TestCase
{
    public function testCreateWithNoPrice(): void
    {
        $controller = new ItemController(null);
        
        $payload = array('name' => 'something');
        
        $this->expectException(Exception::class);
        $this->expectExceptionCode(400);
        $this->expectExceptionMessage('`price` should be provided!');
        
        $controller->create($payload);
    }

    public function testCreateWithNoName(): void
    {
        $controller = new ItemController(null);
        
        $payload = array('price' => 12);
        
        $this->expectException(Exception::class);
        $this->expectExceptionCode(400);
        $this->expectExceptionMessage('`name` should be provided!');
        
        $controller->create($payload);
    }

    public function testCreateWithValidData(){
        
        // Setting Up the Mock Object for ItemModel
        $mockModel = $this->createMock(ItemModel::class);
        
        $mockModel->expects($this->once())
                  ->method('create');
        
        $payload = array('name' => 'something', 'price' => 12);
        
        $controller = new ItemController($mockModel);
        $controller->create($payload);
    }


    public function testUpdateWithNoPrice(): void  {
        $controller = new ItemController(null);
        
        $payload = array('name' => 'something');
        $id = 1;
        
        $this->expectException(Exception::class);
        $this->expectExceptionCode(400);
        $this->expectExceptionMessage('`price` should be provided!');
        
        $controller->update($id,$payload);
    }

    public function testUpdateWithNoName(): void  {
        $controller = new ItemController(null);
        
        $payload = array('price' => 12);
        $id = 1;
        
        $this->expectException(Exception::class);
        $this->expectExceptionCode(400);
        $this->expectExceptionMessage('`name` should be provided!');
        
        $controller->update($id,$payload);
    }

    public function testUpdateWithValidData(){
        
        // Setting Up the Mock Object for ItemModel
        $mockModel = $this->createMock(ItemModel::class);
        
        $mockModel->expects($this->once())
                  ->method('update');
        
        $payload = array('name' => 'something', 'price' => 12);
        $id = 1;

        $controller = new ItemController($mockModel);
        $controller->update($id, $payload);
    }
}