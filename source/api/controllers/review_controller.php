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
         if (!$itemId) {
            throw new Exception('`itemId` should be provided!',400);
        } 

        return $this->model->getReviews($itemId);
    }

    public function createReviews($payload,$id){

        if (!$id) {
            throw new Exception('`id` should be provided!',400);
        } elseif (!array_key_exists('review', $payload)) {
            throw new Exception('`review` should be provided!',400);
        } elseif (!array_key_exists('idItem', $payload)) {
            throw new Exception('`idItem` should be provided!',400);
        }
        return $this->model->createReview($payload, $id);
    }
    
    public function delete($id){
        if (!$id) {
            throw new Exception('`id` should be provided!',400);
        } 
        $this->model->delete($id);
    }
}
