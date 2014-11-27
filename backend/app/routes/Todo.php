<?php

use Respect\Validation\Validator as v;

$app->get('/', function() use ($app) {
	try {

		$response = [
		];

		$todos = Todo::orderBy('created_at')->get();
		foreach($todos as $todo){
			$response[] = [
				'id' => $todo->id,
				'title' => $todo->title,
				'done' => $todo->done,
				'created_at' => $todo->created_at,
				'updated_at' => $todo->updated_at
			];
		}

	} catch (Exception $e) {
		$app->response()->status(500);
		$response = 'There has been a problem with your request, please try again later.';
	} 

	echo json_encode($response);
});

$app->get('/:id', function($id) use ($app) {
	try {

		$response = [];

		$todo = \Todo::where('id', '=', $id)->get();
		if($todo->count() > 0) 
		{
			$todo = $todo->first();
			$response = $todo;
		} 
		else 
		{
			throw new ResourceNotFoundException();
		}

	} catch (Exception $e) {
		$app->response()->status($e->getCode());
		$response = $e->getMessage();
	}

	echo json_encode($response);
});

$app->post('/', function() use ($app) {
	try {

		$response = [];

		$request = $app->request;
		$request =  json_decode($request->getBody());
		$newTodo = new stdClass;
		$newTodo->title = trim($request->title);
		$newTodo->done = trim($request->done);
		$todoValidator = v::attribute('title', v::notEmpty()->length(null, 250))
						 ->attribute('done', v::int());

		if ($todoValidator->validate($newTodo)) 
		{
			$todo = new \Todo();
			$todo->title = $newTodo->title;
			$todo->done = $newTodo->done;
			if($todo->save()) 
			{
				$response = 'Todo has been successfully saved.';
			} 
			else 
			{
				throw new ServerException();
			}
		} 
		else 
		{
			throw new ValidationException();
		}
		
	} catch (Exception $e) {
		$app->response()->status($e->getCode());
		$response = $e->getMessage();
	}

	echo json_encode($response);
});

$app->put('/:id', function($id) use ($app) {
	try {

		$response = [];
		$request = $app->request;
		$request =  json_decode($request->getBody());

		$todo = \Todo::where('id', '=', $id);
		if($todo->count()) 
		{
			$todo = $todo->first();

			$newTodo = new stdClass;
			$newTodo->title = trim($request->title);
			$newTodo->done = trim($request->done);
			$todoValidator = v::attribute('title', v::notEmpty()->length(null, 250))
							 ->attribute('done', v::int());

			if ($todoValidator->validate($newTodo)) 
			{
				$todo->title = $newTodo->title;
				$todo->done = $newTodo->done;
				if($todo->save()) 
				{
					$response = 'Todo has been successfully updated.';
				} 
				else 
				{
					throw new ServerException();
				}
			} 
			else 
			{
				throw new ValidationException();
			}
		}
		else 
		{
			throw new ResourceNotFoundException();
		}	

	} catch (Exception $e) {
		$app->response()->status($e->getCode());
		$response = $e->getMessage();
	}

	echo json_encode($response);
});

$app->delete('/:id', function($id) use ($app) {
	try {

		$response = [];

		$todo = \Todo::where('id', '=', $id);
		if($todo->count()) 
		{
			$todo = $todo->first();
			if($todo->delete()) 
			{
				$response = 'Todo has been successfully removed.';
			} 
			else 
			{
				throw new ServerException();
			}
		} 
		else 
		{
			throw new ResourceNotFoundException();
		}
	} catch (Exception $e) {
		$app->response()->status($e->getCode());
		$response = $e->getMessage();
	}

	echo json_encode($response);
});