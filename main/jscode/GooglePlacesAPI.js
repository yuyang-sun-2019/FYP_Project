const app = Vue.createApp({
	data() {
		return {
			addr: "",
			placeID: "",
			placeholder: "Enter a Restaurant or your Current Location",
			placeObject: "",
			marker: "",
			resultsArray: "",
		};
	},
	methods: {
		setAddr(input){
			this.addr = input;
			this.getLoc()
		},
		setGeo(input){
			this.addr = input;
			this.getGeometryLocation()
		},
		MakeMala() {
			this.addr = "Mala Tang Yishun";
		},
		getLoc() {
			this.resultsArray = '',
			this.placeObject = '',
			// My own API key = AIzaSyDXUyvqDmm1kKCh4DhqOxo-FukEV410FP4
			myKey = "AIzaSyChD1BmL1SDUnX5-KmIg5Kr60tLpIBB4q4";
			var url =
				"https://maps.googleapis.com/maps/api/geocode/json?address=" +
				this.addr +
				"&key= " +
				myKey +
				"&region=sg ";

			// axio call
			axios
				.get(url)
				.then((resp) => {
					placeID = resp.data.results[0].place_id;
					// Here, we have obtained the placeID, and we are calling the getPlaceByID function
					this.getPlaceObject(placeID);
					window.scrollBy(0, 200); // Scroll 100px to the right
				})
				.catch((err) => {
					this.placeholder = "Please input a valid address!";
					// document.getElementById("display").innerText = "Sorry, invalid address. Please try again!";
				});
		},
		getPlaceObject(placeID) {
			var request = {
				placeId: placeID,
			};
			service = new google.maps.places.PlacesService(map);
			service.getDetails(request, callback);
			function callback(place, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					vm.placeObject = place;
					vm.resultsArray = [place]
					vm.getImageSrc(place);
				}
			}
		},
		getImageSrc(place) {
			var photos = place.photos;
			if (!photos) {
				return;
			}

			this.marker = new google.maps.Marker({
				position: place.geometry.location,
				title: place.name,
				icon: photos[0].getUrl({ maxWidth: 300, maxHeight: 300 }),
			});
		},
		getGeometryLocation() {
			this.resultsArray = '',
			this.placeObject = '',
			// My own API key = AIzaSyDXUyvqDmm1kKCh4DhqOxo-FukEV410FP4
			myKey = "AIzaSyChD1BmL1SDUnX5-KmIg5Kr60tLpIBB4q4";
			var url =
				"https://maps.googleapis.com/maps/api/geocode/json?address=" +
				this.addr +
				"&key= " +
				myKey +
				"&region=sg ";

			axios
				.get(url)
				.then((resp) => {
					this.getNearbyFoods(resp.data.results[0].geometry.location);
				})
				.catch((err) => {
					this.placeholder = "Please input a valid address!";
				});
		},
		getNearbyFoods(LatLngObject) {
			// this specifies the Yishun Lat and Lng
			var location = new google.maps.LatLng(LatLngObject.lat, LatLngObject.lng);
			var request = {
				location: location,
				radius: "500",
				type: ["restaurant"],
			};

			service = new google.maps.places.PlacesService(map);
			service.nearbySearch(request, callback);

			function callback(results, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					vm.sortByRating(results);
				}
			}
		},
		sortByRating(results) {
			results.sort((a, b) => {
				if (a.hasOwnProperty("rating") && b.hasOwnProperty("rating")) {
					return b.rating - a.rating;
				} else if (a.hasOwnProperty("rating") && !b.hasOwnProperty("rating")) {
					return -1;
				}
				return 1;
			});
			this.resultsArray = results;
			
		},
	},
});

