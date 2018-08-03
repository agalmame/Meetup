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
                            <v-text-field
                            name="description"
                            label="Description"
                            id="description"
                            required
                            multi-line
                            rows="3"
                            v-model="description"></v-text-field>
                        </v-flex>
                    </v-layout>
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
        }
    },
    computed: {
        formIsValid() {
            return this.title == '' || 
            this.imageUrl == '' || 
            this.description == '' ||
            this.location == ''
        }
    },
    methods:{
        createMeetup(){
            this.$store.dispatch('createMeetup',{
                title: this.title,
                location: this.location,
                imageUrl: this.imageUrl,
                description: this.description,
                date: new Date(),
            })

        }
    }
}
</script>
