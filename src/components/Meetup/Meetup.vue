<template>
    <v-container>
        <v-layout row wrap>
            <v-flex>
                <v-card>
                    <v-card-title>
                        <h3 class="primary--text">{{meetup.title}}</h3>
                        <v-spacer></v-spacer>
                        <app-edit-meetup-title v-if="onOwner" :theMeetup="meetup"></app-edit-meetup-title>
                    </v-card-title>
                    <v-card-media
                    :src="meetup.imageUrl"
                    height="300px"
                    >
                    </v-card-media>
                    <v-card-text>
                        <div><p style="font-size:15px info--text"><strong>{{meetup.date | date}}-{{meetup.location}}</strong></p></div>
                        <v-spacer></v-spacer>
                        <app-edit-meetup-date v-if="onOwner" :meetup="meetup"></app-edit-meetup-date>
                        <app-edit-meetup-time v-if="onOwner" :meetup="meetup"></app-edit-meetup-time>
                        <p>{{meetup.description}}.</p>
                    </v-card-text>
                    
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <app-register v-if="isAuthenticated" :meetupId="meetup.id"></app-register>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    computed:{
        meetup(){
            return this.$store.getters.loadedMeetup(this.$route.params.id)
        },
        isAuthenticated(){
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        },
        onOwner(){
            if(!this.isAuthenticated){
                return false
            }
            return this.$store.getters.user.id == this.meetup.creatorId
        }
    }
}
</script>

