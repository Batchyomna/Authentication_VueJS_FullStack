import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueRouter from 'vue-router'



import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false


import Dashboard from './views/Dashboard.vue'
import Home from './views/Home.vue'
import store from './store'

const router = new VueRouter({
  mode: 'history', // that is mean that we will use / to change the page not(#)
  routes: [
    { path: '/home', component: Home },
    {
      path: '/dashboard', component: Dashboard, beforeEnter(to, from, next) {
        // check vuex store 
        if (store.getters.callTheToken()) {
          next()
        } else {
          next({ path: '/home' });
        }
      }
    },

    { path: '*', redirect: '/home' }
  ]
});

new Vue({
  render: h => h(App),
  router,
  store: store,
}).$mount('#app')
