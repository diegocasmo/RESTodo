<?php
require 'vendor/autoload.php';

$app = new \Slim\Slim();

require 'app/config/Database.php';
require 'app/Errors.php';
require 'app/models/Todo.php';	
require 'app/routes/Todo.php';

$app->run();