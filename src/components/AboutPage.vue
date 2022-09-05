<template>
    <div>
        <NavBar />
    <div class="container">
        <div class="box">
            <h1>About</h1>
            <p>This is a User Module application. User register himself with email id and has to get it verified through OTP sent on the email.</p>
            <p>Only after verifying the user can login. By default every user is assigned standard role. But only admin can update the user to admin.</p>
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
    
    .box{
        max-width: 800px;
        width: 80%;
        padding: 1.2em;
        box-shadow: 8px 8px 5px rgba(0, 0, 0,0.2);
    }
    @media (max-width:650px) {
      .container{
        margin-top:10em;
        }
    }

</style>