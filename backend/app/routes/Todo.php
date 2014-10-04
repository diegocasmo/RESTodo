<?php

use Respect\Validation\Validator as v;

$app->get('/', function() use ($app) {
	try {
		$statusCode = 200;

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
		$statusCode = 400;
		$response = 'There has been a problem with your request, please try again later.';
	} finally {
		echo json_encode($response, $statusCode);
	}
});

$app->get('/:id', function($id) use ($app) {
	try {
		$statusCode = 200;

		$response = [];

		$todo = \Todo::where('id', '=', $id)->get();

		if($todo->count() > 0) {
			$todo = $todo->first();
			$response = $todo;
		} else {
			throw new Exception('Todo does not exist.');
		}

	} catch (Exception $e) {
		$statusCode = 404;
		$response = $e->getMessage();
	} finally {
		echo json_encode($response, $statusCode);
	}
});

$app->post('/', function() use ($app) {
	try {
		$statusCode = 200;
		$response = [];

		$request = $app->request;
		$request =  json_decode($request->getBody());

		$newTodo = new stdClass;
		$newTodo->title = trim($request->title);
		$newTodo->done = trim($request->done);
		$todoValidator = v::attribute('title', v::notEmpty())
						 ->attribute('done', v::int());

		if ($todoValidator->validate($newTodo)) {
			$todo = new \Todo();
			$todo->title = $newTodo->title;
			$todo->done = $newTodo->done;
			if($todo->save()) {
				$response = 'Todo has been successfully saved.';
			} else {
				$statusCode = 500;
				throw new Exception('There has been a problem with your request, please try again later.');
			}
		} else {
			$statusCode = 400;
			throw new Exception('Invalid input.');
		}
	} catch (Exception $e) {
		$response = $e->getMessage();
	} finally {
		echo json_encode($response, $statusCode);
	}
});

$app->put('/:id', function($id) use ($app) {
	try {
		$statusCode = 200;
		$response = [];
		$request = $app->request;
		$request =  json_decode($request->getBody());

		$todo = \Todo::where('id', '=', $id);
		if($todo->count()) {
			$todo = $todo->first();

			$newTodo = new stdClass;
			$newTodo->title = trim($request->title);
			$newTodo->done = trim($request->done);
			$todoValidator = v::attribute('title', v::notEmpty())
							 ->attribute('done', v::int());

			if ($todoValidator->validate($newTodo)) {
				$todo->title = $newTodo->title;
				$todo->done = $newTodo->done;
				if($todo->save()) {
					$response = 'Todo has been successfully updated.';
				} else {
					$statusCode = 500;
					throw new Exception('There has been a problem with your request, please try again later.');
				}
			} else {
				$statusCode = 400;
				throw new Exception('Invalid input.');
			}
		} else {
			$statusCode = 404;
			throw new Exception('Todo does not exist.');
		}	
	} catch (Exception $e) {
		$response = $e->getMessage();
	} finally {
		echo json_encode($response, $statusCode);
	}
});

$app->delete('/:id', function($id) use ($app) {
	try {
		$statusCode = 200;
		$response = [];

		$todo = \Todo::where('id', '=', $id);
		if($todo->count()) {
			$todo = $todo->first();
			if($todo->delete()) {
				$response = 'Todo has been successfully removed.';
			} else {
				$statusCode = 500;
				throw new Exception('There has been a problem with your request, please try again later.');
			}
		} else {
			$statusCode = 400;
			throw new Exception('Todo does not exist.');
		}
	} catch(Exception $e) {
		$response = $e->getMessage();
	} finally {
		echo json_encode($response, $statusCode);
	}
});