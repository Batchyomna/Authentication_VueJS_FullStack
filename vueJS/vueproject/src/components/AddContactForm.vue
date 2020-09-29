<template>
  <div>
    <form>
        
      <div class="col-md-6 mb-3">
          <h4>{{ message }}</h4>
        <label class="float-left">Name:</label>
        <input type="text" class="form-control" placeholder="Enter the name of your contact" id="theName" v-model="name" required/>
        
        <label for="theEmail" class="float-left">Email address:</label>
        <input type="email" class="form-control" id="theEmail" placeholder="Enter the email of your contact" v-model="email" />

        <div class="text-left" id="mybutton">
          <button type="button" class="btn btn-success" v-on:click="addContact()" @keydown.enter="addContact()">Add</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
const axios = require("axios");

export default {
  name: "AddContactForm",
  data: () => ({
      name:"",
      email: "",
      message: "",
    }),
    methods: {
        addContact() {
            let dataOfContact = {
                name: this.name,
                email:this.email,
                id_user_affiliate: this.$store.getters.readUserID()
            };
            let that = this
            axios
                .post("http://localhost:3000/add-new-contact", dataOfContact)
                .then(function (response) {
                if(response.status === 200) {
                  //that.$store.dipatch('actionToAddNewContact', )
                 that.name = ""
                 that.email = ""
                 that.message = " Your contact has been successfully registered"
                }
                })
                .catch(function (error) {
                console.log(error);                
            });
        },
    
    }
}
</script>
<style scoped>
#mybutton {
  margin-top: 5%;
}
</style>