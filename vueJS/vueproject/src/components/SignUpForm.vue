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
          required
        />
        <div class="error" v-if="!$v.name.required">Field is required.</div>
        <!-- Email -->
        <label for="email" class="float-left">Email address:</label>
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="Enter Your Email"
          v-model="email"
          required
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
        <div class="error" v-if="!validEmail(email)">
          You have to enter a valid email.
        </div>
        <!-- password -->
        <label for="tHEPW" class="float-left">Password:</label>
        <input
          type="password"
          class="form-control"
          id="tHEPW"
          placeholder="Enter Your Password"
          v-model="password"
          required
        />
        <div class="error" v-if="!$v.password.minLength">
          Your password must have at least
          {{ $v.password.$params.minLength.min }} characters.
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
        </div>
      </div>
    </form>
  </div>
</template>

<script>
const axios = require("axios");
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "SignUpForm",
  data: () => ({
    active: null,
    message: "",
    name: "",
    email: "",
    password: "",
  }),
  validations: {
    name: {
      required,
    },
    email: {
      required,
    },
    password: {
      required,
      minLength: minLength(8),
    },
  },
  methods: {
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    addUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let myDataOfUser = {
          name: this.name,
          email: this.email,
          password: this.password,
        };
        let that = this;
        axios
          .post("http://localhost:3000/sign-up", myDataOfUser)
          .then(function (response) {
            if (response.status == 200) {
              console.log("API is called");
              that.message = "You have been registred GO sign in NOW!";
              that.name = "";
              that.email = "";
              that.password = "";
            } else {
              console.log("ELSE");
              that.message = "There was a problem during the registration";
              that.name = "";
              that.email = "";
              that.password = "";
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }else{
        this.message = "You have to verify your data";

      }
    },
  },
};
</script>
<style scoped>
#mybutton {
  margin-top: 5%;
}

.error {
  color: red;
}
</style>