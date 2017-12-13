<?php

class ItemcategoryModel extends BaseModel
{
    public $itemId;
    public $categoryId;

    protected $TableName = 'items_categories';
    protected $ModelName = 'ItemcategoryModel';

    public function getFilteredItems($categoryId) {
        $join_clause  = 'JOIN items_categories ON items.id = items_categories.itemId';
        $where_clause = "WHERE items_categories.categoryId = {$categoryId}";

        return $this->getFiltered($join_clause, $where_clause);
    }
}
