<template>
    <v-container>
        <v-layout row wrap class="mb-2">
            <v-flex  xs12 sm6 class="text-xs-center text-lg-right">
                <v-btn class="blue lighten-1" large to="/meetups">Explore Meetups</v-btn>
            </v-flex>
            <v-flex class="text-xs-center text-lg-left" xs12 sm6>
                <v-btn class="blue lighten-1" large to="/meetups/new">Explore Meetups</v-btn>
            </v-flex>
        </v-layout>
            <v-layout wrap row class="mt-3">
            <v-flex>
                <v-carousel>
                    <v-carousel-item
                    v-for="meetup in meetups"
                    :key="meetup.id"
                    :src="meetup.imageUrl"
                    reverse-transition="fade"
                    transition="fade"
                    style="cursor:pointer"
                    @click.native.stop="onLoadMeetup(meetup.id)"
                    >
                    <div class="title">
                        {{meetup.title}}
                    </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-3">
            <v-flex class="text-sm-center">
                <p>Welcome to Meetup.com</p>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    data(){
        return{
            meetups:[
                { imageUrl: 'https://www.planwallpaper.com/static/images/96d186ef9ae1d063b50bc1d9a03af5cc--mobile-wallpaper-photo-wallpaper.jpg', id: '1234567', title: 'some text'},
                { imageUrl: 'https://www.planwallpaper.com/static/images/2015-wallpaper_111525594_269.jpg', id: '1234568', title: 'some arbitary text'},
                { imageUrl: 'https://www.planwallpaper.com/static/images/4442617-hd-wallpapers.jpg', id: '1234569', title: 'a small text'}
            ]
        }
    },
    methods: {
        onLoadMeetup (id){
         this.$router.push('/meetups/' +id)
        }

    }
}
</script>
<style scoped>
    .title{
        position: absolute;
        bottom: 50px;
        color: aliceblue;
        font-size: 2em;
        padding: 20px;
        left: 500px;
    }
    .mar{
        margin: 20px;
    }
</style>


