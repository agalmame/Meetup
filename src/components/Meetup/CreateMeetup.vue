<template>
    <v-container  >
        <v-layout row wrap >
            <v-flex xs12 sm12 offset-sm1 >
                <h3 class="primary--text">Create a new Meetup</h3>
            </v-flex>
            <v-flex>
                <form @submit.prevent="createMeetup()" >
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm1 >
                            <v-text-field
                            name="title"
                            label="Title"
                            id="title"
                            required
                            v-model="title"></v-text-field>
                        </v-flex>
                    </v-layout>
                     <v-layout>
                        <v-flex xs12 sm6 offset-sm1>
                            <v-text-field
                            name="location"
                            label="Location"
                            id="location"
                            required
                            v-model="location"></v-text-field>
                        </v-flex>
                    </v-layout>
                     <v-layout wrap row>
                        <v-flex xs12 sm6 offset-sm1>
                            <v-text-field
                            name="imageUrl"
                            label="ImageUrl"
                            id="imageUrl"
                            required
                            v-model="imageUrl"></v-text-field>
                        </v-flex>
                        <v-layout row wrap>
                            <v-flex xs12 sm6 offset-sm1>
                                <img 
                                :src="imageUrl" 
                                alt="your image"
                                height="200px"
                                width="200px"
                                >
                            </v-flex>
                        </v-layout>
                    </v-layout>
                     <v-layout>
                        <v-flex xs12 sm6 offset-sm1>
                            <v-textarea
                            name="description"
                            label="Description"
                            id="description"
                            required
                            multi-line
                            rows="3"
                            v-model="description"></v-textarea>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm1>
                            <h3>Choose Date & Time</h3>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm1 class="mb-3">
                            <v-date-picker  v-model="date"></v-date-picker>
                            {{date | date}}
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm1>
                            <v-time-picker v-model="time" format="ampm"></v-time-picker>
                            {{time}}
                        </v-flex>
                    </v-layout>
                    {{onDate | date}}
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm1>
                            <v-btn class="primary" :disabled="formIsValid ==! false" type="submit">
                                Create Your MeetUp
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    data(){
        return {
            title: '',
            imageUrl: '',
            location: '',
            description: '',
            date: null,
            time: new Date(),
        }
    },
    computed: {
        formIsValid() {
            return this.title == '' || 
            this.imageUrl == '' || 
            this.description == '' ||
            this.location == ''
        },
        onDate(){
            const date = new Date(this.date)
            
            if (typeof this.time === 'string') {
            
            var hours = this.time.match(/^(\d+)/)[1]
            hours=parseInt(hours)+1
            const minutes = this.time.match(/:(\d+)/)[1]
            date.setHours(hours)
            date.setMinutes(minutes)
            } else {
            date.setHours(this.time.getHours()+1)
            date.setMinutes(this.time.getMinutes())
            }
            return date
        }
    },
    methods:{
        createMeetup(){
            // if(!formIsValid){
            //     return
            // }
            this.$store.dispatch('createMeetup',{
                title: this.title,
                location: this.location,
                imageUrl: this.imageUrl,
                description: this.description,
                date: this.onDate,
                id: Math.floor(Math.random()*10000)
            })
            this.$router.push('/meetups')

        }
    }
}
</script>
