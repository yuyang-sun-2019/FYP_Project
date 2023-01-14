const app = Vue.createApp({// instance property
    data() {
      return {
        
      };
    },
  }); //create the vue instance
  
  app.component("profile-component", {//vue component
    // options for component
    data() {
      return {
        val: 0,
      };
    },
    props: ["email", "password"],
    template: ` <h1 class="text-center">Profile</h1>
    <img src="./images/binge-eating.png" class="rounded-circle border border-dark mx-auto d-block mt-5 " width="250" height="250" alt="Profile Pic">
    
    <div class="container">
        <form class="row row-cols-1 g-3">
            <div class="col">
                <label for="inputfName" class="form-label">First Name</label>
                <input type="text" class="form-control" id="inputfName" placeholder="First Name">
            </div>
            <div class="col">
                <label for="inputlName" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="inputlName" placeholder="Last Name">
            </div>
            <div class="col">
                <label for="inputEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="inputEmail" placeholder="hey@hotmail.com">
            </div>
            <div class="col">
                <label for="inputPassword" class="form-label">Password</label>
                <input type="password" class="form-control" id="inputPassword">
            </div>

            <button type="button" class="btn btn-primary">Update Profile</button>

        </form>

    </div>`,
  });
  app.mount("#main");
  