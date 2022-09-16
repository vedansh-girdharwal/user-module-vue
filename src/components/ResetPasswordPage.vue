<template>
    <div class="container">
        <div class="box">
            <h1>Reset Password</h1>
            <form name="form" @submit.prevent="resetPassword">
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
                    <button class="btn"><font-awesome-icon icon="fa-solid fa-key" /> Reset password</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {resetPassword} from '@/services/auth.js';
    import {required} from 'vuelidate/lib/validators';
    import config from '@/config';
    export default {
        name: 'ResetPasswordPage',
        data(){
                return {
                    processing: false,
                    form: {
                        password: ''
                    },
                    cnfPassword:''
                }
        },
        validations:{
            form:{
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
            resetPassword(){
                this.$v.form.$touch();
                if(!this.$v.form.$invalid){
                    this.spinner = this.$loading.show(this.$spinner);
                    resetPassword(this.form,this.$route.params.id)
                        .then((res)=>{
                            Vue.$toast.open({
                                message: res.message,
                                duration: config.toastDuration,
                                type: 'success'
                            })
                        }).then(()=>{
                            this.spinner.hide()
                                this.$router.push({
                                    name:'success', 
                                    params:{message:'Password has been reset. You can move to '}
                                })
                            }).catch(error=>{
                                this.spinner.hide()
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
            }
        }
}
</script>

<style>

</style>