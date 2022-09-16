<template>
    <div>
        <div class="header">
            <button class="btn" @click="redirect1"><font-awesome-icon icon="fa-solid fa-user-plus" size="xs"/> Register</button>
            <div class="logo">
                <img src="../assets/logo (2).png" alt="">
                <span><b>User Module</b></span>
            </div>
            <button class="btn" @click="redirect2"><font-awesome-icon icon="fa-solid fa-arrow-right-to-bracket" /> Login</button>
        </div>
        <div class="container">
            <transition-group name="fade" tag="div">
                <div v-for="i in [currentIndex]" :key="i">
                    <img :src="currentImg" class="slider-img" />
                    <section>
                        <h1>{{currentMsg}}</h1>
                        <h2>{{currentMsg2}}</h2>    
                    </section>
                </div>
            </transition-group>
            <a class="prev" @click="prev" href="#">&#10094;</a>
            <a class="next" @click="next" href="#">&#10095;</a>
        </div>
        <!-- <div class="container">
            <div class="item">
                <div class="text">
                    <h1 style="text-align:left">Don't have an account? </h1>
                    <h2>We got you covered. Register yourself with minimalist info.</h2>                    
                </div>
                <div class="image">
                    <img src="../assets/register-image.png" alt="">
                </div>
            </div>
            <div class="item">
                <div class="image">
                    <img src="../assets/otp-image.png" alt="">
                </div>
                <div class="text">
                    <h1>Already have an account? </h1>
                    <h2>Get yourself verified through otp.</h2>                    
                </div>
            </div>
            <div class="item">
                <div class="text">
                    <h1>Have a verified account? </h1>
                    <h2>Log in and maintain your profile</h2>                    
                </div>
                <div class="image">
                    <img src="../assets/edit-profile-image.png" alt="">
                </div>
            </div>
            <div class="item">
                <div class="image">
                    <img src="../assets/google-sign.png" alt="">
                </div>
                <div class="text">
                    <h1 style="text-align:right">Google Signin</h1>
                    <h2>You can signin with your Google account.</h2>                    
                </div>
            </div>
            <div class="item">
                <div class="text">
                    <h1 style="text-align:left">Forgot your password? </h1>
                    <h2>We got you covered. Reset your password via email.</h2>                    
                </div>
                <div class="image">
                    <img src="../assets/forget-password-image.png" alt="">
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data(){
        return{
            images:[
                require("../assets/register-image.png"),
                require("../assets/otp-image.png"),
                require("../assets/edit-profile-image.png"),
                require("../assets/google-sign.png"),
                require("../assets/forget-password-image.png")
            ],
            msgs:[
                "Dont have an account?",
                "Account created?",
                "Got your account verified?",
                "Google login",
                "Forgot your password?"
            ],
            msgs2:[
                "We got you covered. Register yourself with minimalist info.",
                "Get yourself verified through otp.",
                "Log in and maintain your profile.",
                "You can signin with your Google account.",
                "We got you covered. Reset your password via email."
            ],
            timer: null,
            currentIndex:-1
        }
    },
    mounted(){
        this.startSlide();
    },
    methods:{
        startSlide(){
            this.timer = setInterval(this.next(),4000);
        },
        next(){
            this.currentIndex += 1;
        },
        prev(){
            this.currentIndex -= 1;
        },
        redirect1(){
        this.$router.push({name:'register'})
        },
        redirect2(){
        this.$router.push({name:'login'})
        }
    },
    computed:{
        currentImg(){
            return this.images[Math.abs(this.currentIndex)% this.images.length];
        },
        currentMsg(){
            return this.msgs[Math.abs(this.currentIndex)% this.msgs.length];
        },
        currentMsg2(){
            return this.msgs2[Math.abs(this.currentIndex)% this.msgs2.length];
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
        justify-content: space-between;
        align-items: center;
        padding: 0.5em 1em;
        background-color: rgba(255, 255, 255);
    }
    .logo{
        display: flex;
        align-items: center;
        font-size: 1.5em;
        color:cadetblue;
        font-weight: 900;
    }
    .logo img{
        width: 50px;
    }
    /* .header span{
        margin:0 1em;
    } */
    .btn{
        width: 7em;
        box-shadow: 5px 5px 5px rgba(0,0,0,0.4);
        background-color: hsla(120,80%,30%,0.9);
        padding: 0.5em;
    }

    .fade-enter-active, .fade-leave-active{
        transition: all 0.9s ease;
        overflow: hidden;
        visibility: visible;
        position: absolute;
        width: 100%;
        opacity: 1;
    }

    .fade-enter, .fade-leave-to{
        visibility: hidden;
        width: 100%;
        opacity: 0;
    }
    .slider-img{
        height: auto;
        width: 100%;
    }
    .container div {
        border-radius: 0.7em;
        background-color: white;
        text-align: center;
        color: rgb(43, 64, 226);
        display: flex;
        align-items: center;
        padding: 1em;
    }
    .prev, .next{
        cursor: pointer;
        position: absolute;
        top: 35%;
        width: auto;
        padding: 16px;
        color: white;
        font-weight: bold;
        font-size: 18px;
        transition: 0.7s ease;
        border-radius: 1em;
        text-decoration: none;
        user-select: none;
    }
    .next{
        right: 0;
    }
    .prev{
        left: 0;
    }
    .prev:hover, .next:hover{
        background-color: rgba(0,0,0,1)
    }



    .container{
        width: 100%;
        height: auto;
        padding:3em;
        align-items: center;
    }
    /* .item{
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
    } */
    @media(550px< width <940px){

        h1{
            font-size: 1.9em;
        }
        h2{
            font-size:1.2em;
        }
        /* img{
            width: 390px;
        } */
    }
    @media(width <=550px){
        /* .item{
            flex-direction: column;
        } */
        
        /* .container div:nth-child(2n){
            flex-direction:column-reverse;   
        } */
        .container div{
            padding: 0.5em;
        }
        .container{
            padding: 2em;
        }
        h1{
            font-size: 1em;
        }
        h2{
            font-size: 0.7em;
        }
        /* img{
            width: 330px;
        } */
        .header{
            padding: 0.4em;
        }
        .logo{
            font-size: 90%;
            font-weight: 400;
        }
        .logo img{
            width: 30px;
        }
        .btn{
            width: 35%;
            max-width: 7em;
            font-size: 60%;
            padding: 1%;
        }
    }
    @media (max-width:750px){
        .container div{
            flex-direction: column;   
        }
        /* .prev, .next{
            color: black;
            font-size: 1em;
        }
        .prev:hover, .next:hover{
            background-color: rgba(255,255,255,1)
        } */
    }

</style>