<template>
    <div>

    </div>
</template>

<script>
import Vue from 'vue';
import config from '@/config.js';
export default {
    name: 'MiddleWare',
    data(){
        return {
            token:'',
            username:''
        }
    },
    created(){
        this.token = this.$route.query.token;
        this.username = this.$route.query.name;
        localStorage.setItem("role",this.$route.query.role);
        this.$store.commit('setRole',this.$route.query.role);
        this.$store.commit('setToken',this.token);
    },
    mounted(){
        Vue.$toast.open({
            message: "Logged in with Google",
            duration: config.toastDuration,
            type: "success"
        })
            this.$router.push({name:'home',params:{name:this.username}})
    }
}
</script>

<style>

</style>