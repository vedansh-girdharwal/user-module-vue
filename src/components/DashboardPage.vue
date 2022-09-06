<template>
    <div>
        <NavBar />
        <div class="container">
        <h1>Welcome <span style="color: white">{{name}}</span></h1>
        </div>
    </div>
</template>

<script>
import NavBar from './NavBar.vue'
export default {
    name: 'DashboardPage',
    components:{
        NavBar
    },
    data(){
        return {
            name: '',
            email: ''
        }
    },
    created(){
        this.$store.dispatch('getUser')
            .then((res)=>{
                this.name = res.user.name;
                this.email = res.user.email;
            })
    }
}
</script>

<style scoped>
    body{
        background-size: 100% 100%;
    }
    h1{
        color: white;
    }

</style>