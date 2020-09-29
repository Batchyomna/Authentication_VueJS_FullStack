<template>
<div>
  <ConnectedHeader/>
     <div class="container">
     <h3 class="display-4">You are Welcome in connected-user dashboard</h3>
     <b-card no-body>
    <b-tabs card>
      <b-tab title="List-Contact" active>
        <b-card-text><ContactList/></b-card-text>
      </b-tab>
      <b-tab title="Add-Contact">
        <b-card-text><AddContactForm/></b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
     </div>
  
  </div>


  
</template>

<script>
import ConnectedHeader from './ConnectedHeader'
import ContactList from '../components/ContactList'
import AddContactForm from '../components/AddContactForm'
export default { 
  name: 'Dashboard',
  components:{
    ConnectedHeader,
    AddContactForm,
    ContactList
  },
   data() {
    return {
     
    };
  },
  methods:{
  }
  
  }

</script>

<style scoped>

</style>
