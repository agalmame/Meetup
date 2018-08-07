<template>
    <v-container>
        <v-layout row wrap v-for="meetup in Meetups" :key="meetup.id" class="mt-3">
            <v-flex  >

                <v-card height="100%" class="blue darken-1">

                    <v-container fluid>
                        <v-layout row >
                            <v-flex>
                                <v-card-media
                                :src="meetup.imageUrl"
                                height="100%"
                                >
                                </v-card-media>
                            </v-flex>

                            <v-flex >
                                
                                <v-card-title  primary-title>
                                    <div>
                                        <h2 class="white--text">{{meetup.title}}</h2>
                                        <p style="font-size:15px"><strong>{{meetup.date | date}}</strong></p>
                                    </div>
                                
                                </v-card-title>

                            <v-card-actions>
                                    <v-btn flat dark :to="'/meetups/'+meetup.id">
                                        <v-icon right>mdi-chevron-right</v-icon>
                                        view meetup
                                    </v-btn>
                                </v-card-actions>
                             
                            </v-flex>

                        </v-layout>
                    </v-container>

                </v-card>
            </v-flex>
        </v-layout>

    </v-container>
</template>
<script>
export default {
    computed: {
        Meetups(){
            return this.$store.getters.loadedMeetups
        }
    },
    }
</script>
