<template>
    <div>
        <NavBar/>
        <div class="container" :class="confirmationBox?'disabled':none">
            <div class="box">
                <div class="image">
                    <img :src="imageUrl" width="250" height= "250">
                    <button class="btn upload hovertextUp" data-hover="Upload Image" @click="onPickFile"><font-awesome-icon icon="fa-solid fa-camera" /></button>
                    <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked">
                    
                </div>
                <div class="edit-details" v-if="edit">
                    <div class="detail">
                        <h4>Email : </h4> <p>{{email}}</p>
                        <label for="name"><h4>Name</h4></label>
                        <input type="text" name="name" id="name" v-model="form.name">
                        <label for="address"><h4>Address</h4></label>
                        <input type="text" name="address" id="address" v-model="form.address">
                        <label for="phone"><h4>Phone</h4></label>
                        <input type="number" name="phone" id="phone" v-model="form.phone">
                    </div>
                    <div class="detail">
                        <label for="gender"><h4>Gender</h4></label>
                        <select name="gender" id="gender" v-model="form.gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <h4>Role : </h4> <p>{{role}}</p>
                        <h4>Profile created on : </h4><p>{{profileCreated}}</p>
                    </div>
                </div>
                <div class="details" v-else>
                    <div class="detail">
                        <h4>Email : </h4> <p class="overflow-auto">{{email}}</p>
                        <h4>Name : </h4> <p class="overflow-auto">{{form.name}}</p>
                        <h4>Address : </h4> <p class="overflow-auto">{{form.address}}</p>
                        <h4>Phone no. : </h4> <p>{{form.phone}}</p>
                    </div>
                    <div class="detail">
                        <h4>Gender : </h4> <p>{{form.gender}}</p>
                        <h4>Role : </h4> <p>{{role}}</p>
                        <h4>Profile created on : </h4> <p>{{profileCreated}}</p>
                    </div>
                </div>
                <div class="buttons">
                <button class="btn" @click="submit" v-if="edit"><font-awesome-icon icon="fa-solid fa-floppy-disk" /> Save</button>
                <button class="btn cancel" @click="toggle" v-if="edit" ><font-awesome-icon icon="fa-solid fa-xmark" /> Cancel</button>
                <button class="btn" @click="toggle" v-if="!edit"><font-awesome-icon icon="fa-solid fa-pen-to-square" /> Edit</button>
                </div>
            </div>
            <button class="deleteBtn hovertext" @click="deleteAcc" data-hover="Delete Account"><font-awesome-icon icon="fa-solid fa-trash-can" size="xl"/></button>
        </div>
        <div class="confirm" v-show="confirmationBox">
            <p>Are you sure that you want to delete your account?</p>
            <button class="btn" @click="confirm">Yes</button>
            <button class="btn cancel" @click="cancel">No</button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import config from '@/config.js'
    import {updateProfile,updateImage,deleteUser} from '@/services/auth.js'
    import NavBar from '@/components/NavBar.vue';
    export default {
        name:'ProfilePage',
        data(){
            return {
                form:{
                    name: '',
                    gender:'',
                    address:'',
                    phone:0,
                    image:null
                },

                id:'',
                role:'',
                email:'',
                imageUrl:'',
                profileCreated:'',
                confirmationBox:false,
                edit:false
            }
        },
        components:{
            NavBar
        },
        methods:{
            onPickFile(){
                this.$refs.fileInput.click()
            },
            onFilePicked(event){
                this.spinner = this.$loading.show(this.$spinner);
                const files = event.target.files;
                let fileName = files[0].name;
                if(fileName.lastIndexOf('.')<=0){
                    this.spinner.hide()
                    return Vue.$toast.open({
                                message: "Please select a valid file",
                                duration: config.toastDuration,
                                type: 'error'
                            });
                }
                const fileReader = new FileReader();
                fileReader.addEventListener('load',()=>{
                    this.imageUrl = fileReader.result
                    this.form.image = files[0]
                    return updateImage(this.id,this.form)
                        .then(response=>{
                            this.spinner.hide()
                            if(response.status==="UPDATED"){
                                Vue.$toast.open({
                                message: "Profile Image successfully uploaded",
                                duration: config.toastDuration,
                                type: 'success'
                                });
                            }
                        }).catch(error=>{
                            this.spinner.hide()
                            Vue.$toast.open({
                            message: error.response.data.message,
                            duration: config.toastDuration,
                            type: 'error'
                            });
                        })
                })
                fileReader.readAsDataURL(files[0])
            },
            toggle(){
                this.edit=!this.edit

            },
            submit(){
                return updateProfile(this.id,this.form)
                    .then(response=>{
                        if(response.status==="UPDATED"){
                            Vue.$toast.open({
                                message: "Profile has been updated",
                                duration: config.toastDuration,
                                type: 'success'
                            });
                            console.log(response.response);
                            this.edit=false;
                        }
                    }).catch(error=>{
                        Vue.$toast.open({
                            message: error.response.data.message,
                            duration: config.toastDuration,
                            type: 'error'
                        });
                    })
            },
            deleteAcc(){
                this.confirmationBox = true;
            },
            confirm(){
                this.spinner = this.$loading.show(this.$spinner);
                this.confirmationBox=false;
                return deleteUser(this.id)
                        .then(response=>{
                            if(response.status==="DELETED"){
                                Vue.$toast.open({
                                    message: "Account has been deleted",
                                    duration: config.toastDuration,
                                    type: 'success'
                                });
                                this.spinner.hide();
                                this.$router.push({name:'register'})
                            }else{
                                this.spinner.hide();
                                Vue.$toast.open({
                                    message: response.message,
                                    duration: config.toastDuration,
                                    type: 'error'
                                });
                            }
                        }).catch(error=>{
                            this.spinner.hide();
                            Vue.$toast.open({
                                message: error.response.data.message,
                                duration: config.toastDuration,
                                type: 'error'
                            });
                        })
            },
            cancel(){
                this.confirmationBox = false;
            }
        },
        created(){
            this.spinner = this.$loading.show(this.$spinner);
        this.$store.dispatch('getUser')
            .then((res)=>{
                this.form.name = res.user.name;
                this.email = res.user.email;
                this.form.gender = res.user.gender;
                this.role = res.user.role;
                this.form.phone = res.user.phone;
                this.form.address = res.user.address;
                this.profileCreated = res.user.profileCreated;
                this.imageUrl = res.user.imageUrl;
                this.id = res.user._id;
            })
        },
        mounted(){
            this.spinner.hide()
        }
    }
