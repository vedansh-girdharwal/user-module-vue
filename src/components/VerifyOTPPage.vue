<template>
    <div class="container">
        <div class="box">
            <form @submit.prevent="verify">
                <div class="form-group">
                    <label for="otp">Enter 4 digit OTP</label>
                    <input type="number" id="otp" name="otp" v-model="otp" @input="$v.otp.$touch()" :class="{
                        'is-invalid': errorClass($v.otp),
                        'is-valid': validClass($v.otp)
                    }">
                    <div v-if="$v.otp.$error">
                        <div v-if="!$v.otp.required" class="error-message">
                            <small>OTP is required</small>
                        </div>
                        <div v-if="!$v.otp.minLength" class="error-message">
                            <small>OTP should be a 4-digit number</small>
                        </div>
                        <div v-if="!$v.otp.maxLength" class="error-message">
                            <small>OTP should be a 4-digit number</small>
                        </div>
                    </div>
                </div>
                <button class="btn" :disabled="$v.otp.$invalid"><font-awesome-icon icon="fa-solid fa-user-shield" size="xs"/> Verify</button>
            </form>
        </div>
        <div class="links">
            <span><a @click="resendOTP" >Resend OTP</a></span>
        </div>

    </div>
</template>

<script>
import Vue from 'vue';
import config from '../config.js';
import { required, minLength,maxLength} from 'vuelidate/lib/validators';
import {verifyOTP, resendOTP} from '../services/auth.js';
export default {
    name: 'VerifyOTPPage',
    data(){
        return {
            otp: 0
        }
    },
    validations:{
        otp:{
            required,
            minLength: minLength(4),
            maxLength: maxLength(4)
        }
    },
    methods:{
        verify(){
            this.$v.otp.$touch();
            if(!this.$v.otp.$invalid){
                this.spinner = this.$loading.show(this.$spinner);
                verifyOTP(this.otp,this.$route.params.id).then((res)=>{
                    if(res.status ==='VERIFIED'){
                        this.spinner.hide()
                        this.$router.push({name:'success', params:{message:'Email has been verified. You can now '}});
                    }else{
                        this.spinner.hide()
                        Vue.$toast.open({
                                message: "Invalid input. Check the OTP",
                                duration: config.toastDuration,
                                type: 'error'
                            });
                    }
                }).catch(error=>{
                    this.spinner.hide()
                            Vue.$toast.open({
                                message: error.response.data.message,
                                duration: config.toastDuration,
                                type: 'error'
                            });
                        }
                )
            }
        },
        resendOTP(){
            this.spinner = this.$loading.show(this.$spinner);
            resendOTP(this.$route.params.id)
            .then((res)=>{
                this.spinner.hide()
                Vue.$toast.open({
                    message: res.message,
                    duration: config.toastDuration,
                    type: 'success'
                });
            }).catch(error=>{
                this.spinner.hide()
                Vue.$toast.open({
                    message: error.response.data.message,
                    duration: config.toastDuration,
                    type: 'error'
                });
            })
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

<style scoped>
    .btn{
        margin-left: 3.5%;
        width: 93%;
    }
</style>