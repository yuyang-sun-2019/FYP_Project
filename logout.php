<?php
session_start();
unset($_SESSION["email"]);
unset($_SESSION["verified"]);
unset($_SESSION["fname"]);
header("Location: login.php");
exit;


?>