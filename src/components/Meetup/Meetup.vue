<template>
    <v-container>
        <v-layout row wrap>
            <v-flex>
                <v-card>
                    <v-card-title>
                        <h3 class="primary--text">{{meetup.title}}</h3>
                    </v-card-title>
                    <v-card-media
                    :src="meetup.imageUrl"
                    height="300px"
                    >
                    </v-card-media>
                    <v-card-text>
                        <div><p style="font-size:15px info--text"><strong>{{meetup.date | date}}-{{meetup.location}}</strong></p></div>
                        <p>{{meetup.description}}.</p>
                    </v-card-text>
                    
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="pink ligthen-3">Register</v-btn>
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
    }
}
</script>

