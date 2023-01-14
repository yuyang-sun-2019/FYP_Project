<?php

require_once 'common.php';

class UserDAO {

    
    public function verifyUser($email){
            // Step 1 - Connect to Database
            $connMgr = new ConnectionManager();
            $pdo = $connMgr->getConnection();

             // Step 2 - Prepare SQL
          $sql= "SELECT
                      *
                  FROM
                      user
                  WHERE
                      email = :email
          ";
           $stmt = $pdo->prepare($sql);
           $stmt->bindParam(':email', $email, PDO::PARAM_STR);
           $stmt->execute();
           $stmt->setFetchMode(PDO::FETCH_ASSOC);
           $result = null;
           
           
           // Step 4 - Retrieve Query Results
          if( $row = $stmt->fetch() ) {
              $result=true;
          }else{
              $result=false;
          }

          // Step 5 - Clear Resources
          $stmt = null;
          $pdo = null;
    
          // Step 6 - Return
          return $result;
          
    }

    public function getFirstName($email){
        // Step 1 - Connect to Database
        $connMgr = new ConnectionManager();
        $pdo = $connMgr->getConnection();


         // Step 2 - Prepare SQL
      $sql= "SELECT
                  firstname
              FROM
                  user
              WHERE
                  email = :email
      ";
       $stmt = $pdo->prepare($sql);
       $stmt->bindParam(':email', $email, PDO::PARAM_STR);
       $stmt->setFetchMode(PDO::FETCH_ASSOC);
       $fname = null;
      if( $stmt->execute() ) {

          // Step 4 - Retrieve Query Results
          if( $row = $stmt->fetch() ) {
              $fname = $row['firstname'];
          }
      }
   
      // Step 5 - Clear Resources
      $stmt = null;
      $pdo = null;

      // Step 6 - Return
      return $fname;
      
  }

  public function register($email,$hashed_password,$fname,$lname) {

    // Step 1 - Connect to Database
    $connMgr = new ConnectionManager();
    $pdo = $connMgr->getConnection();

    // Step 2 - Prepare SQL Statement
    $sql = "INSERT INTO user (email,hashed_password,firstname,lastname)
            VALUES (:email,:hashed_password,:fname,:lname);";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->bindParam(':hashed_password', $hashed_password, PDO::PARAM_STR);
    $stmt->bindParam(':fname', $fname, PDO::PARAM_STR);
    $stmt->bindParam(':lname', $lname, PDO::PARAM_STR);
    
    // Step 3 - Execute SQL (returns true or false)
    $result = $stmt->execute();
  
    // Step 5 - Clear Resources
    $stmt = null;
    $pdo = null;

    // Step 6 - Return
    return $result;
}

public function getHashedPassword($email) {

  // Step 1 - Connect to Database
  $connMgr = new ConnectionManager();
  $pdo = $connMgr->getConnection();

  // Step 2 - Prepare SQL
  $sql = "SELECT
              hashed_password
          FROM
              user
          WHERE
              email = :email
  ";
  $stmt = $pdo->prepare($sql);
  $stmt->bindParam(':email', $email, PDO::PARAM_STR);
  $stmt->setFetchMode(PDO::FETCH_ASSOC);
  
  // Step 3 - Execute SQL
  $hashed_password = null;
  $result = $stmt->execute();
  
  if($result) {

      // Step 4 - Retrieve Query Results
      if( $row = $stmt->fetch() ) {
          $hashed_password = $row['hashed_password'];
      }
  }
  
  // Step 5 - Clear Resources
  $stmt = null;
  $pdo = null;

  // Step 6 - Return
  return $hashed_password;
}


}

?>