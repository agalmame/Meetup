<template>
  <v-app>

    <v-navigation-drawer  fixed v-model="sideMenu" class="hidden-sm-and-up">
       <v-list>
        <v-list-tile 
          v-for="Item in menuItems"
          :key="Item.title"
          :to="Item.link">
          <v-list-tile-action>
            <v-icon>{{Item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{Item.title}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar  class="pink lighten-1">
      <v-toolbar-side-icon class="hidden-sm-and-up" @click="sideMenu=!sideMenu"></v-toolbar-side-icon>
      <v-toolbar-title><router-link to="/" tag="span" style="cursor: pointer">Meetup</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items 
         v-for="item in menuItems"
         :key="item.title"
         class="hidden-xs-only">
        <v-btn
          flat
          :to="item.link">
          <v-icon left >{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideMenu:false,
    }
  },
  computed: {
    menuItems(){
      let menuItems=[
          { icon: 'face',title: 'Sign up',link: '/signup'},
          { icon: 'lock_open',title: 'Sign in',link: '/signin'}
      ]
      if(this.isAuthenticated){
        menuItems=[
          { icon: 'supervisor_account', title: 'View Meetup' ,link: '/meetups'},
          { icon: 'room', title: 'Organize',link: '/meetups/new'},
          { icon: 'person',title: 'Profile',link: '/profile'},
        ]
      }
      return menuItems 
    },
    isAuthenticated(){
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
    }
  }
  name: 'App'

</script>
