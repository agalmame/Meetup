import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [
            {   imageUrl: 'https://www.planwallpaper.com/static/images/96d186ef9ae1d063b50bc1d9a03af5cc--mobile-wallpaper-photo-wallpaper.jpg',
                id: '1234567',
                title: 'some text',
                location: 'some location',
                description: 'some description',
                date: '2012-02-02',                    
            },
            {   imageUrl: 'https://www.planwallpaper.com/static/images/2015-wallpaper_111525594_269.jpg',
                id: '1234568',
                title: 'some arbitary text',
                location: 'some location',
                description: 'some description',  
                date: '2015-07-02',       
            },
            {   imageUrl: 'https://www.planwallpaper.com/static/images/4442617-hd-wallpapers.jpg',
                id: '1234569',
                title: 'a small text',
                location: 'some location',
                description: 'some description' ,
                date: '2011-04-08',           
            },
        ],
        users: null,
        loading: false,
        error: null,
    },
    mutations: {
        createMeetup(state,payload){
            state.loadedMeetups.push(payload)
        },
        setUser(state,payload){
            state.users=payload
        },
        setLoading(state,payload){
            state.loading=payload 
        },
        setError(state,payload){
            state.error=payload 
        },
        clearError(state){
            state.error=null
        }
    },
    actions :{
        createMeetup(context,payload){
            context.commit('createMeetup',payload)
        },
        signUserUp(context,payload){
            context.commit('setLoading',true)
            firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password).then(
                user=>{
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: [],
                    }
                    context.commit('setUser',newUser)
                    context.commit('setLoading',false)
                } 
            )
            .catch(
                error => {
                    context.commit('setLoading',false)
                    context.commit('setError',error)
                    console.log(error)
                }
            )
        },
        signUserIn(context,payload){
            context.commit('setLoading',true)
            firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
            .then(
                user=>{
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: [],
                    }
                    context.commit('setUser',newUser)
                    context.commit('setLoading',false)
                }
            )
            .catch(
                error => {
                    context.commit('setError',error)
                    context.commit('setLoading',false)
                    console.log(error)
                }
            )
        },
    },
    getters: {
        loadedMeetups(state){
            return state.loadedMeetups.sort((meetupA,meetupB)=>{
                return meetupA.date > meetupB.date
            })
        },
        loadedMeetup(state){
            return (meetupId)=>{
                return state.loadedMeetups.find((meetup)=>{
                    return meetup.id == meetupId
                })
            }
            
        },
        user (state){
            return state.users
        },
        error(state){
            return state.error
        },
        loading(state){
            return state.loading
        },

    },
})