<?php
    # Autoload
    require_once "common.php";
    //header('Content-Type: application/json');
    //Need this in order to get the data passed by axios post
    $_POST = json_decode(file_get_contents("php://input"),true);
    $status = false;

    //Get parameters passed from login.php

    if( filter_var($_POST["email"], FILTER_VALIDATE_EMAIL) && $_POST['password'] !="" && $_POST['firstname']!="" && $_POST['lastname']!="" && $_POST['code']=="666"){
        $email = $_POST["email"];
        $password = $_POST["password"];
        $fname = $_POST["firstname"];
        $lname = $_POST["lastname"];


            //check if user already has an existing account
            $dao = new UserDAO();
            $user_result = $dao->verifyUser($email);

            if($user_result){
                //User has an existing account
                $result = ["status"=>$status,"msg"=>"You have an existing Account Please Log in"];
                $postJSON = json_encode($result);
                echo $postJSON;

            }
            else{
                //Hash entered password
                $hashed = password_hash($password, PASSWORD_DEFAULT);

                //Add new user
                $status = $dao->register($email,$hashed,$fname,$lname);

                if($status){
                    //User account creation is successful
                    $result = ["status"=>$status,"msg"=>"Account Creation Successful"];
                    $postJSON = json_encode($result);
                    echo $postJSON;

                }

                else{
                    //User acccount creation is unsucessful
                    $result = ["status"=>$status,"msg"=>"Please try again"];
                    $postJSON = json_encode($result);
                    echo $postJSON;
                }




            }





    }else{
         // create json string and send back to client
        $result = ["status"=>$status,"msg"=>"Please ensure all fields / 3 digit code are properly filled "];
        $postJSON = json_encode($result);
        echo $postJSON;

    }






?>
