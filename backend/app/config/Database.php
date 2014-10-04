<?php

/* Setup Eloquent. */
use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Events\Dispatcher;
use Illuminate\Container\Container;

$capsule = new Capsule;
$capsule->addConnection([
    "driver"    => "mysql",
    "host"      => "127.0.0.1",
    "database"  => "",
    "username"  => "",
    "password"  => "",
    "charset"   => "utf8",
    "collation" => "utf8_general_ci",
    "prefix"    => ""
]);

$capsule->setEventDispatcher(new Dispatcher(new Container));
$capsule->bootEloquent();