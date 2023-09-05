import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/components/Map'
import Home from '../components/Home'
import Login from '../components/Login'

import Charts from '../components/Chart'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/Map',
      name: 'Map',
      component: Map
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Charts',
      name: 'Charts',
      component: Charts
    }
  ]
})
