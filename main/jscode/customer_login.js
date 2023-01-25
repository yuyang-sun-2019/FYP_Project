const app = Vue.createApp({// instance property
  data() {
    return {

    };
  },
}); //create the vue instance

app.component("login-component", {//vue component
  // options for component
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods:{
    login(){
      //set progress spinner
      let loginBtn = document.getElementById("loginbtn");
      loginBtn.innerHTML =
      `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;

      //disable the button to prevent spams
      loginBtn.setAttribute("disabled", true);

      let url = './process_login.php';

      axios.post(url, {
        email : this.email,
        password : this.password
        })
        .then(response => {
        // process response.data
        if(response.data){
           //stop the progress spinner
           document.getElementById("loginbtn").innerHTML = "Log In";

          window.location.replace("./index.php");

        }
        else{
          //stop the progress spinner
          let loginBtn = document.getElementById("loginbtn");
          loginBtn.innerHTML = "Log In";

          //reenable the log in btn
          loginBtn.removeAttribute("disabled");


          var alertPlaceholder = document.getElementById('loginAlertPlaceholder');
          var wrapper = document.createElement('div');
          var type = "danger";
          var msg = "Error: email/ password do not match!";
          wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">'
          + msg + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

          alertPlaceholder.append(wrapper)
        }
        })
        .catch(error => {
        // process error object
        //stop the progress spinner
        let loginBtn = document.getElementById("loginbtn");
        loginBtn.innerHTML = "Log In";

        //reenable the log in btn
        loginBtn.removeAttribute("disabled");
        });
    },

  },

  template: `
<div class="mx-auto text-center my-5">
    <img src="./images/6MEN.jpg" width="300" height="300" />
    <h1 class="text-light mt-2">PRO-JEX V2D</h1>
</div>

<div class="container-fluid bg-white py-3 px-4 rounded-3 w-50">

        <h2 class="mb-5">Staff Login</h2>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" v-model="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="hey@hotmail.com">
            <div id="emailHelp" class="form-text" >We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" v-model="password" class="form-control" id="exampleInputPassword1">
        </div>
        <button @click="login" id="loginbtn" class="btn btn-primary btn-sm-sm">Log In</button>

      <div class="container-fluid d-flex  justify-content-end px-0">

        <div class="row">
            <div class="d-flex justify-content-end mt-4">
            <a href="" data-bs-toggle="modal" data-bs-target="#CustomerModal">Create Account</a>
            </div>
            <div id="loginAlertPlaceholder" class="mt-2"></div>
        </div>


      </div>
</div>`,
}),

app.component("create-acc-component", {//vue component
  // options for component
  data() {
    return {
      fname: "",
      lname: "",
      email: "",
      pw: "",
      code:"",
      alwaysActive: true,
      isDisabled: false,
    };
  },

  methods:{
    create(){
       //set progress spinner
       let createBtn = document.getElementById("create");
       createBtn.innerHTML =
       `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;

       //disable the create btn to prevent spams
       createBtn.setAttribute("disabled", true);

       //disable the close buttons on the modal
      this.isDisabled = true;

      //disable all the form inputs
      document.getElementById("inputfName").setAttribute("disabled", true);
      document.getElementById("inputlName").setAttribute("disabled", true);
      document.getElementById("inputEmail").setAttribute("disabled", true);
      document.getElementById("inputPassword").setAttribute("disabled", true);
      document.getElementById("code").setAttribute("disabled", true);

      let url ="./process_register.php";

      axios.post(url, {
        email: this.email,
        password: this.pw,
        firstname: this.fname,
        lastname: this.lname,
        code:this.code
        })
        .then(response => {
        // process response.data

        if(response.data.status){ //Account Creation Success

          //stop the progress spinner
          let createBtn = document.getElementById("create");
          createBtn.innerHTML = "Create Account";

          //reenable the create btn
          createBtn.removeAttribute("disabled");

          //reenable close buttons
          this.isDisabled = false;

          //reenable the form inputs
          document.getElementById("inputfName").removeAttribute("disabled");
          document.getElementById("inputlName").removeAttribute("disabled");
          document.getElementById("inputEmail").removeAttribute("disabled");
          document.getElementById("inputPassword").removeAttribute("disabled");
          document.getElementById("code").removeAttribute("disabled");

          var alertPlaceholder = document.getElementById('liveAlertPlaceholder');
          var wrapper = document.createElement('div');
          var type = "success";

          wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">'
          + response.data.msg + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
          // if (window.confirm('Please proceed to finish registering for telegram'))
          // {window.location.href='http://0.0.0.0:5001/id'};
          alertPlaceholder.append(wrapper)

          setTimeout(function() {
            document.getElementById("close").click();
          },3000);

        }
        else{//Account Creation Failed

           //stop the progress spinner
          let createBtn = document.getElementById("create");
          createBtn.innerHTML = "Create Account";

          //reenable the create btn
          createBtn.removeAttribute("disabled");

           //reenable close buttons
           this.isDisabled = false;

           //reenable the form inputs
           document.getElementById("inputfName").removeAttribute("disabled");
           document.getElementById("inputlName").removeAttribute("disabled");
           document.getElementById("inputEmail").removeAttribute("disabled");
           document.getElementById("inputPassword").removeAttribute("disabled");
           document.getElementById("code").removeAttribute("disabled");
          var alertPlaceholder = document.getElementById('liveAlertPlaceholder');
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
          let createBtn = document.getElementById("create");
          createBtn.innerHTML = "Create Account";

          //reenable the create btn
          createBtn.removeAttribute("disabled");

         //reenable close buttons
         this.isDisabled = false;

         //reenable the form inputs
         document.getElementById("inputfName").removeAttribute("disabled");
         document.getElementById("inputlName").removeAttribute("disabled");
         document.getElementById("inputEmail").removeAttribute("disabled");
         document.getElementById("inputPassword").removeAttribute("disabled");
         document.getElementById("code").removeAttribute("disabled");

         var alertPlaceholder = document.getElementById('liveAlertPlaceholder');
         var wrapper = document.createElement('div');
         var type = "danger";
         var msg = "Account Creation Failed! Something Went Wrong.";
         wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">'
          + msg + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

         alertPlaceholder.append(wrapper)

        });


    },
    close(obj){
      //Empty out the create account form fields
      this.email = "";
      this.pw = "";
      this.code=""
      this.fname="";
      this.lname = "";
      document.getElementById("liveAlertPlaceholder").innerHTML = "";
    }
  },

  template: `<div class="modal fade" id="CustomerModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="CustomerModalLabel" aria-hidden="true">
  <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="CustomerModalLabel">Create Staff Account</h5>
              <button type="button" @click="close" v-bind:class="{ 'btn-close': alwaysActive, 'disabled': isDisabled }" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <form class="row g-3">
                  <div class="col-md-6">
                      <label for="inputfName" class="form-label">First Name</label>
                      <input type="text" class="form-control" id="inputfName" v-model="fname" placeholder="First Name">
                  </div>
                  <div class="col-md-6">
                      <label for="inputlName" class="form-label">Last Name</label>
                      <input type="text" class="form-control" id="inputlName" v-model="lname" placeholder="Last Name">
                  </div>
                  <div class="col-12">
                      <label for="inputEmail" class="form-label">Email</label>
                      <input type="email" class="form-control" id="inputEmail" v-model="email" placeholder="hey@hotmail.com">
                  </div>
                  <div class="col-md-9">
                      <label for="inputPassword" class="form-label">Password</label>
                      <input type="password" class="form-control" v-model="pw" id="inputPassword">
                  </div>
                  <div class="col-md-3">
                      <label for="code" class="form-label">3 digit Code</label>
                      <input type="text" class="form-control" v-model="code" id="code">
                  </div>

              </form>
          </div>
          <div class="modal-footer">
              <button type="button" id="close" @click="close" v-bind:class="{ 'btn': alwaysActive, 'btn-danger':alwaysActive, 'disabled': isDisabled }" data-bs-dismiss="modal">Close</button>
              <button type="button" @click="create" id="create" class="btn btn-primary">Create Account</button>
          </div>
          <div id="liveAlertPlaceholder"></div>
      </div>
  </div>
</div>


`,
});


app.mount("#main");
