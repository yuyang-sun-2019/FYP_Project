const jumbotron = Vue.createApp({});

jumbotron.component("jumbotron", {

    template: 
    `
    <div class="p-4 mb-4 bg-light rounded-3" style="background-image: url(./images/car_banner.jpg);
    background-size: 100%;">
        <div class="container-fluid py-5 text-white"
        style="backdrop-filter: brightness(50%);">
            <h1 class="display-5 fw-bold text-center fst-italic">PRO-JEX V2D</h1>
            <div class="container" style="max-width: 70%">
                <div class="row justify-content-center fs-4">
                    Ready for some  data analysis?
                </div>
                <br>
                <div class="row">
                    <div class="input-group">
                        <a class="btn btn-light border" role="button" onclick="setLoc()">Search</a>
                        <input type="text" class="form-control" placeholder="Search for a keyword" id="fromjumbo">
                        </div>
                </div>
            </div>
            
        </div>
    </div>
    `
    ,
});

jumbotron.mount('#jumbotron')