<template>
  <div>
    <form>
      <h3>{{ message }}</h3>
      <div class="col-md-6 mb-3" id="mySignUP">
        <!-- Name -->
        <label class="float-left">Name:</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter Your Name"
          id="theName"
          v-model="name"
          @input="$v.name.$touch()"
          :class="{ borderError: $v.name.$error == true }"
        />
        <div v-if="$v.name.$dirty">
            <p class="error" v-if="!$v.name.required">Name must not be empty.</p>
        </div>       
         <!-- Email -->
        <label for="email" class="float-left">Email address:</label>
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="Enter Your Email"
          v-model="email"
          @input="$v.email.$touch()"
          :class="{ borderError: $v.email.$error == true }"

        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
        <div v-if="$v.email.$dirty">
            <p class="error" v-if="!$v.email.required">Your email must not be empty.</p>
            <p class="error" v-if="!$v.email.email">
              You should enter a valid email.
            </p>
          </div>
        <!-- <div class="error" v-if="!validEmail(email)">
          You have to enter a valid email.
        </div> -->
        <!-- password -->
        <label for="tHEPW" class="float-left">Password:</label>
        <input
          type="password"
          class="form-control"
          id="tHEPW"
          placeholder="Enter Your Password"
          v-model="password"
           @input="$v.password.$touch()"
          :class="{ borderError: $v.password.$error == true }"
        />
         <div v-if="$v.password.$dirty">
            <p class="error" v-if="!$v.password.required">Your password must not be empty.</p>
            <p class="error" v-if="!$v.password.minLength">
              You should have at least {{ $v.password.$params.minLength.min}} characters.
            </p>
          </div>
          <label for="passwordCheck" class="float-left">Password again:</label>
          <input
            id="passwordCheck"
            class="form-control"
            v-model="passwordcheck"
            placeholder="Your password agin"
            @input="$v.passwordcheck.$touch()"
            type="password"
            :class="{ borderError: $v.passwordcheck.$error == true, borderSuccess: $v.passwordcheck.$dirty && !$v.passwordcheck.$error }"
          />
          <div v-if="$v.passwordcheck.$dirty">
            <p class="error" v-if="!$v.passwordcheck.required">passwordcheck name must not be empty.</p>
            <p class="error" v-if="!$v.passwordcheck.sameAsPassword">You should have the same password.</p>
          </div>
        <div class="text-left" id="mybutton">
          <button
            type="button"
            class="btn btn-success"
            v-on:click="addUser()"
            @keydown.enter="addUser()"
          >
            Sign-Up
          </button>
          <b-button variant="danger" @click="resetDatas">RESET</b-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
const axios = require("axios");
import { required,email, minLength, sameAs} from "vuelidate/lib/validators";
export default {
  name: "SignUpForm",
  data: () => ({
    active: null,
    message: "",
    name: "",
    email: "",
    password: "",
    passwordcheck: "",
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
      minLength: minLength(8),
    },
     passwordcheck: {
      required,
      minLength: minLength(8),
      sameAsPassword: sameAs("password"),
    },
  },
  methods: {
     resetDatas() { // we can add this method in button to reset all the field
      this.name = "";
      this.email = "";
      this.password = "";
      this.passwordcheck = "";
      this.$v.$reset();
    },
    validEmail: function (email) {
      var rg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return rg.test(email);
    },
    addUser() {
      this.$v.$touch();//calling $touch() method, we’re triggering Vuelidate to check the validation status of all the field.
       if (!this.$v.$invalid) {// if ther is not an error...continue
        let myDataOfUser = {
          name: this.name,
          email: this.email,
          password: this.password,
        };
        let that = this;
        axios
          .post("http://localhost:3000/sign-up", myDataOfUser)
          .then(function (response) {
            
            if (response.status === 201) {
              console.log("API is called");
              that.message = "You have been registred GO sign in NOW!";
              that.name = "";
              that.email = "";
              that.password = "";
            } else if(response.status === 202){
              that.message = 'This NAME is already exists. You have to choose another NAME';
              that.name = "";
              that.email = "";
              that.password = "";

            }
          })
          .catch(function (error) {
              console.log(error); 
          })
            
           
      }else{
        this.message = "You have to fill all the fields correclty ";

      }
    },
  },
};
</script>
<style scoped>
#mybutton {
  margin-top: 5%;
}
.borderError {
  border-color: red !important;
}
.borderSuccess {
  border-color: green !important;
}
.error {
  color: red;
}
</style>