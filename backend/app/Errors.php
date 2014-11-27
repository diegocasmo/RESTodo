<?php

class ResourceNotFoundException extends Exception {
	public function __construct($message = null, $code = 404)
	{
		parent::__construct($message ?: 'The requested resource was not found.', $code);
	}
}

class ValidationException extends Exception {
	public function __construct($message = null, $code = 400)
	{
		parent::__construct($message ?: 'Invalid input.', $code);
	}
}

class ServerException extends Exception {
	public function __construct($message = null, $code = 500)
	{
		parent::__construct($message ?: 'There has been a problem with your request, please try again later.', $code);
	}
}