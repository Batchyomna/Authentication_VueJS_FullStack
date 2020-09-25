<template>
  <div>
    <form>
      <!-- <h3  v-bind:class="{ active: isTrue }" class="undisplay">You have been registred GO sign in NOW!</h3>
      <h3 v-bind:class="{ active: isfalse }" class="undisplay">There was a problem during the registration</h3> -->
      <h3>{{message}}</h3>
      <div class="col-md-6 mb-3" id="mySignUP">
        <label class="float-left">Name:</label>
        <input type="text" class="form-control" placeholder="Enter Your Name" id="theName" v-model="name" required/>

        <label for="email" class="float-left">Email address:</label>
        <input type="email"  class="form-control"  id="email"  placeholder="Enter Your Email" v-model="email" required/>
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      
        <label for="tHEPW" class="float-left">Password:</label>
        <input  type="password"   class="form-control"  id="tHEPW" placeholder="Enter Your Password" v-model="password" required/>
        <div class="text-left" id="mybutton">
          <button type="button" class="btn btn-success" v-on:click="addUser()" @keydown.enter="addUser()">Sign-Up</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
const axios = require('axios');
export default { 
    name: "SignUpForm",
     data: () => ({
       active: null,
       message:'',
       name:'',
       email: '',
       password:'',
    }),

    methods: {
          addUser(){
                let myDataOfUser ={
                    name: this.name,
                    email: this.email,
                    password: this.password
                }
                   let that = this
                axios.post('http://localhost:3000/sign-up', myDataOfUser
                )
                .then(function (response) {
                    if(response.status == 200){
                       // alert('You logged in successfully')
                       console.log('AAAAAA');
                       that.message = 'You have been registred GO sign in NOW!'
                       that.name = ''
                        that.email = ''
                        that.password=''
                     
                    }else{
                      console.log('ELSE');
                     that.message = 'There was a problem during the registration'
                     that.name = ''
                     that.email = ''
                     that.password=''
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
    }

}
</script>
<style scoped>
#mybutton{
    margin-top: 5%;
}
#messageGreen{
    display: none;
    color: green;
    text-align: center;
    margin-bottom: 5%;
}
#messageRed{
      display: none;
    color: red;
    text-align: center;
    margin-bottom: 5%;
}
.undisplay{
  display: none;
}
</style>