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
        registerUserToMeetup(state,payload){
            if(state.users.registeredMeetups.findIndex(id=>{return id== payload.id}) >= 0){
                return
            }
            state.users.registeredMeetups.push(payload.id)
            console.log('test')
            state.users.fbKeys[payload.id]=payload.fbKey
        },
        UnregisterUserFromMeetup(state,payload){
            const registedMeetup = state.users.registeredMeetups
            registedMeetup.splice(registedMeetup.findIndex(m=>{
                return m.id==payload
            }),1)
            Reflect.deleteProperty(state.users.fbKeys,payload)
        },
        setLoadedMeetups(state,payload){
            state.loadedMeetups = payload
        },
        createMeetup(state,payload){
            state.loadedMeetups.push(payload)
        },
        setUser(state,payload){
            state.users=payload
        },
        updateMeetup(state,payload){
            const meetup = state.loadedMeetups.find(meetup=>{
                return meetup.id === payload.id
            })
            if(payload.title){
                meetup.title=payload.title
            }
            if(payload.description){
                meetup.description=payload.description
            }
            if(payload.date){
                meetup.date=payload.date
            }
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
        registerUserToMeetup(context,payload){
            context.commit('setLoading',true)
            const  user = context.getters.user
            database().ref('/users/'+user.id).child('/registration/')
            .push(payload)
            .then(data=>{
                context.commit('setLoading',false)
                context.commit('registerUserToMeetup',{id: payload, fbKey: data.key })
            })
            .catch(err=>{
                context.commit('setLoading',false)
                console.log(err)
            })
        },
        UnregisterUserFromMeetup(context,payload){
            context.commit('setLoading',true)
            const user = context.getters.user
            if(!user.fbKeys) return
            const fbkey = user.fbKeys[payload]
            database().ref('users/'+user.id+'/registration').child(fbkey).remove()
            .then(()=>{
                context.commit('setLoading',false)
                context.commit('UnregisterUserFromMeetup',payload)
            })
            .catch(err=>{
                context.commit('setLoading',false)
                console.log(err)
            })
        },
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
                        fbKeys:{},
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
                        fbKeys:{},
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
        updateMeetupData(context,payload){
            context.commit('setLoading',true)
            const updateObj = {}
            if(payload.title){
                updateObj.title=payload.title
            }
            if(payload.description){
                updateObj.description=payload.description
            }
            if(payload.date){
                updateObj.date=payload.date
            }
            database().ref('myMeetups').child(payload.id).update(updateObj)
            .then(()=>{
                context.commit('updateMeetup',payload)
                context.commit('setLoading',false)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        autoSignin(context,payload){
            context.commit('setUser',{id: payload.uid, registeredMeetups: [], fbKeys: {}})
        },
        fetchUserData(context){
            context.commit('setLoading',true)
            database().ref('/users/'+context.getters.user.id+'/registration/').once('value')
            .then(data=>{
                const pairsMeetup = data.val()
                let registrationMeetup = []
                let swapperdPairs ={}
                for(let key in pairsMeetup){
                    registrationMeetup.push(pairsMeetup[key])
                    swapperdPairs[pairsMeetup[key]] = key
                }
                const updatedUser = {
                    id: context.getters.user.id,
                    registeredMeetups: registrationMeetup,
                    fbKeys: swapperdPairs,
                }
                context.commit('setUser',updatedUser)
                context.commit('setLoading',false)

            })
            .catch(err=>{
                console.log(err)
                context.commit('setLoading',false)})

        },
        logout(context){
            auth().signOut()
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