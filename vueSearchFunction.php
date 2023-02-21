<?php
   require_once "protect.php";
    
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
			rel="stylesheet"
			integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
			crossorigin="anonymous"
		/>
		<!-- Vue -->
		<script src="https://unpkg.com/vue@next"></script>
		<!-- Axios -->
		<script src="https://unpkg.com/axios/dist/axios.js"></script>
		<!-- Google Places API Library -->
		
		<script
			type="text/javascript"
			src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDXUyvqDmm1kKCh4DhqOxo-FukEV410FP4&libraries=places"
		></script>
		

		<title>Document</title>
	</head>
	<body>
		<!-- This map ID is purely for the API to work I think -->
		<div id="map"></div>
		<div id="navbar"><navbar></navbar></div>
		<div id="app">
			<div class="container mx-0 my-1">
				<br />
				<div class="input-group">
					<input
						type="text"
						class="form-control"
						:placeholder="placeholder"
						id="addr"
						v-model="addr"
					/>
				</div>
				<label for="addr" class="text-muted mb-3" @click="MakeMala()"
					>E.g. Mala Tang Yishun</label
				>

				<br />
				<button
					class="btn btn-outline-primary"
					type="button"
					id="button-addon1"
					@click="getLoc()"
				>
					Search For Specific Restaurant
				</button>
				<button
					class="btn btn-outline-primary"
					type="button"
					id="button-addon1"
					@click="getGeometryLocation()"
				>
					Search for Foods Near You
				</button>
			</div>
			<!-- This is for rendering single search -->
			<!-- Change to place ID instead, so that when the ID is passed, everything can be done within the component itself -->


			<div v-if="placeObject !=''">
				<!-- Here, I am just passing in the place Object -->
				<div class="container justify-content-center" style="width: 70%">
					<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
							<card :place="placeObject"></card>
					</div>
				</div>
			</div>


			<!-- This is for rendering search by location -->
			<div v-if="resultsArray != ''">
				<!-- Edit this such that it passes in the right information -->
				<div class="container justify-content-center" style="width: 70%">
					<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
						<div v-for="placer in resultsArray">
							<card :place="placer"></card>
						</div>
					</div>
				</div>
			</div>
		</div>
		<script src="./jscode/GooglePlacesAPI.js"></script>
		<script src="./jscode/navbar.js"></script>
	</body>
</html>
