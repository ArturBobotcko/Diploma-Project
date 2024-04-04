<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $login = $_POST["login"];
        $password = $_POST["password"];
    }
    
    echo("Hello from server $login");
?>