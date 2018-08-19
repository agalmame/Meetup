<template>
    <v-layout row justify-center>
        <v-dialog persistent accent v-model="act" width="400" >
            <v-btn dark  slot="activator" color="primary">
                Edit Date
            </v-btn>
            <v-card>
                <v-container>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-card-title>Edit Meetup Date</v-card-title>
                        </v-flex>
                        <v-divider></v-divider>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-date-picker 
                                v-model="editableDate"
                                >
                                </v-date-picker>                                
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
            editableDate:null
        }
    },
    methods: {
        onSaveChanges () {
            const newDate = new Date(this.meetup.date)
            const day = new Date(this.editableDate).getUTCDate()
            const month = new Date(this.editableDate).getUTCMonth()
            const year = new Date(this.editableDate).getUTCFullYear()
            newDate.setUTCDate(day)
            newDate.setUTCMonth(month)
            newDate.setUTCFullYear(year)
            this.$store.dispatch('updateMeetupData',{id:this.meetup.id, date: newDate})
            this.act = false
        }
    },
    // created(){
    //     this.editableDate= new Date(this,meetup.date)
    // }
}
</script>
