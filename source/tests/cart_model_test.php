<?php

use PHPUnit\Framework\TestCase;

require_once __DIR__.'/../api/models/base_model.php';
require_once __DIR__.'/../api/models/cart_model.php';
require_once __DIR__.'/../tests/mockDBResult.php';


final class CartModelTest extends TestCase
{
    
    public function testCreateWithValidData(){
        
        // Setting Up the Mock Object for ItemModel
        $dbMock = $this->createMock(mysqli::class, array('query'));
        
        $dbMock->expects($this->once())
        ->method('query')
        ->will($this->returnValue(new MockDBResult()));
    
        
        $model = new CartModel($dbMock);
        $model->addToCart(1,1);
    }
}
