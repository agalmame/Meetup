import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CreateMeetup from '@/components/Meetup/CreateMeetup'
import Meetups from '@/components/Meetup/Meetups'
import Profile from '@/components/User/Profile'
import Signin from '@/components//User/Signin'
import Signup from '@/components//User/Signup'
import Meetup from '@/components/Meetup/Meetup'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups,
    },
    {
      path: 'meetups/new',
      name: 'New',
      component: CreateMeetup
    },
    {
      path: '/meetups/:id',
      name: 'Meetup',
      component: Meetup
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile 
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin 
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup 
    },
  ]
})