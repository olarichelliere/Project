<?php

use PHPUnit\Framework\TestCase;

require __DIR__.'/../api/controllers/category_controller.php';
require_once __DIR__.'/../api/models/base_model.php';
require __DIR__.'/../api/models/category_model.php';

final class CategoryControllerTest extends TestCase
{


    public function testCreateWithNoName(): void
    {
        $controller = new CategoryController(null);
        
        $payload = array('description' => '123');
        
        $this->expectException(Exception::class);
        $this->expectExceptionCode(400);
        $this->expectExceptionMessage('`name` should be provided!');
        
        $controller->create($payload);
    }

    public function testCreateWithValidData(){
        
        // Setting Up the Mock Object for ItemModel
        $mockModel = $this->createMock(CategoryModel::class);
        
        $mockModel->expects($this->once())
                  ->method('create');
        
        $payload = array('id' => 1, 'name' => 'something');
        
        $controller = new CategoryController($mockModel);
        $controller->create($payload);
    }

}