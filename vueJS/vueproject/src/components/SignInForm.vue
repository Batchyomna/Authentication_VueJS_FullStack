<template>
  <div>
    <form>
        <h3>{{message}}</h3>
      <div class="col-md-6 mb-3">
        <label for="theEmail" class="float-left">Email address:</label>
        <input type="email" class="form-control" id="theEmail" placeholder="Enter Your Email" v-model="email" />

        <label for="thePW" class="float-left">Password:</label>
        <input type="password" class="form-control" id="thePW" placeholder="Enter Your Password" v-model="password"/>

        <div class="text-left" id="mybutton">
          <button type="button" class="btn btn-success" v-on:click="SignIn()" @keydown.enter="SignIn()">Sign-In</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
const axios = require("axios");

export default {
  name: "SignInForm",
  data: () => ({
    email: "",
    password:"",
    message:""
  }),
  methods: {
    SignIn() {
      let dataOfUser = {
        email:this.email,
        password: this.password,
      };
      let that = this
      axios
        .post("http://localhost:3000/ath/sign-in", dataOfUser)
        .then(function (response) {
          if(response.status === 200) {
            console.log(typeof response.data );
            that.$store.dispatch('triggerMutation', response.data)
            that.$router.push('/dashboard');
          }
        })
        .catch(function (error) {
          that.message = 'You are not Unauthorized'
          console.log(error);
          that.$router.push('/home');   
          
        });
    },
 //----------other way to call axios for log in----------

    //     async login() {
    //         try {
    //             let res = await axios({
    //                 url: 'http://localhost:3000/ath/sign-in',
    //                 method: 'POST',
    //                 data: {
    //                     username: this.email,
    //                     password: this.password,
    //                    
    //                 }
    //             })

    //             alert(`Token received: ${res.data.token}`)
    //         }
    //         catch (err) {
    //             alert(`Error: ${err}`)
    //         }
    //     }
    // }

  }
}
</script>
<style scoped>
#mybutton {
  margin-top: 5%;
}
</style>