app.component("card", {
	data() {
		return {
			OpenDetailsProvided: this.checkOpeningHours(this.place),
			marker: this.getImageSrc(),
			isARestaurant: this.checkIfRestaurant(),
			weekdays: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
			],
		};
	},
	methods: {
		checkIfRestaurant(){
			if(!this.place.types.includes('restaurant') || !this.place.types.includes('food')){
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!',
					footer: 'Please enter a more specific restaurant!'
				  })
			}
			else{
				Swal.fire(
					'Your results have been loaded!',
					'Scroll down to see the results',
					'success'
				  )
			}
			
		},
		getImageSrc() {
			var photos = this.place.photos;
			if (!photos) {
				return {
					icon: "./images/noicon.png",
				};
			}

			marker = new google.maps.Marker({
				position: this.place.geometry.location,
				title: this.place.name,
				icon: photos[0].getUrl({ maxWidth: 300, maxHeight: 300 }),
			});

			return marker;
		},
		checkOpeningHours(place) {
			if (place.hasOwnProperty("opening_hours")) {
				return [true, place.opening_hours.open_now];
			} else {
				return [false, "opening hours unstated:("];
			}
		},
	},
	computed: {},
	props: ["place"],
	template: `
				<form method="get" action="reviews.php" class="justify-content-center" v-if="place.hasOwnProperty('rating') ">
				<input type="hidden" name="place" :value="place.place_id">
					<div class="col">
                    <div class="card">
                        <img class="card-img-top" 
								:src="marker.icon" 
                                alt="no pic provided"
								style="object-fit: cover;
								height: 200px;
								width: 100%;"
								
								
								>
                        <div class="card-body">
                            <h5 class="card-title">{{place.name}}</h5>
                            <p class="card-text">
								({{place.user_ratings_total}}) {{place.rating}} stars
								<br>
								<span v-for="star in Math.ceil(place.rating)"> 
									⭐ 
								</span>
								
                                <br>
                                <span style="font-style: italic">
									<span v-if='OpenDetailsProvided[0]'>
										<span v-if="OpenDetailsProvided[1]" class="text-success"> 	Open Now 
										</span>
										<span v-else class="text-danger"> 
											Closed 
										</span>
									</span>
									<span v-else class="text-danger"> 
										Opening Hours Unstated
									</span>

                                </span>
                            </p>
							<input type="submit" class="btn btn-dark justify-content-md-end" value="Find out more">
                        </div>
						
                    </div>
                </div>
				</form>

			`,
});

const { createApp, reactive } = Vue;
const sourceOfTruth = reactive({
	message: "",
});

