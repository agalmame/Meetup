<template>
    <v-dialog persistent v-model="act" max-width="300">
        <v-btn slot="activator" class="pink lighten-2">
            {{reg}}
        </v-btn>
        <v-card>
            <v-card-title v-if="!isRegistred" class="info">Register to this meetup ?</v-card-title>
            <v-card-title v-else class="warning">Unregistertion from this meetup ?</v-card-title>
           <v-card-text><strong>You can always change you decision </strong></v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn flat @click="act=false" class="info">Cancel</v-btn>
                <v-btn flat @click="onAgree" class="info" >Confirm</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: ['meetupId'],
    data(){
        return {
            act: false,
        }
    },
    computed:{
        reg(){
            return this.isRegistred ? 'Unregister': 'Register'
        },
        isRegistred(){
            return this.$store.getters.user.registeredMeetups.findIndex((meetup)=>{
                return meetup==this.meetupId
            }) >= 0
        }
    },
    methods:{
        onAgree(){
            if(this.isRegistred){
                this.$store.dispatch('UnregisterUserFromMeetup',this.meetupId)
                this.act=false
            }else{
                this.$store.dispatch('registerUserToMeetup',this.meetupId)
                this.act=false
                }
        }
    }
}
</script>
