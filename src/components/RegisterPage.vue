<template>
    <div class="container" >
        <div class="box" >
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
                    <button class="btn " :disabled="$v.form.$invalid || $v.cnfPassword.$invalid || processing">
                        <font-awesome-icon icon="fa-solid fa-user-plus" size="xs"/>  Register
                    </button>
                </div>
            </form>
            <div class="redirect">
                <hr>
                Already has an account? <a @click="redirect">Login</a>
            </div>
        </div>
        <!-- <div class="spinner">
            <moon-loader :loading="processing" :color="seagreen" :size="size"></moon-loader>
        </div> -->
    </div>
</template>

<script>
    import Vue from 'vue';
    import {email,required} from 'vuelidate/lib/validators';
    import config from '@/config';
    // import MoonLoader from "vue-spinner/src/MoonLoader.vue";


    export default {
        name: 'RegisterPage',
        data(){
            return {
                processing: false,
                // size:"100px",
                form: {
                    name: '',
                    email: '',
                    password: ''
                },
                cnfPassword:''
            }
        },
        components: {
    // MoonLoader
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
                    this.processing=true;
                    this.spinner = this.$loading.show(this.$spinner);
                    this.$store.dispatch('register',this.form).then((res)=>{
                        Vue.$toast.open({
                                message: res.message,
                                duration: config.toastDuration,
                                type: 'success'
                            });
                        this.$router.push({name:'verifyOTP',params:{id:res.data._id}})
                        this.processing=false
                        this.spinner.hide()}).catch(error=>{
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
                this.$router.push({name: 'login'});
            }
        }
    }
</script>

<style >

    /* .spinner{
        position: absolute;
        z-index: 2;
        top: 45%;
        left: 45%;
    } */
</style>