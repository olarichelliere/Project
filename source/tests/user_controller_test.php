<?php

use PHPUnit\Framework\TestCase;

require __DIR__.'/../api/controllers/user_controller.php';
require_once __DIR__.'/../api/models/base_model.php';
require __DIR__.'/../api/models/user_model.php';

final class UserControllerTest extends TestCase
{
    public function testCreateWithNoUsername(): void
    {
        $controller = new UserController(null);
        
        $payload = array('password' => 'something');
        
        $this->expectException(Exception::class);
        $this->expectExceptionCode(400);
        $this->expectExceptionMessage('`username` should be provided!');
        
        $controller->create($payload);
    }

    public function testCreateWithNoPassword(): void
    {
        $controller = new UserController(null);
        
        $payload = array('username' => 'user');
        
        $this->expectException(Exception::class);
        $this->expectExceptionCode(400);
        $this->expectExceptionMessage('`password` should be provided!');
        
        $controller->create($payload);
    }
 
    public function testLoginWithNoUsername(): void
    {
        $controller = new UserController(null);
        
        $payload = array('password' => 'something');
        
        $this->expectException(Exception::class);
        $this->expectExceptionCode(400);
        $this->expectExceptionMessage('`username` should be provided!');
        
        $controller->login($payload);
    }

    public function testLoginWithNoPassword(): void
    {
        $controller = new UserController(null);
        
        $payload = array('username' => 'user');
        
        $this->expectException(Exception::class);
        $this->expectExceptionCode(400);
        $this->expectExceptionMessage('`password` should be provided!');
        
        $controller->login($payload);
    }

   
}