<template>
    <v-layout row justify-center>
        <v-dialog persistent accent v-model="act" width="300" >
            <v-btn fab slot="activator" color="primary">
                <v-icon>edit</v-icon>
            </v-btn>
            <v-card>
                <v-container>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-card-title>Edit Meetup</v-card-title>
                        </v-flex>
                        <v-divider></v-divider>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-text-field
                                name="title"
                                label="Title"
                                id="title"
                                required
                                v-model="editableTitle"
                                ></v-text-field>                                
                            </v-flex>
                        </v-layout>
                     <v-layout>
                        <v-flex xs12>
                            <v-textarea
                            name="description"
                            label="Description"
                            id="description"
                            required
                            multi-line
                            rows="3"
                            v-model="editableDescription">{{editableDescription}}</v-textarea>
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
    props: ['theMeetup'],
    data(){
        return {
            editableTitle: this.theMeetup.title,
            editableDescription: this.theMeetup.description,
            act:false,
        }
    },
    methods:{
        onSaveChanges(){
            if(this.editableTitle.trim()==='' || this.editableDescription.trim()==''){
                return
            }
            this.$store.dispatch('updateMeetupData',{
                id: this.theMeetup.id,
                title: this.editableTitle,
                description: this.editableDescription,
            })
            this.act=false
        }
    }
}
</script>

