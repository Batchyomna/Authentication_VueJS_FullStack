import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
//import Cookies from "js-cookie";

Vue.use(Vuex)

const store = new Vuex.Store({
   
    state: {
        token:'',
        userName: '',
        idUser:null
      
    },
    mutations: {
        modifyTheData(state, tokenCreated) {
           state.token= tokenCreated
        },
        signOutMutation(state){
            state.token = ''
            // console.log('in mutation');
            // console.log('last token',state.token);
            
        },
        saveUserData(state,objectUserData){
            state.userName = objectUserData.name
            state.idUser = objectUserData.id

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
        readUserData: (state)=>()=>{
            //console.log('id', state.idUser);
            return state.userName
        }
    },
    plugins: [
        createPersistedState()
      ],
})

export default store
