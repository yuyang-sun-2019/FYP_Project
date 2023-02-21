<?php
require_once "protect.php";

?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
    <!--Vue -->
    <script src="https://unpkg.com/vue@next"></script>
    <!--Axios -->
    <script src="https://unpkg.com/axios/dist/axios.js"></script>
</head>

<body>
    <div id="navbar">
        <navbar></navbar>
    </div>

    <div id="app">
        <div class="py-4 py-lg-6 bg-warning">
        <h1 class="display-1 text-light">My Reviews</h1>
        </div>
        

        <div class="container mt-5" v-if="userreviews.length > 0">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3">
                <div class="col" v-for="review of userreviews">
                    <div class="card text-white bg-dark mb-3">
                        <div class="card-header">
                        <img src="./images/man.png" height="32" width="32" class="flex-shrink-0 me-2 rounded">
                            {{review.username}}</div>
                        <div class="card-body">
                            <h5 class="card-title ">{{review.eateryname}}</h5>
                            <span v-for="i in Math.floor(review.rating)">⭐</span>
                            <span class="text-warning">({{review.rating}})</span>
                            <br/>
                            <span>Date: {{review.date}}</span>
                            <p class="card-text text-truncate">{{review.review}}</p>
                            <div class="d-flex justify-content-evenly">
                                <button class="btn btn-success" data-bs-toggle="modal" @click="retrieve(review.id,review.review,review.rating)" data-bs-target="#ReviewsModal" type="button">Edit</button>
                                <button class="btn btn-danger" :id="review.id" @click="remove(review.id)" type="button">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     
        <figure class="text-center mt-5" v-else>
            <blockquote class="blockquote">
                <p>You have not left any review on our site. What are you waiting for!</p>
            </blockquote>
            <figcaption class="blockquote-footer">
                <cite title="Source Title">MakanComeHere</cite>
            </figcaption>
        </figure>

        <!-- Modal Pop Up-->
        <div class="modal fade" id="ReviewsModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="ReviewsModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ReviewsModalLabel">Review</h5>
                        <button type="button" id="closeX" @click="close"  v-bind:class="{ 'btn-close': alwaysActive, 'disabled': isDisabled }" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="row g-3">
                            <div class="col-md-6">
                                <label for="rating" class="form-label">Rating</label>
                                <input type="number" class="form-control" id="rating" min="1" max="5" placeholder="1 to 5" v-model="userrating">
                            </div>
                            <div class="col-md-6">
                                <label for="reviewTextarea" class="form-label">Enter Review Here</label>
                                <textarea class="form-control" v-model="reviewdesc" id="reviewTextarea" rows="3"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="closebtn" @click="close" v-bind:class="{ 'btn': alwaysActive, 'btn-danger':alwaysActive, 'disabled': isDisabled }" data-bs-dismiss="modal">Close</button>
                        <button type="button" id="update" @click="update" class="btn btn-primary">Update Review</button>
                    </div>
                    <div id="reviewAlertPlaceholder"></div>
                </div>
            </div>
        </div>

    </div>



    <script src="./jscode/myreviews.js"></script>
    <script src="./jscode/navbar.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ" crossorigin="anonymous">
    </script>
    <!--Sweet Alert Pop Up -->
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    

</body>

</html>