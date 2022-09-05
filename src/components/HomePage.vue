<template>
    <div>
        <div class="header">
            <button class="btn" @click="redirect1">Register</button>
            or
            <button class="btn" @click="redirect2">Login</button>
        </div>
        <div class="container">
            <div class="item1 item">
                <div class="text">
                    <h1>Don't have an account? </h1>
                    <h2>We got you covered. Register yourself with minimalist info.</h2>                    
                </div>
                <div class="image">
                    <img src="../assets/register-image.png" alt="">
                </div>
            </div>
            <div class="item2 item">
                <div class="image">
                    <img src="../assets/otp-image.png" alt="">
                </div>
                <div class="text">
                    <h1>Already have an account? </h1>
                    <h2>Get yourself verified through otp.</h2>                    
                </div>
            </div>
            <div class="item3 item">
                <div class="text">
                    <h1>Have a verified account? </h1>
                    <h2>Log in and maintain your profile</h2>                    
                </div>
                <div class="image">
                    <img src="../assets/edit-profile-image.png" alt="">
                </div>
            </div>
            <div class="item4 item">
                <div class="image">
                    <img src="../assets/forget-password-image.png" alt="">
                </div>
                <div class="text">
                    <h1>Forgot your password? </h1>
                    <h2>We got you covered. Reset your password via email.</h2>                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    methods:{
        redirect1(){
        this.$router.push({name:'register'})
        },
        redirect2(){
        this.$router.push({name:'login'})
        }
    }
}
</script>

<style scoped>
    body{
        background-image: none;
    }
    .header{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1em;
    }
    .btn{
        width: 5em;
    }
    .container{
        width: 98.8vw;
        height: auto;
    }
    .item{
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 1em;
    }
    .item1{
        background-color: rgba(201, 212, 207, 0.701);
        color: seagreen;
    }
    .item2{
        background-color: rgba(201, 202, 212, 0.701);
        color: blueviolet;
    }
    .item3{
        background-color: rgba(201, 212, 207, 0.701);
        color: seagreen;
    }
    .item4{
        background-color: rgba(201, 205, 212, 0.701);
        color: blueviolet
    }
    @media(max-width:650px){
        /* .item{
            flex-direction: column;
        } */
        .container div:nth-child(2n+1){
            flex-direction: column;   
        }
        .container div:nth-child(2n){
            flex-direction:column-reverse;   
        }
    }

</style>