<template>
    <v-alert error dismissible :value="true" @click="onClose">
        {{text}}
    </v-alert>
</template>
<script>
export default {
    props:['text'],
    methods: {
        onClose(){
            this.$emit('dismissed')
        }
    }
}
</script>
