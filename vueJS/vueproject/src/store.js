import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
//import Cookies from "js-cookie";

Vue.use(Vuex)

const store = new Vuex.Store({
   
    state: {
        token:'',
        userName: '',
        idUser:null,
        userContacts: []
      
    },
    mutations: {
        modifyTheData(state, tokenCreated) {
           state.token= tokenCreated
        },
        signOutMutation(state){
            state.token = ''
            state.userContacts =[]
            // console.log('in mutation');
            // console.log('last token',state.token);
            
        },
        saveUserData(state,objectUserData){
            state.userName = objectUserData.name
            state.idUser = objectUserData.id

        },
        saveContacts(state, contacts){
            state.userContacts.push(contacts)
            // for(let i=0; i<contacts.length; i++){
            //     state.userContacts[i] = contacts[i]
            // }
            // console.log('in mutation contact');
            // console.log(contacts[0])
            // console.log(contacts[0].name);
            // console.log(contacts.length);
            // console.log(typeof contacts);
            // console.log(state.userContacts);
            // console.log(state.userContacts[0].name);
        }

    },

    actions:{
        triggerMutation(context, tokenCreated){
            context.commit('modifyTheData', tokenCreated)
        },
        signOutAction(context){
            context.commit('signOutMutation')
           
        },
        actionToUserData(context, objectUserData){
            //console.log('in action',objectUserData);
            context.commit('saveUserData', objectUserData)
  
        },
        actionToSaveContacts(context, contacts){
            context.commit('saveContacts', contacts )
            //console.log('in action contact');
            //console.log(contacts);
        }
    }, 
    getters:{
        callTheToken: (state) => () =>{  
            if (state.token.length > 0) {
             return true;
            }else{
                return false
            }
        },
        readUserName: (state)=>()=>{
            return state.userName
        },
        readUserID: (state)=>()=>{
            //console.log('id', state.idUser);
            return state.idUser
        },
        readUserContacts: (state)=>()=>{
            console.log('read state in getters', state.userContacts);

            return state.userContacts
        }
    },
    plugins: [
        createPersistedState()
      ],
})

export default store
