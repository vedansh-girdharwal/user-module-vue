<template>
    <div>
        <NavBar />
    <div class="container">
        <div class="box">
            <h1>About</h1>
            <p>This is a User Module application. User register himself with email id and has to get it verified through OTP sent on the email.</p>
            <p>Only after verifying the user can login. By default every user is assigned standard role. But only admin can update the user to admin.</p>
            <p>You can Sign in with your <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="#EA4335 " d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/><path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"/><path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"/><path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"/></svg> Google account if registered with the same</p>
            <p>Only admin has access to all users. He can change the role of other users also. </p>
            <p>Users can view their profile and update it.</p>
            <p>If a user forgets his password, he can reset it by reset password link that would be sent on the users email. Also it can be changed after loggin in.</p>
            <p>Maintaining profile is optional and user can delete their account.</p>
        </div>
    </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
    name :'AboutPage',
    components:{
        NavBar
    },data(){
        return {
            name: '',
            email: ''
        }
    },
    created(){
        this.$store.dispatch('getUser')
            .then(res=>{
                this.name=res.user.name,
                this.email=res.user.email
            })
    }
}
</script>

<style scoped>
    .container{
        height: auto;
        margin-top: 6em;
    }
    .box{
        max-width: 800px;
        width: 80%;
        padding: 1.2em;
        box-shadow: 8px 8px 5px rgba(0, 0, 0,0.2);
    }
    p{
        border: 0.5px solid seagreen;
        border-radius: 0.3em;
        padding: 0.5em;
        color: white;
        background-image: url('../assets/green-bg.jpg');
        display: flex;
        align-items: center;
    }
    h1{
        font-weight: 900;
    }
    /* @media (max-width:650px) {
      .container{
        margin-top:10em;
        }
    } */

</style>