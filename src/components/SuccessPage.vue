<template>
    <div class="container">
        <div class="box">
            <img src="../assets/verified.jpeg" class="verified">
            <h2>{{message}}<a @click="redirect">login</a></h2>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'SuccessPage',
    props:{
        message: String
    },
    methods:{
        redirect(){
            this.$router.push({name:'login'})
        }
    }
}
</script>

<style scoped>
    .box{
        width: 50%;
        /* display: flex; */
        align-items: center;
        padding:2% 1% 1% 1%;
        box-sizing: border-box;
        font-size: 100%;
    }
    .verified{
        width: 50%;
    }
    a{
        color: green;
        cursor: pointer;
    }
</style>