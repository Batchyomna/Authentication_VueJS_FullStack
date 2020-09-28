<template>
<div>
  <ConnectedHeader/>
     <div class="container">
     <h3 class="display-4">You are Welcome in connected-user dashboard</h3>
     <hr class="my-4">
     </div>
  
  </div>


  
</template>

<script>
import ConnectedHeader from './ConnectedHeader'
export default { 
  name: 'Dashboard',
  components:{
    ConnectedHeader
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
