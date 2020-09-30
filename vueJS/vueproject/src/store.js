import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const store = new Vuex.Store({

    state: {
        token: '',
        userName: '',
        idUser: null,
        userContacts: []

    },
    mutations: {
        modifyTheData(state, tokenCreated) {
            state.token = tokenCreated
        },
        signOutMutation(state) {
            state.token = ''
            state.userContacts = []

        },
        saveUserData(state, objectUserData) {
            state.userName = objectUserData.name
            state.idUser = objectUserData.id

        },
        saveContacts(state, contacts) {
            if (contacts.length) {// it will enter here when it is triggered by API get-contacts(array)
                for (let i = 0; i < contacts.length; i++) {
                    state.userContacts.push(contacts[i])
                }
            } else {// it will enter here when it is triggered by the component AddContactForm(just one element = object)
                state.userContacts.push(contacts)
            }
        }

    },

    actions: {
        triggerMutation(context, tokenCreated) {
            context.commit('modifyTheData', tokenCreated)
        },
        signOutAction(context) {
            context.commit('signOutMutation')

        },
        actionToUserData(context, objectUserData) {
            context.commit('saveUserData', objectUserData)

        },
        actionToSaveContacts(context, contacts) {
            context.commit('saveContacts', contacts)
        }
    },
    getters: {
        callTheToken: (state) => () => {
            if (state.token.length > 0) {
                return true;
            } else {
                return false
            }
        },
        readUserName: (state) => () => {
            return state.userName
        },
        readUserID: (state) => () => {
            //console.log('id', state.idUser);
            return state.idUser
        },
        readUserContacts: (state) => () => {
            console.log('read state in getters', state.userContacts);

            return state.userContacts
        }
    },
    plugins: [
        createPersistedState()
    ],
})

export default store
