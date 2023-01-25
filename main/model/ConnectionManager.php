
<?php

class ConnectionManager {

    public function getConnection() {
        $servername = 'localhost';
        $username = 'root';
        $password = '';
        $dbname = 'fyp';
        // mysql://be45f732c7bf49:3489eb7c@us-cdbr-east-04.cleardb.com/heroku_e51b0bda5f650db?reconnect=true
        //$dsn  = "mysql:host=localhost;dbname=week12";
        //return new PDO($dsn, "root", "");

        // Create connection
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // if fail, exception will be thrown

        // Return connection object
        return $conn;
    }

}

?>
