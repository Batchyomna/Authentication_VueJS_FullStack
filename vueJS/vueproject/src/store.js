import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
//import Cookies from "js-cookie";

Vue.use(Vuex)

const store = new Vuex.Store({
   
    state: {
        token:''
      
    },
    mutations: {
        modifyTheData(state, tokenCreated) {
           state.token= tokenCreated
        },
        signOutMutation(state){
            state.token = ''
            console.log('in mutation');
            console.log('last token',state.token);
            
        }
    },

    actions:{
        triggerMutation(context, tokenCreated){
            context.commit('modifyTheData', tokenCreated)
        },
        signOutAction(context){
            context.commit('signOutMutation')
            console.log('in action');
        }
    }, 
    getters:{
        callTheToken: (state) => () =>{  
            if (state.token.length > 0) {
             return true;
            }else{
                return false
            }
        }
    },
    plugins: [
        createPersistedState()
      ],
})

export default store
