<template>
    <button @click="redirect">Login</button>
</template>

<script>
export default {
    name: 'HomePage',
    methods:{
        redirect(){
        this.$router.push({name:'login'})
        }
    }
}
</script>

<style>

</style>