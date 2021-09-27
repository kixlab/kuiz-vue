import Vue from 'vue'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: '898813989783-1n1hqp96aamip41580luiu8r6vvaudc2.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption);