<template>
<div>
  <b-card no-body>
    <b-tabs card>
      <b-tab title="sign-in" active>
        <b-card-text><SignInForm/></b-card-text>
      </b-tab>
      <b-tab title="sign-up">
        <b-card-text><SignUpForm/></b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</div>

  
</template>

<script>
import SignUpForm from '../components/SignUpForm'
import SignInForm from '../components/SignInForm'
export default { 
  name: 'FormHandler',
   components:{
    SignUpForm,
    SignInForm
  }
}

</script>

<style scoped>
a:active{
  background:white
}
</style>
