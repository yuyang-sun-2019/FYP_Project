<?php
	require_once "protect.php";
	$id = $_GET['place'];
	$_SESSION["place"] = $id;
	$email = $_SESSION['email'];






?>


<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<!-- Bootstrap -->
		<link
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
			rel="stylesheet"
			integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
			crossorigin="anonymous"
		/>
		<!--Vue -->
		<script src="https://unpkg.com/vue@next"></script>
		<!--Axios -->
		<script src="https://unpkg.com/axios/dist/axios.js"></script>

        <script
			type="text/javascript"
			src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDXUyvqDmm1kKCh4DhqOxo-FukEV410FP4&libraries=places"
		></script>
	</head>
	<body>
		<div id="navbar">
			<navbar></navbar>
		</div>

		<div id='car' class="position-absolute">
		</div>

		<div id="app">
			<div id="map"></div>
			<div class="container" style="width: 70%">
				<card-details placeid=<?php echo $id ?> email=<?php echo $email ?>></card-details>
			</div>
		</div>

		

		<script src="./jscode/GooglePlacesAPI.js"></script>
		<script src="./jscode/navbar.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ" crossorigin="anonymous">
    </script>
		
	</body>
</html>
