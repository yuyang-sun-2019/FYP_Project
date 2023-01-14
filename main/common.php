<?php
 # Autoload and start session
 spl_autoload_register(
    function($class){
        require_once "model/$class.php";
    }
);
session_start();
?>