<?php

class ItemController
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

    public function update($id,$payload){

        if (!array_key_exists('name', $payload)) {
            throw new Exception('`name` should be provided!', 400);
        } elseif (!array_key_exists('price', $payload)) {
            throw new Exception('`price` should be provided!', 400);
        }

        return $this->model->update($id,$payload);
    }

    public function create($payload)
    {

        if (!array_key_exists('name', $payload)) {
            throw new Exception('`name` should be provided!', 400);
        } elseif (!array_key_exists('price', $payload)) {
            throw new Exception('`price` should be provided!', 400);
        }

        $newId= $this->model->create($payload);
        return $this->model->getOne($newId);
    }

    public function upload($id, $file)
    {
        if ($file['error'] != 0) {
            throw new Exception('Error uploading a file: ' . $file['error'], 400);
        }
        
        $fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $fileExtension = strtolower($fileExtension);
        
        $validFileExtensions = array('gif', 'jpg', 'png');
        
        if(!in_array($fileExtension, $validFileExtensions)) {
            throw new Exception('Only gif, jpg, png files are accepted!', 400);
        }

        $destination = __DIR__."/../../images/";
        $randomName = uniqid();
        $fileName = "{$randomName}.{$fileExtension}";

        $finalFile = "{$destination}{$fileName}";
        
        if (!is_dir($destination) && !@mkdir($destination, 0755, true)) {
            throw new Exception('Error creating the images folder!', 500);
        }
        
        $success = move_uploaded_file($file['tmp_name'], $finalFile);
        
        if(!$success){
            throw new Exception('Error moving the file to images folder!', 500);
        }

        $this->model->updateImage($id, $fileName);

        return $finalFile;
    }
    public function delete($id){
        
        $this->model->delete($id);
    }
 
    public function getAllWithFilters($filters) {

        if (array_key_exists('categoryid', $filters)) {
           

            $categoryId = $filters['categoryid'];
            $categoryId = intval($categoryId);

            if ($categoryId == 0) {
                throw new Exception('Invalid categoryid. ', 400);
            }

            return $this->model->getFilteredItems($categoryId);
            
        }elseif(array_key_exists('searchTXT', $filters)){

            $searchTXT = $filters['searchTXT'];

            return $this->model->getFilteredByTXT($searchTXT);
        }
    }
}
