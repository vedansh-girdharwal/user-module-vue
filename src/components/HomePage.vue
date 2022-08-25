<template>
    <div>
        <h1>Welcome {{name}}</h1>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data(){
        return{
            name: this.$store.getters.getName
        }
    }
}
</script>

<style>

</style>