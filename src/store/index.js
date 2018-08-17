import Vue from 'vue'
import Vuex from 'vuex'
import {database, auth, storage} from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [],
        users: null,
        loading: false,
        error: null,
    },
    mutations: {
        setLoadedMeetups(state,payload){
            state.loadedMeetups = payload
        },
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
        loadedMeetups(context){
            context.commit('setLoading',true)
            database().ref('myMeetups').once('value')
            .then(
                data=>{
                    const obj = data.val()
                    let meetups = []
                    for(let k in obj){
                        meetups.push({
                            title : obj[k].title,
                            id : k,
                            imageUrl : obj[k].imageUrl,
                            description : obj[k].description,
                            date : obj[k].date,
                            location : obj[k].location,
                            creatorId: obj[k].creatorId
                        })
                    }
                    context.commit('setLoadedMeetups',meetups)
                    context.commit('setLoading',false)
                }
            )
            .catch(
                error=>{
                    console.log(error)
                    context.commit('setLoading',true)
                }
            )
        },
        createMeetup(context,payload){
            const meetup = {
                  title: payload.title,
                  location: payload.location,
                  description: payload.description ,  
                  date: payload.date.toISOString(), 
                  creatorId: context.getters.user.id
            }
            let imageUrl
            let key
            let ext
            database().ref('myMeetups').push(meetup)
            .then(
                (data)=>{
                    key = data.key
                    return key
                }
            )
            .then(key => {
                const fileName = payload.image.name
                ext = fileName.slice(fileName.lastIndexOf('.'))
                return storage().ref('myMeetups/'+ key + '.' + ext).put(payload.image)
            })
            .then(() => {
                return storage().ref('myMeetups/'+ key + '.' + ext).getDownloadURL();
            })
            .then(url => {
                imageUrl=url
                return database().ref('myMeetups').child(key).update({imageUrl:imageUrl})
            })
            .then(() => {
                context.commit('createMeetup',{
                    ...meetup,
                    imageUrl: imageUrl,
                    id: key
                })
            })
            .catch(
                error=>{
                    console.log(error)
                }
            )
            
        },
        signUserUp(context,payload){
            context.commit('setLoading',true)
            auth().createUserWithEmailAndPassword(payload.email,payload.password).then(
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
            auth().signInWithEmailAndPassword(payload.email,payload.password)
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
        autoSignin(context,payload){
            context.commit('setUser',{id: payload.uid, registeredMeetups: []})
        },
        logout(context){
            auth().logout()
            context.commit('setUser', null)
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