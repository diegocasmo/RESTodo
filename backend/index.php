<?php

require 'vendor/autoload.php';
require 'app/middlewares/CsrfGuard.php';

use \Slim\Slim;
use \Slim\Extras\Middleware\CsrfGuard;

$app = new \Slim\Slim();
$app->add(new CsrfGuard());

session_start();

require 'app/config/Database.php';
require 'app/Errors.php';
require 'app/models/Todo.php';	
require 'app/routes/Main.php';
require 'app/routes/Todo.php';

$app->run();