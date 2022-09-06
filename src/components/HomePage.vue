<template>
    <div>
        <div class="header">
            <button class="btn" @click="redirect1"><font-awesome-icon icon="fa-solid fa-user-plus" size="xs"/> Register</button>
            <span>or</span>
            <button class="btn" @click="redirect2"><font-awesome-icon icon="fa-solid fa-arrow-right-to-bracket" /> Login</button>
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
    .header span{
        margin:0 1em;
        color: white;
    }
    .btn{
        width: 7em;
        box-shadow: 5px 5px 5px rgba(256,256,256,0.4);
        background-color: hsla(120,80%,30%,0.9);
        padding: 0.5;
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
    .container div:nth-child(2n+1){
        background-color: rgba(201, 212, 207,1);
        color: seagreen;
        text-align: left;
    }
    .container div:nth-child(2n){
        background-color: rgba(201, 205, 212,1);
        color: blueviolet;
        text-align: right;
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