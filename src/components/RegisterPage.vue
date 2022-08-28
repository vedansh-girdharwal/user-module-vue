<template>
    <div class="container">
        <div class="box">
            <h1>Register</h1>
            <form name="form" @submit.prevent="register">
                <div class="form-group">
                    <label for="name">Name</label>
                    <div><input type="text" class="form-ele" name="name" id="name" v-model="form.name" @blur="$v.form.name.$touch()" :class="{'is-invalid': errorClass($v.form.name),
                    'is-valid': validClass($v.form.name)}"/>
                    </div>
                    <div v-if="$v.form.name.$error">
                        <div v-if="!$v.form.name.required" class="error-message">
                            <small>Name field is required</small>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <div><input type="email" class="form-ele" name="email" id="email" v-model="form.email" @blur="$v.form.email.$touch()" :class="{'is-invalid': errorClass($v.form.email),
                    'is-valid': validClass($v.form.email)}"/>
                    </div>
                    <div v-if="$v.form.email.$error">
                        <div v-if="!$v.form.email.required" class="error-message">
                            <small>Email field is required</small>
                        </div>
                        <div v-if="!$v.form.email.email" class="error-message">
                            <small>Invalid email format</small>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="name">Password</label>
                    <div>
                    <input type="password" class="form-ele" name="password" id="password" v-model="form.password" @blur="$v.form.password.$touch()" :class="{'is-invalid': errorClass($v.form.password),
                    'is-valid': validClass($v.form.password)}"/>
                    </div>
                    <div v-if="$v.form.password.$error">
                        <div v-if="!$v.form.password.required" class="error-message">
                            <small>password field is required</small>
                        </div>
                        <div v-if="!$v.form.password.matchString" class="error-message">
                            <small>The password must have:</small>
                            <small>atleast 8 characters</small><br>
                            <small>one uppercase letter</small><br>
                            <small>one lowercase letter</small><br>
                            <small>one special character</small><br>
                            <small>one numeric</small><br>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="cnfPassword">Confirm password</label>
                    <div>
                    <input type="password" class="form-ele" name="cnfPassword" id="cnfPassword" v-model="cnfPassword" @input="$v.cnfPassword.$touch()" :class="{'is-invalid': errorClass($v.cnfPassword),
                    'is-valid': validClass($v.cnfPassword)}"/>
                    </div>
                    <div v-if="$v.cnfPassword.$error">
                        <div v-if="!$v.cnfPassword.required" class="error-message">
                            <small>confirm password field is required</small>
                        </div>
                        <div v-if="!$v.cnfPassword.matchPassword" class="error-message">
                            <small>confirm password is not matched</small>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn primary-btn" :disabled="$v.form.$invalid || $v.cnfPassword.$invalid">
                        Register
                    </button>
                </div>
            </form>
            <div class="redirect">
                <hr>
                Already has an account? <a @click="redirect">Login</a>
            </div>
        </div>
    </div>
</template>

<script>
    // import {register} from '../services/auth.js';
    import Vue from 'vue';
    import {email,required} from 'vuelidate/lib/validators';
    import config from '@/config';

    export default {
        name: 'RegisterPage',
        data(){
            return {
                processing: false,
                form: {
                    name: '',
                    email: '',
                    password: ''
                },
                cnfPassword:''
            }
        },
        validations:{
            form:{
                name:{
                    required
                },
                email:{
                    email,
                    required
                },
                password:{
                    required,
                    matchString: function(value){
                        return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(value);
                    }
                }
            },
            cnfPassword:{
                required,
                matchPassword: function(){
                    return this.cnfPassword===this.form.password;
                }
            }
        },
        methods:{
            register(){
                this.$v.form.$touch();
                if(!this.$v.form.$invalid){
                    this.$store.dispatch('register',this.form).then((res)=>{
                        console.log(res)
                        this.$router.push({name:'verifyOTP'})}).catch(error=>{
                            Vue.$toast.open({
                                message: error.response.data.message,
                                duration: config.toastDuration,
                                type: 'error'
                            });
                        });
                }else{
                    alert('Invalid input');
                }
            },
            validClass(field){
                return !field.$invalid && field.$model && field.$dirty;
            },
            errorClass(field){
                return field.$error;
            },
            redirect(){
                this.$router.push({name: 'login'});
            }
        }
    }
</script>

<style >
@import url('https://fonts.googleapis.com/css?family=Roboto');

    *{
        box-sizing: border-box;
        font-family: 'Roboto',sans-serif;
    }
    h1{
        font-weight: 100;
        font-size: 2.5em;
        text-align: center;
    }
    body{
        background-color: hsla(120,70%,40%,0.4);
        margin: 0px;
    }
    .container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content:center;
        height: 100vh;
    }
    .box{
        background-color: rgba(255,255,255,0.8);
        border-radius: 1em;
        width: 50%;
        display: flex;
        flex-direction: column;
        align-content: space-between;
        justify-items: center;
        max-width: 400px;
    }
    form{
        padding: 1em;
        display: flex;
        flex-direction: column;
        align-content: space-between;
    }
    .form-group{
        padding: 0.8em;
        text-align: start;
    }
    input{
        margin-top: 0.2em;
        padding: 0.5em;
        width: 100%;
        border-radius: 0.5em;
        border: 1px solid green;
        font-size: 1.2em;
    }
    .redirect{
        background-color: rgb(227, 227, 227);
        border-bottom-left-radius: 1em;
        border-bottom-right-radius: 1em;
        padding-bottom: 1em;
        text-align: center;
    }
    hr{
        margin-top: 0;
    }
    .btn{
        font-size: 1.2em;
        padding: 0.6em;
        border-radius: 0.5em;
        width: 100%;
        background-color: hsla(120,80%,30%,0.6);
        color:white;
        border: none;
    }
    .btn:hover{
        background-color: hsla(120,60%,40%,0.6) ;
        cursor: pointer;
    }
    .redirect a{
        color: green;
        cursor: pointer;
    }
</style>