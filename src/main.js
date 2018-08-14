// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { initializeApp } from 'firebase'
import {store} from './store/index'
import 'vuetify/dist/vuetify.min.css'
import DateF from './filters/Date'
import Alert from './components/shared/Alert'

Vue.filter('date',DateF)
Vue.use(Vuetify, { theme: {
  primary: '#ee44aa',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})
Vue.component('app-alert',Alert)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    initializeApp({
      apiKey: 'AIzaSyD5UHAoDjMFiI9r3rrWjblY76A4BXKlnyE',
      authDomain: 'meetups-af271.firebaseapp.com',
      databaseURL: 'https://meetups-af271.firebaseio.com',
      projectId: 'meetups-af271',
      storageBucket: 'meetups-af271.appspot.com',
    })
    this.$store.dispatch('loadedMeetups')
  }
})


