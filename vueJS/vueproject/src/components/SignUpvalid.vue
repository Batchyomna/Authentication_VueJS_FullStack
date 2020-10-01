<template>
  <div>
    <form  @submit.prevent="addUser()">
      <!-- message of registration -->
      <h3>{{message}}</h3>

      <div class="col-md-6 mb-3" id="mySignUP">
        <!-- Name -->
        <label class="float-left">Name:</label>
        <input type="text" class="form-control" placeholder="Enter Your Name" id="theName" v-model="name" required :class="{ 'is-invalid': isSubmitted && $v.name.$error }"/>
        <div v-if="isSubmitted && !$v.name.required" class="invalid-feedback">Name field is required</div>
        <!-- Email -->
        <label for="email" class="float-left">Email address:</label>
        <input type="email"  class="form-control"  id="email"  placeholder="Enter Your Email" v-model="email" required :class="{ 'is-invalid': isSubmitted && $v.email.$error }"/>
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        <div v-if="isSubmitted && $v.userForm.email.$error" class="invalid-feedback">
          <span v-if="!$v.email.required">Email field is required</span>
          <span v-if="!$v.email.email">Please provide valid email</span>
        </div>
        <!-- password -->
        <label for="tHEPW" class="float-left">Password:</label>
        <input  type="password"   class="form-control"  id="tHEPW" placeholder="Enter Your Password" v-model="password" required :class="{ 'is-invalid': isSubmitted && $v.password.$error }" />
        <div v-if="isSubmitted && $v.password.$error" class="invalid-feedback">
          <span v-if="!$v.password.required">Password field is required</span>
          <span v-if="!$v.password.minLength">Password should be at least {{ $v.password.$params.minLength.min }} characters long</span>
        </div>
        <!-- button of submit // @keydown.enter="addUser()"-->
        <div class="text-left" id="mybutton">
          <button type="button" class="btn btn-success" >Sign-Up</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
const axios = require('axios');
import { required, minLength, email} from 'vuelidate/lib/validators'
export default { 
    name: "SignUpForm",
    data: () => ({
       active: null,
       message:'',
       name:'',
       email: '',
       password:'',
       isSubmitted: false
    }),
    validations: {
      name: {
        required,
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      }
    },
    methods: {
          validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
          },
          addUser(){
                this.isSubmitted = true;
                this.$v.$touch();

                if (!this.$v.$invalid) {
                  let myDataOfUser ={
                  name: this.name,
                  email: this.email,
                  password: this.password
                }
                let that = this 
                axios.post('http://localhost:3000/sign-up', myDataOfUser)
                .then(function (response) {
                    if(response.status == 200){
                      console.log('you arelogged in');
                      that.message = 'You have been registred GO sign in NOW!'
                      that.name = ''
                      that.email = ''
                      that.password=''
                     
                    }else{
                    //console.log('ELSE');
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

}
</script>
<style scoped>

.error{
  color: red;
  }
</style>