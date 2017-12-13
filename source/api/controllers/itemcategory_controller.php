<?php

class ItemcategoryController
{
    private $model;

    public function __construct($model)
    {
        $this->model = $model;
    }

    public function getAll()
    {
        return $this->model->getAll();
    }
    
    public function getOne($id)
    {
        return $this->model->getOne($id);
    }

    public function create($payload)
    {
        if (!array_key_exists('itemId', $payload)) {
            throw new Exception('`itemId` should be provided!', 400);
        }elseif (!array_key_exists('categoryId', $payload)) {
            throw new Exception('`categoryId` should be provided!', 400);
        }

        return $this->model->create($payload);
    }

    public function getAllWithFilters($filters) {
        var_dump($filters);
        $categoryId = $filters['categoryid'];
        $categoryId = intval($categoryId);

        if ($categoryId == 0) {
            throw new Exception('Invalid categoryid. ', 400);
        }

        return $this->model->getFilteredItems($categoryId);
    }

    public function delete($id){
        
        $this->model->delete($id);
    }
}