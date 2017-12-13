<?php

use PHPUnit\Framework\TestCase;

require_once __DIR__.'/../api/models/base_model.php';
require_once __DIR__.'/../api/models/user_model.php';
require_once __DIR__.'/../tests/mockDBResult.php';

final class UserModelTest extends TestCase
{
    public function testGetWithValidData(){
        
        // Setting Up the Mock Object for ItemModel
        $dbMock = $this->createMock(mysqli::class, array('query'));
        
        $dbMock->expects($this->once())
        ->method('query')
        ->will($this->returnValue(1));
        
        $model = new UserModel($dbMock);
        $model->verifyToken('123');
    }

    public function testWriteWithValidData(){
        
        // Setting Up the Mock Object for ItemModel
        $dbMock = $this->createMock(mysqli::class, array('query'));
        
        $dbMock->expects($this->once())
        ->method('query')
        ->will($this->returnValue(1));
        
        $model = new UserModel($dbMock);
        $model->storeToken('123','123');
    }

    
}
