<template>
    <div class="container">
        <div class="box">
            <h1>Login</h1>
            <hr/>
            <form name="form" @submit.prevent="login">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-ele" name="email" id="email" v-model="form.email" @blur="$v.form.email.$touch()" :class="{'is-invalid': errorClass($v.form.email),
                    'is-valid': validClass($v.form.email)}"/>
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
                    <input type="password" class="form-ele" name="password" id="password" v-model="form.password" @blur="$v.form.password.$touch()" :class="{'is-invalid': errorClass($v.form.password),
                    'is-valid': validClass($v.form.password)}"/>
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
                    <button class="btn" :disabled="$v.form.$invalid">
                        <font-awesome-icon icon="fa-solid fa-arrow-right-to-bracket" /> Login
                    </button>
                    
                </div>
                
            </form>
            <hr style="width:86%">
                <div class="google">
                    <button @click="googleAuth" class="btn"><font-awesome-icon icon="fa-brands fa-google" /> SignIn with Google</button>
                </div>
            <div class="redirect">
                <hr>
                Don't have an account? <a @click="redirect">Register</a>
            </div>
        </div>
        <div class="links">
            <a @click="forgotPassword">Forgot your password?</a>
        </div>
        <!-- <div class="spinner">
            <moon-loader :loading="processing" :color="color" :size="size"></moon-loader>
        </div> -->
    </div>
</template>

<script>
    import Vue from 'vue';
    import {email,required} from 'vuelidate/lib/validators';
    import config from '@/config';

    export default {
        name: 'LoginPage',
        data(){
            return {
                processing: false,
                size:100,
                color:"#0077b3",
                form: {
                    email: '',
                    password: ''
                }
            }
        },
        validations:{
            form:{
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
            }
        },
        methods:{
            login(){
                this.$v.form.$touch();
                if(!this.$v.form.$invalid){
                    this.processing=true
                    this.spinner = this.$loading.show(this.$spinner);
                    this.$store.dispatch('login',this.form)
                    .then((response)=>{
                        Vue.$toast.open({
                            message: `<font-awesome-icon icon="fa-solid fa-unlock-keyhole" /> ${response.message}`,
                                duration: config.toastDuration,
                                type: 'success'
                            });
                        this.spinner.hide()
                        this.$router.push({name:'home',params: { name:response.data.name }})
                        this.processing=false})
                    .catch(error=>{
                        this.processing=false
                        this.spinner.hide()
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
                this.$router.push({name: 'register'});
            },
            googleAuth(){
                window.location = `${config.BaseUrl}/auth/google`;
            },
            forgotPassword(){
                this.$router.push({name: 'forgotPassword'});
            },
        }
    }
</script>

<style scoped>
    .links *{
            color: white;
            cursor: pointer;
    }
    .links{
        padding: 1em;
    }
    .google{
        display: flex;
        justify-content:center;
        padding: 0.5em 1.7em;
    }
</style>