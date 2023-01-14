<?php
   require_once "protect.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3' crossorigin='anonymous'><script src='https://unpkg.com/vue@next'></script><script src='https://unpkg.com/axios/dist/axios.js'></script>
    <!-- Vue -->
    <script src="https://unpkg.com/vue@next"></script>
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script
			type="text/javascript"
			src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDXUyvqDmm1kKCh4DhqOxo-FukEV410FP4&libraries=places"
	></script>
    <!-- Sweet stuff -->
		<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
    <div id='navbar'>
        <navbar></navbar>
    </div>
    <div id='jumbotron'>
        <jumbotron></jumbotron>
    </div>
    <br>



    <div class="container">
            <div class="row row-cols-1 row-cols-md-2 g-4">
                <div class="col">
                    <div class="card text-white bg-dark mb-3 border-0" >
                        <img src="./images/restaurant.jpg" class="card-img-top" alt="image not provided" style="object-fit: cover; height: 30vh;">
                        <div class="card-body">
                            <h5 class="card-title">Search for amazing food near you</h5>
                            <p class="card-text">Discover Singapore's greatest, near you</p>
                            <a class="btn btn-outline-light" onclick="getLocation()">Lets go</a>
                        </div>

                    </div>
                </div>
                <div class="col">
                    <div class="card text-white bg-dark mb-3 border-0" >
                        <img src="./images/destination.jpg" class="card-img-top" alt="image not provided" style="object-fit: cover; height: 30vh;">
                        <div class="card-body">
                            <h5 class="card-title">Going somewhere?</h5>
                            <p class="card-text">Search here to find restaurants near your destination</p>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control stretched-link" placeholder="Where are you going?" id="where">
                            </div>
                            <a href="#" class="btn btn-outline-light" onclick="setGeo()">Lets go</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>


    <div id="app">
        <div id="map"></div>
        <div class="container justify-content-center" style="width: 70%">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                <div v-for="placer in resultsArray" id="comehere">
                    <card :place="placer"></card>
                </div>
            </div>
        </div>
    </div>
    <br>

<script src='./jscode/navbar.js'></script>
<script src='./jscode/jumbotron.js'></script>
<script src='./jscode/card.js'></script>
<script src='./jscode/carousel.js'></script>
<script src='./jscode/GooglePlacesAPI.js'></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ" crossorigin="anonymous"></script>


</body>
</html>