app.component("card-details", {
	template: `
	<div class="my-3 p-3 bg-body rounded shadow-sm" style="margin-top: 40px;">
		<div class="lh-1">
			<h1 class="h6 mb-0 text-black lh-1">{{name}}</h1>
			<br>
			<div class="row" v-for="hours in opening_hours.weekday_text" v-if="opening_hours != undefined">

				<div class="col-3 pb-3 pt-3" :class="todayCheck(hours.split(': ')[0])">{{hours.split(": ")[0]}}</div>
				<div class="col-3 pb-3 pt-3" :class="todayCheck(hours.split(': ')[0])">{{hours.split(": ")[1]}}</div>
				<div class="col-1 pb-3 pt-3" v-if="todayCheck(hours.split(': ')[0])[1] && todayCheck(hours.split(': ')[0])[2]" :class="todayCheck(hours.split(': ')[0])">Open Now! </div>
				<div class="col-1 pb-3 pt-3 bg-danger text-white opacity-50" v-if="todayCheck(hours.split(': ')[0])[1] && !todayCheck(hours.split(': ')[0])[2]">Not Open </div>
				<div class="col-5" style="background-color: white;">
				</div>
			</div>
			<div v-else>
				Opening hours for this place are unstated! Take a chance and drop by to see whether they are selling:) 
			</div>
		</div>
	</div>
	<br>


	<div class="my-3 p-3 bg-body rounded shadow-sm">
		<h6 class="border-bottom pb-2 mb-0">Reviews</h6>
		<div class="d-flex text-muted pt-3" v-for="review in reviewsArray">
			<img :src="review.profile_photo_url" height="32" width="32" class="flex-shrink-0 me-2 rounded">

			<p class="pb-3 mb-0 small lh-sm border-bottom">
				<div class="d-block">
					<strong class="text-gray-dark" >
						<a :href="review.author_url" class="text-muted" style="text-decoration: none;">{{review.author_name}}</a> 
						<span v-for="i in Math.floor(review.rating)">⭐</span>
					</strong>
					<span class="text-decoration-none">{{review.relative_time_description}} </span>
				</div>	
				{{review.text}}
			</p>


		</div>

		<div class="d-flex text-muted pt-3" v-for="reviews of platformReviews">
			<img src="./images/man.png" height="32" width="32" class="flex-shrink-0 me-2 rounded">

			<p class="pb-3 mb-0 small lh-sm border-bottom">
				<div class="d-block">
					<strong class="text-gray-dark" >
						<a :href="" class="text-muted" style="text-decoration: none;">{{reviews.username}}</a> 
						<span v-for="i in Math.floor(reviews.rating)">⭐</span>
					</strong>
					<span class="text-decoration-none">{{reviews.date}} </span>
				</div>	
				{{reviews.review}}
			</p>
		</div>


		<br>
		<div class="d-grid gap-2 d-md-block text-center">
			<a href="#" class="btn btn-primary btn-lg"  role="button" data-bs-toggle="modal" data-bs-target="#ReviewsModal">Leave a review</a>
			<a class="btn btn-success btn-lg" :href="thehref" role="button">Take me here!</a>
		</div>
		<br>
		<br>
	</div>
    
    <div class="modal fade" id="ReviewsModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="ReviewsModalLabel" aria-hidden="true">
  <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="ReviewsModalLabel">Send Your Review</h5>
              <button type="button" @click="close" v-bind:class="{ 'btn-close': alwaysActive, 'disabled': isDisabled }" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <form class="row g-3">
                  <div class="col-md-6">
                      <label for="rating" class="form-label">Rating</label>
                      <input type="number" class="form-control" id="rating" min="1" max="5" placeholder="1 to 5" v-model="userrating">
                  </div>
                  <div class="col-md-6">
                  <label for="reviewTextarea" class="form-label">Enter Review Here</label>
                  <textarea class="form-control" v-model="userdesc" id="reviewTextarea" rows="3"></textarea>
                  </div>
              </form>
          </div>
          <div class="modal-footer">
              <button type="button" id="close" @click="close" v-bind:class="{ 'btn': alwaysActive, 'btn-danger':alwaysActive, 'disabled': isDisabled }" data-bs-dismiss="modal">Close</button>
              <button type="button" id="submit" @click="submit" class="btn btn-primary">Submit Review</button>
          </div>
          <div id="reviewAlertPlaceholder"></div>
      </div>
  </div>
</div>



	

	`,
	data() {
		return {
			// thehref: this.sendLinkToTelegram(),
			thehref: "http://0.0.0.0:5001/link",
			today: new Date(),
			todayChecker: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
			],
			opening_hours: "",
			name: "",
			reviewsArray: "",
			marker: "",
			placeObject: "",
			userrating: "",
        	userdesc: "",
			platformReviews:"",
			alwaysActive: true,
			isDisabled: false,
		};
	},
	props: ["placeid",'email'],
	methods: {
		submit(){
			//Add progress spinner
			let submitBtn = document.getElementById("submit");
			submitBtn.innerHTML = 
			`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;

			//disable the submit button to prevent spams
			submitBtn.setAttribute("disabled", true);

			//disable the close buttons on the modal
			this.isDisabled = true;

			//disable all the form inputs 
			document.getElementById("rating").setAttribute("disabled", true);
			document.getElementById("reviewTextarea").setAttribute("disabled", true);

			let url = './process_reviews.php';
	  
			axios.post(url, {
			  rating: this.userrating,
			  desc : this.userdesc,
			  name: this.name
			  })
			  .then(response => {
			  // process response.data
			  if(response.data.status){

				 //stop the progress spinner
				 let submitBtn = document.getElementById("submit");
				 submitBtn.innerHTML = "Submit Review";
            
				 //reenable close buttons
				 this.isDisabled = false;
	 
				 //renable the form inputs
				 document.getElementById("rating").removeAttribute("disabled");
				 document.getElementById("reviewTextarea").removeAttribute("disabled");

				var alertPlaceholder = document.getElementById('reviewAlertPlaceholder');
				var wrapper = document.createElement('div');
				var type = "success";
				wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">'  
				+ response.data.msg + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
				
				alertPlaceholder.append(wrapper)
	
				setTimeout(function() {
				document.getElementById("close").click();
				},500);

				setTimeout(function () {
					location.reload();
				  }, 200);

			  }
			  else{
				//stop the progress spinner
				let submitBtn = document.getElementById("submit");
				submitBtn.innerHTML = "Submit Review";

				//reenable submit button 
				submitBtn.removeAttribute("disabled");
            
				//reenable close buttons
				this.isDisabled = false;
	 
				//renable the form inputs
				document.getElementById("rating").removeAttribute("disabled");
				document.getElementById("reviewTextarea").removeAttribute("disabled");

				var alertPlaceholder = document.getElementById('reviewAlertPlaceholder');
				var wrapper = document.createElement('div');
				var type = "danger";
				wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">'  
				+ response.data.msg + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
				
				alertPlaceholder.append(wrapper)
			  }
			  })
			  .catch(error => {
			  // process error object
			  //stop the progress spinner
			  let submitBtn = document.getElementById("submit");
			  submitBtn.innerHTML = "Submit Review";

			  //reenable submit button 
			  submitBtn.removeAttribute("disabled");
            
			  //reenable close buttons
			  this.isDisabled = false;
  
			  //renable the form inputs
			  document.getElementById("rating").removeAttribute("disabled");
			  document.getElementById("reviewTextarea").removeAttribute("disabled");
			  });
		  },
		  close(){
			//Empty out the create account form fields
			this.userrating = "";
			this.userdesc = "";
			document.getElementById('rating').value = "";
			document.getElementById('reviewTextarea').value = "";
			document.getElementById('reviewAlertPlaceholder').innerHTML="";
		  },
		todayCheck(dayInLetters) {
			dayInNumbers = this.today.getDay();
			if (this.todayChecker[dayInNumbers] == dayInLetters) {
				return [
					"bg-success text-white opacity-50",
					true,
					this.opening_hours.open_now
				];
			}
			return "";
		},
		getPlaceObject(abc) {
			var request = {
				placeId: abc,
			};
			cardDetails = this;
			service = new google.maps.places.PlacesService(map);
			service.getDetails(request, callback);
			function callback(place, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					cardDetails.opening_hours = place.opening_hours;
					cardDetails.name = place.name;
					cardDetails.placeObject = place;
					cardDetails.reviewsArray = place.reviews;
					cardDetails.getImageSrc(place);
					// cardDetails.thehref = "https://pyhandlermakan.herokuapp.com/link=" + place.url + "&email=" + cardDetails.email;
				}
			}
		},
		getImageSrc(place) {
			var photos = place.photos;
			if (!photos) {
				return;
			}
			cardDetails.marker = new google.maps.Marker({
				position: place.geometry.location,
				title: place.name,
				// can potentially get more pictures from here
				icon: photos[0].getUrl({ maxWidth: 300, maxHeight: 300 }),
			});
			// This is amazing
			sourceOfTruth.message = cardDetails.marker;
			// End of amazing
		},
	},

	created() {
		this.placeObject = this.getPlaceObject(this.placeid);

		//Calling to grab reviews from our database
		url = "./retrieve_reviews.php";
		axios.get(url)
		.then(response => {
		// process response.data object
		this.platformReviews = response.data.data;
		})
		.catch(error => {
			console.log(error.message);
		});


	},
});

const vm = app.mount("#app");

const car = createApp({
	data() {
		return sourceOfTruth;
	},
	template: `
	<div class="container position-relative p-0" style="z-index: -1; max-width: 100%;">
		<div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel" >
			<div class="carousel-inner">
				<div class="carousel-item active">
					<img :src="message.icon" class="rounded-bottom" alt="./images/noicon.png" style="filter:brightness(50%);width: 100vw; height: 40vh; object-fit: cover">
				</div>
			</div>
		</div>
	</div>
	`,
}).mount("#car");