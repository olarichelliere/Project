<?php

use PHPUnit\Framework\TestCase;

require __DIR__.'/../api/controllers/review_controller.php';
require_once __DIR__.'/../api/models/base_model.php';
require __DIR__.'/../api/models/review_model.php';

final class ReviewControllerTest extends TestCase
{
    public function testCreateWithNoReview(): void
    {
        $controller = new ReviewController(null);
        
        $payload = array('star' => 3, 'idItem' => 2);
        
        $this->expectException(Exception::class);
        $this->expectExceptionCode(400);
        $this->expectExceptionMessage('`review` should be provided!');
        
        $controller->createReviews($payload,1);
    }

    public function testCreateWithNoidItem(): void
    {
        $controller = new ReviewController(null);
        
        $payload = array('star' => 3, 'review' => '123');
        
        $this->expectException(Exception::class);
        $this->expectExceptionCode(400);
        $this->expectExceptionMessage('`idItem` should be provided!');
        
        $controller->createReviews($payload,1);
    }

    public function testCreateWithValidData(){
        
        // Setting Up the Mock Object for ReviewModel
        $mockModel = $this->createMock(ReviewModel::class);
        
        $mockModel->expects($this->once())
                  ->method('createReview');
        
        $payload = array('star' => 3, 'review' => '123', 'idItem' => 2);
        
        $controller = new ReviewController($mockModel);
        $controller->createReviews($payload,1);
    }



}