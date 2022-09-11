<template>
    <div class="container">
        <div class="box">
            <h1>Forgot Password</h1>
            <form name="form" @submit.prevent="forgotPassword">
                <div class="form-group">
                    <span>Enter your email address below and we'll send you a link to reset your password.</span>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" v-model="form.email" @blur="$v.form.email.$touch()" :class="{
                        'is-invalid': errorClass($v.form.email),
                        'is-valid': validClass($v.form.email)
                    }" >
                    <div v-if="$v.form.email.$error">
                        <div v-if="!$v.form.email.required" class="error-message">
                            <small>Email is required</small>
                        </div>
                        <div v-if="!$v.form.email.email" class="error-message">
                            <small>Invalid email format</small>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn" :disabled="$v.form.$invalid"><font-awesome-icon icon="fa-solid fa-envelopes-bulk" /> Send password link</button>
                </div>
            </form>
        </div>
        <div class="links">
            <a @click="redirect">Back to Login</a>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {forgotPassword} from '@/services/auth.js';
    import {email,required} from 'vuelidate/lib/validators';
    import config from '@/config';
    export default {
        name: 'ForgotPasswordPage',
        data(){
                return {
                    processing: false,
                    form: {
                        email: ''
                    }
                }
        },
        validations:{
            form:{
                email:{
                    email,
                    required
                }
            }
        },
        methods:{
            forgotPassword(){
                this.$v.form.$touch();
                if(!this.$v.form.$invalid){
                    this.processing=true;
                    forgotPassword(this.form)
                        .then((res)=>{
                            if(res.status==="SENT"){
                                this.processing = false
                                Vue.$toast.open({
                                    message: res.message,
                                    duration: config.toastDuration,
                                    type: 'success'
                                })
                                this.$router.push({name:"success",params:{
                                    message:"Password reset email has been sent. "
                                }})
                            }else{
                                this.processing=false;
                                Vue.$toast.open({
                                message: "Invalid Email",
                                duration: config.toastDuration,
                                type: 'error'
                            })
                            }
                            }).catch(error=>{
                                this.processing=false
                            Vue.$toast.open({
                                message: error.response.data.message,
                                duration: config.toastDuration,
                                type: 'error'
                            });
                        });
                }else{
                    Vue.$toast.open({
                        message: "Invalid input",
                        duration: config.toastDuration,
                        type: 'error'
                    });
                }
            },
            validClass(field){
                return !field.$invalid && field.$model && field.$dirty;
            },
            errorClass(field){
                return field.$error;
            },
            redirect(){
                this.$router.push({name:'login'})
            }
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
</style>