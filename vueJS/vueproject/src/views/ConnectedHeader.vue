<template>
  <b-navbar type="dark" variant="dark" nav-justified>
    <b-navbar-nav >
      <b-nav-item >Dashboard</b-nav-item>
      <b-nav-item >{{$store.getters.readUserName()}}</b-nav-item>
      <b-nav-item ><b-button variant="danger" @click="signOut()">Log out</b-button></b-nav-item>
    </b-navbar-nav>
  </b-navbar>
    
</template>
<script>
export default {
    name: 'ConnectedHeader',
   data() {
    return {
     
    };
  },
  methods:{
    signOut(){
      this.$store.dispatch('signOutAction');
      this.$router.push('/home');
      //console.log('sign out of dashboard')
    }
  }
    
}
</script>