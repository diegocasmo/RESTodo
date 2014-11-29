<?php

/**
 * API group
 */
$app->group('/api', function () use ($app) {

	/**
	 * Main (GET)
	 */
	$app->get('/', function() use ($app) {
		$response = [
			'csrf_token' => $_SESSION['csrf_token']
		];
		echo json_encode($response);
	});
});