const jumbotron = Vue.createApp({});

jumbotron.component("jumbotron", {
// 	template: `<div class="container-fluid bg-dark text-light mx-0 px-0">
//     <div class="row mx-0">
//         <div class="col-6 text-center">
//             <h1>Welcome to MakanCome Here</h1>
//             <br><br><br>
//             <div class='display-6'>We know that you love hawker food, and we have you covered!!</div>
//             <br><br><br>
//             <a class="btn btn-light" href="./vueSearchFunction.php" role="button">Search Now!</a>
//         </div>
//         <img src="./images/hawkerfood.jpg" class="col-md-6 px-0" />
//     </div>
// </div>`,
    template: 
    `
    <div class="p-5 mb-4 bg-light rounded-3" style="background-image: url(./images/hawkerfood.jpg);
    background-size: 100%;">
        <div class="container-fluid py-5 text-white"
        style="backdrop-filter: brightness(50%);">
            <h1 class="display-5 fw-bold text-center fst-italic">MakanComeHere</h1>
            <div class="container" style="max-width: 70%">
                <div class="row justify-content-center fs-4">
                    Love food? We've got you covered
                </div>
                <br>
                <div class="row">
                    <div class="input-group">
                        <a class="btn btn-light border" role="button" onclick="setLoc()">Search</a>
                        <input type="text" class="form-control" placeholder="Search for a specific restaurant" id="fromjumbo">
                        </div>
                </div>
            </div>
            
        </div>
    </div>
    `
    ,
});

jumbotron.mount('#jumbotron')