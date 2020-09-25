<template>
<div class="jumbotron">
    <div class="container">
     <h1 class="display-4">Connection Interface</h1>
     <p class="lead">Below the form for signUP or signIN in our magnificient application!</p>
     <hr class="my-4">
     <FormHandler/>
     
    </div>
</div>
</template>
<script>
import FormHandler from './FormHandler'
export default {
    name: "Home",
    components:{
    FormHandler,
    }
}
</script>
