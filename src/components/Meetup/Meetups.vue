<template>
    <v-container>
        <v-layout row wrap>
            <v-flex>

                <v-card height="100%" class="blue darken-1">

                    <v-container fluid>
                        <v-layout row >
                            <v-flex>
                                <v-card-media
                                src="https://www.planwallpaper.com/static/images/2015-wallpaper_111525594_269.jpg"
                                height="100%"
                                >
                                </v-card-media>
                            </v-flex>

                            <v-flex >
                                
                                <v-card-title  primary-title>
                                    <div>
                                        <h2 class="white--text">Meetup 1</h2>
                                        <p style="font-size:15px"><strong>29th jul 2018</strong></p>
                                    </div>
                                
                                </v-card-title>

                            <v-card-actions>
                                    <v-btn flat dark to="/meetups/1">
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
