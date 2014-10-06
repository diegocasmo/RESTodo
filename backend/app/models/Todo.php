<?php

class Todo extends \Illuminate\Database\Eloquent\Model
{	
	protected $table = 'todos';

    protected $fillable = array('title', 'done');
}