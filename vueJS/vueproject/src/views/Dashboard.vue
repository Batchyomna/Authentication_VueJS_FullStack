<template>
  
  <div>
     <div class="container">
     <h1 class="display-4">This Dashboard Page</h1>
     <p class="lead">You are Welcome</p>
     <hr class="my-4">
      <b-button variant="danger" @click="signOut()">Log out</b-button>
     </div>
  </div>


  
</template>

<script>
export default { 
  name: 'Dashboard',
   data() {
    return {
     
    };
  },
  methods:{
    signOut(){
      this.$store.dispatch('signOutAction');
      this.$router.push('/home');
      console.log('in dashboard')
    }
  }
  
  }

</script>

<style scoped>

</style>