</script>

<style scoped>
    
    *{
        box-sizing: border-box;
    }
    .container{
        width: auto;
        padding: 5rem;
        height: auto;
        position: relative;
    }
    .box{
        padding: 1%;
        display: flex;
        flex-direction: column;
        max-width: none;
        width: auto;
        align-items: center;
    }
    .confirm{
        background-color: rgba(243, 173, 173, 0.925);
        padding: 1%;
        position:absolute;
        top:50%;
        left: 10%;
        width: 80%;
        border-radius: 0.7em;
        align-items: center;
    }
    .image{
        display: flex;
        justify-content: center;
        padding: 1em;
    }
    
    img{ 
        border-radius: 10em;
        border: 1px solid black;
    }
    .details, .edit-details{
        display: flex;
        padding: 1em;
        justify-content: space-around
    }
    h4,p{
        font-size: 1.2em;
    }
    .detail{
        padding: 1em;
        width: 25em;
    }
    .overflow-auto{
        overflow: auto;
    }    
        
    select{
        margin-top: 0.2em;
        padding: 0.5em;
        width: 100%;
        border-radius: 0.5em;
        border: 1px solid green;
        font-size: 1.2em;
    }
    .buttons{
        display: flex;
        align-content: center;
    }
    .btn{
        width: 10em;
        margin: 0 1em 1em 0;
    }
    .cancel{
        background-color:crimson;
    }
    .upload {
        width: 2.5em;
        height: 2.5em;
        background-color:blue;
        padding: 3px;
        border-radius: 4em;
        border: none;
        position: relative;
        margin-top: 180px;
        margin-left: -50px;
    }
    .hovertextUp:before {
        content: attr(data-hover);
        visibility: hidden;
        opacity: 0;
        width: 140px;
        background-color: blue;
        color: #fff;
        font-size: 0.8em;
        text-align: center;
        border-radius: 5px;
        padding: 5px 0;
        transition: opacity 0.5s ease-in-out;

        position: absolute;
        /* z-index: 1; */
        left: 110%;
        top: 25%;
    }

    .hovertextUp:hover:before {
        visibility: visible;
        opacity: 1;
    }
    .deleteBtn {
        width: 4em;
        height: 4em;
        background-color: crimson;
        padding: 3px;
        color: white;
        border-radius: 4em;
        border: none;
        position: absolute;
        right: 2em;
        bottom: 1em;
        cursor: pointer;
    }
    /* .hovertext {
        position: relative;
        border-bottom: 1px dotted black;
    } */

    .hovertext:before {
        content: attr(data-hover);
        visibility: hidden;
        opacity: 0;
        width: 140px;
        background-color: crimson;
        color: #fff;
        font-size: 1.2em;
        text-align: center;
        border-radius: 5px;
        padding: 5px 0;
        transition: opacity 1s ease-in-out;

        position: absolute;
        /* z-index: 1; */
        right: 110%;
        top: 25%;
    }

    .hovertext:hover:before {
        visibility: visible;
        opacity: 1;
    }

    @media (650px <= width <= 1000px) {
        img{
            width: 15em;
            height: 15em;
        }
        .detail{
            width: 17em;
        }
        
    }

    @media(max-width:650px){
        .details, .edit-details{
            flex-direction: column;
            align-content: space-around;
        }
        .detail{
            width: 19em;
            margin-bottom: -15px;
        }
        img{
            width: 12em;
            height: 12em;
        }
        .buttons{
            flex-direction: column;
        }
        .btn{
            margin-bottom: 1em;
            width: 5em;
        }
        .upload{
            width: 2em;
            height: 2em;
            margin-top: 150px;
        }
    }

</style>