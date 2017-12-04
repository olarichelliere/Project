<?php

class ReviewModel extends BaseModel
{
    public $id;
    public $name;
    public $descriptionShort;
    public $price;

    protected $TableName = 'reviews';
    protected $ModelName = 'ReviewModel';

    


    public function createReview($payload, $id)
    {
        // Using sprintf to format the query in a nicer way
        $query = sprintf(
            "INSERT INTO reviews SET star = '%d', review = '%s', idItem = '%d', userId = '%d'",
            $payload->star,
            $payload->review,
            $payload->idItem,
            $id
        );

        error_log("Review Generated Query is: $query");

        $result = $this->db_connection->query($query);
        
        if (!$result) {
            throw new Exception("Database error: {$this->db_connection->error}", 500);
        }

        //return $this->getOne($payload->$idItem);
    }



    /**
     * getFilteredItems returns the list of items based on the parameters specified
     */
    public function getFilteredItems($categoryId) {
        $join_clause  = 'JOIN items_categories ON items.id = items_categories.itemId';
        $where_clause = "WHERE items_categories.categoryId = {$categoryId}";

        return $this->getFiltered($join_clause, $where_clause);
    }


    public function getReviews($itemId){
    $reviews = array();
    $query = "SELECT * FROM {$this->TableName} WHERE idItem= $itemId";
    $result = $this->db_connection->query($query);

    error_log("Generated Query is: $query");

    if (!$result) {
        throw new Exception("Database error: {$this->db_connection->error}", 500);
    }

    while ($review = $result->fetch_object($this->ModelName)) {
        $reviews[] = $review;
    }

    return $reviews;
    }
}