<?php

class ReviewController
{
    private $model;

    public function __construct($model)
    {
        $this->model = $model;
    }



    public function getReviews($itemId)
    {
        return $this->model->getReviews($itemId);
    }

    public function createReviews($payload,$id){
        /*
        if (!array_key_exists('name', $payload)) {
            throw new Exception('`name` should be provided!', 400);
        } elseif (!array_key_exists('price', $payload)) {
            throw new Exception('`price` should be provided!', 400);
        }
        */
        return $this->model->createReview($payload, $id);
    }
    
    public function delete($id){
        
        $this->model->delete($id);
    }
}
