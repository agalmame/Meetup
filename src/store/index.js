import Vue from 'vue'
import Vuex from 'vuex'

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
        users: {
            id: '123456789a',
            registeredMeetups: ['1234568']
        }
    },
    mutations: {
        createMeetup(state,payload){
            state.loadedMeetups.push(payload)
        },
    },
    actions :{
        createMeetup(context,payload){
            context.commit('createMeetup',payload)
        }
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
            
        }

    },
})