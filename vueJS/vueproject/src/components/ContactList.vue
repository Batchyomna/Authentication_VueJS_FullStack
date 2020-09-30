
<template>
  <div>
      <div v-for="item in items" :key="item.email" class="newContact">
            <p>Name: {{item.name}}</p>
            <p>Email: {{item.email}}</p>
      </div>
  </div>
</template>

<script>
export default {
    name:"ContactList",
    computed:{
        items(){
           console.log('i am  in the computed in the ContactList');
            let x = this.$store.getters.readUserContacts()
            //console.log('x', x[0][1].name);
         return x
        }
    } 

}
</script>

<style>
.newContact{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border: 1px solid black;
}
</style>