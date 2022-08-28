<template>
    <div>
        <NavBar 
        :name="names"
        :email="email"/>
        <h1>Welcome <span style="color: white">{{names}}</span></h1>
    </div>
</template>

<script>
import NavBar from './NavBar.vue'
export default {
    name: 'HomePage',
    components:{
        NavBar
    },
    data(){
        return {
            name: this.$store.getters.getName,
            email: localStorage.getItem('email')
        }
    },
    computed:{
        names(){
            return this.$store.getters.getName
        }
    }
}
</script>

<style scoped>
    body{
        margin: 0px;
    }

</style>