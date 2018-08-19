<template>
    <v-layout row justify-center>
        <v-dialog persistent accent v-model="act" width="400" >
            <v-btn dark  slot="activator" color="primary">
                Edit Time
            </v-btn>
            <v-card>
                <v-container>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-card-title>Edit Meetup Time</v-card-title>
                        </v-flex>
                        <v-divider></v-divider>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-time-picker 
                                v-model="editableTime"
                                >
                                </v-time-picker>                                
                            </v-flex>
                        </v-layout>
                    <v-divider></v-divider>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-card-actions>
                                <v-btn flat color="primary" @click="act=false">Close</v-btn>
                                <v-btn flat color="primary" @click="onSaveChanges">Save</v-btn>                                
                            </v-card-actions>
                        </v-flex>
                    </v-layout>                   
                    </v-layout>
                </v-container>
            </v-card>
        </v-dialog>
    </v-layout>
</template>
<script>
export default {
    props: ['meetup'],
    data () {
        return{
            act:false,
            editableTime:new Date()
        }
    },
    methods: {
        onSaveChanges () {
            const newDate = new Date(this.meetup.date)
            const hours = this.editableTime.match(/^(\d+)/)[1]
            const minutes = this.editableTime.match(/:(\d+)/)[1]
            newDate.setUTCHours(hours)
            newDate.setUTCMinutes(minutes)
            this.$store.dispatch('updateMeetupData',{id:this.meetup.id, date: newDate})
            this.act = false
        }
    },

}
</script>
