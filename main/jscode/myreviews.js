const app = Vue.createApp({
  data() {
    return {
      // name:value pairs here
      userreviews: "",
      reviewId: "",
      reviewdesc: "",
      userrating: "",
      alwaysActive: true,
      isDisabled: false,
    };
  },
  methods: {
    remove(id) {
      //set progress spinner
      document.getElementById(id).innerHTML = 
      `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;

      this.reviewId = id;
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          //try to delete the review
          let url = "./process_delete_review.php";

          axios
            .post(url, {
              id: this.reviewId,
            })
            .then((response) => {
              // process response.data
              if (response.data.status) {
                Swal.fire("Deleted!", "Your review has been deleted.", "success").then((result) => {

                  document.getElementById(id).innerHTML = "Delete";
                  location.reload();
                })
                
               
              } else {
                document.getElementById(id).innerHTML = "Delete";

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Try Again',
                  })
              }
            })
            .catch((error) => {
              // process error object
              document.getElementById(id).innerHTML = "Delete";
            });

          
        }
        else{
          //user selected cancel 
          //Stop progress spinner
          document.getElementById(id).innerHTML = "Delete";
        }
      });
    },
    retrieve(id, review, rate) {
      //retrieve the reviewId and the relevant data to populate the modal fields
      this.reviewId = id;
      this.reviewdesc = review;
      this.userrating = rate;
    },
    update() {
      //Add progress spinner
      let updatebtn = document.getElementById("update");
      updatebtn.innerHTML = 
      `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;

      //Disable the updatebtn to prevent spams
      updatebtn.setAttribute("disabled", true);


      //disable the close buttons on the modal
      this.isDisabled = true;

      //disable all the form inputs 
      document.getElementById("rating").setAttribute("disabled", true);
      document.getElementById("reviewTextarea").setAttribute("disabled", true);

      let url = "./process_update_reviews.php";

      axios
        .post(url, {
          rating: this.userrating,
          desc: this.reviewdesc,
          id: this.reviewId,
        })
        .then((response) => {
          // process response.data
          if (response.data.status) {

            //stop the progress spinner
            let updatebtn = document.getElementById("update");
            updatebtn.innerHTML = "Update Review";
            
            //reenable close buttons
            this.isDisabled = false;

            //renable the form inputs
            document.getElementById("rating").removeAttribute("disabled");
            document.getElementById("reviewTextarea").removeAttribute("disabled");

            var alertPlaceholder = document.getElementById(
              "reviewAlertPlaceholder"
            );
            var wrapper = document.createElement("div");
            var type = "success";
            wrapper.innerHTML =
              '<div class="alert alert-' +
              type +
              ' alert-dismissible" role="alert">' +
              response.data.msg +
              '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

            alertPlaceholder.append(wrapper);
            this.reviewId = "";
            this.reviewdesc = "";
            this.userrating = "";

            setTimeout(function () {
              document.getElementById("closebtn").click();
            }, 500);

            setTimeout(function () {
              location.reload();
            }, 200);
           

          } else {
            //update failed 
           //stop the progress spinner
           let updatebtn = document.getElementById("update");
           updatebtn.innerHTML = "Update Review";

           //reenable the update button
           updatebtn.removeAttribute("disabled");

            //reenable close buttons
            this.isDisabled = false;

            //renable the form inputs
            document.getElementById("rating").removeAttribute("disabled");
            document.getElementById("reviewTextarea").removeAttribute("disabled");


            var alertPlaceholder = document.getElementById(
              "reviewAlertPlaceholder"
            );
            var wrapper = document.createElement("div");
            var type = "danger";
            wrapper.innerHTML =
              '<div class="alert alert-' +
              type +
              ' alert-dismissible" role="alert">' +
              response.data.msg +
              '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

            alertPlaceholder.append(wrapper);
          }
        })
        .catch((error) => {
          // process error object

          //stop the progress spinner
          let updatebtn = document.getElementById("update");
          updatebtn.innerHTML = "Update Review";

          //reenable the update button
          updatebtn.removeAttribute("disabled");

          //reenable close buttons
          this.isDisabled = false;

          //renable the form inputs
          document.getElementById("rating").removeAttribute("disabled");
          document.getElementById("reviewTextarea").removeAttribute("disabled");

        });
    },
    close() {
      //Empty out the create account form fields
      this.userrating = "";
      this.userdesc = "";
      document.getElementById("rating").value = "";
      document.getElementById("reviewTextarea").value = "";
      document.getElementById("reviewAlertPlaceholder").innerHTML = "";
    },
  },
  created() {
    url = "./process_get_user_reviews.php";
    axios
      .get(url)
      .then((response) => {
        // process response.data object
        console.log(response.data);
        this.userreviews = response.data.data;
      })
      .catch((error) => {
        // process error object
      });
  },
});
// (2) Link (mount) Vue instance to DOM
const vm = app.mount("#app");
