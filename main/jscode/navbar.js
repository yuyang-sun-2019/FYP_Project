const navbar = Vue.createApp({});

navbar.component('navbar',{
	methods:{
		logout(){

			window.location.replace("./logout.php");
		}

	},
    template: `
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			<div class="container-fluid">
				<a class="navbar-brand" href="./index.php">
					<img
						src="./images/binge-eating.png"
						width="30"
						height="30"
						class="d-inline-block align-text-top"
					/>

					MakanCome Here
				</a>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item">
							<a class="nav-link" aria-current="page" href="./myreviews.php">My Reviews</a>
						</li>
					</ul>
                    <div @click="logout" class="ms-auto p-2 bd-highlight text-light">Logout</div>
				</div>
			</div>
		</nav>`,
})

navbar.mount('#navbar')