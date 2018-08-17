<template>
    <v-container  >
        <v-layout row wrap >
            <v-flex xs12 sm12 offset-sm1 >
                <h3 class="primary--text">Create a new Meetup</h3>
            </v-flex>
            <v-flex>
                <form @submit.prevent="createMeetup" >
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
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm1>
                            <v-btn raised
                            class="pink lighten-1"
                            @click="onPickFile"
                            >Update Image</v-btn>
                            <input type="file"
                            style="display:none"
                            ref="fileRef"
                            accept="image/*"
                            @change="onFilePicked">
                        </v-flex>
                    </v-layout>
                        <v-layout>
                            <v-flex xs12 sm6 offset-sm1>
                                <img :src ="imageUrl" alt="image" height="250"/>
                            </v-flex>
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
                            
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm1>
                            <v-time-picker v-model="time" format="ampm"></v-time-picker>
                            {{time}}
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
            date: null,
            time: new Date(),
            image: null,
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
            // if(!formIsValid || !this.image){
            //     return
            // }
            this.$store.dispatch('createMeetup',{
                title: this.title,
                location: this.location,
                image: this.image,
                description: this.description,
                date: this.onDate,
            })
            this.$router.push('/meetups')

        },
        onPickFile(){
            this.$refs.fileRef.click();
        },
        onFilePicked(event){
            const files = event.target.files
            let fileName = files[0].name
            if(fileName.lastIndexOf('.') <= 0){
                return alert('Please add a valide file')
            }
            const fileReader = new FileReader()
            fileReader.onload = (event)=>{
                this.imageUrl = event.target.result
            }
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        }
    }
}
</script>
