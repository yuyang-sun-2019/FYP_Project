<?php
require_once "./common.php";
header('Content-Type: application/json');
//Need this in order to get the data passed by axios post
$_POST = json_decode(file_get_contents("php://input"),true);
$status = false;

if( trim($_POST['email']) != '' && trim($_POST['password']) != '' ) {

    $email = $_POST['email'];
    $password = $_POST['password'];
    
    // Authenticate
    $dao = new UserDAO();


    //Call UserDAO's verifyUser($email) to check if such a user exists 
    $user_check = $dao->verifyUser($email);

    if($user_check){

    //get the user firstname to display
    $fname = $dao->getFirstName($email);
    // Call UserDAO's getHashedPassword($email) to get hashed_password stored in User table
    $user_hashed_password = $dao->getHashedPassword($email);

         if($user_hashed_password != null){

            $pw_check = password_verify($password,$user_hashed_password);

            if($pw_check){
                
                //User is verified Proceed to send back a response
                $_SESSION["verified"]= True;
                $_SESSION["email"]= $email;
                $_SESSION["fname"]= $fname;
                $status = true;
                
                $postJSON = json_encode($status);
                echo $postJSON;
            }
            else{
                $postJSON = json_encode($status);
                echo $postJSON;
            }

        }
        else{
            //If password verification failed 
            // create json string and send back to client
            $postJSON = json_encode($status);
            echo $postJSON;
        }

    }

    else{
        //If user verification failed 
        // create json string and send back to client
        $postJSON = json_encode($status);
        echo $postJSON;
    }
    
        
        
    

   
}
else {
    //If user no user input
        // create json string and send back to client
        $postJSON = json_encode($status);
        echo $postJSON;
        

    

}

?>