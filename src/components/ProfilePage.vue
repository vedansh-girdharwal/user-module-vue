<template>
    <div>
        <NavBar/>
        <div class="container">
            <div class="box">
                <div class="image">
                    <img :src="imageUrl" width="250" height= "250">
                    <button></button>
                    <input type="file" >
                    
                </div>
                <div class="edit-details" v-if="edit">
                    <div class="detail">
                        <h4>Email : {{form.email}}</h4>
                        <label for="name"><h4>Name</h4></label>
                        <input type="text" name="name" id="name" v-model="form.name">
                        <label for="address"><h4>Address</h4></label>
                        <input type="text" name="address" id="address" v-model="form.address">
                        <label for="phone"><h4>Phone</h4></label>
                        <input type="number" name="phone" id="phone" v-model="form.phone">
                    </div>
                    <div class="detail">
                        <label for="gender"><h4>Gender</h4></label>
                        <select name="gender" id="gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <h4>Role : {{form.role}}</h4>
                        <h4>Profile created on : {{profileCreated}}</h4>
                    </div>
                </div>
                <div class="details" v-else>
                    <div class="detail">
                        <h4>Email : {{form.email}}</h4>
                        <h4>Name : {{form.name}}</h4>
                        <h4>Address : {{form.address}}</h4>
                        <h4>Phone no. : {{form.phone}}</h4>
                    </div>
                    <div class="detail">
                        <h4>Gender : {{form.gender}}</h4>
                        <h4>Role : {{form.role}}</h4>
                        <h4>Profile created on : {{profileCreated}}</h4>
                    </div>
                </div>
                <div class="buttons">
                <button class="btn" @click="submit" v-if="edit">Save</button>
                <button class="btn" @click="toggle" v-if="edit" style="background-color:crimson">Cancel</button>
                <button class="btn" @click="toggle" v-if="!edit">Edit</button>
                </div>
            </div>
            <button class="deleteBtn hovertext" @click="deleteAcc" data-hover="Delete Account"></button>
        </div>
    </div>
</template>

<script>
    import NavBar from '@/components/NavBar.vue';
    export default {
        name:'ProfilePage',
        data(){
            return {
                form:{
                    name: '',
                    email:'',
                    gender:'',
                    address:'',
                    phone:0,
                    role:'',
                    image:File
                },
                imageUrl:'',
                profileCreated:'',
                edit:false
            }
        },
        components:{
            NavBar
        },
        methods:{
            toggle(){
                console.log(this.edit)
                this.edit=!this.edit

            },
            submit(){

            },
            deleteAcc(){

            }
        },
        created(){
        this.$store.dispatch('getUser')
            .then((res)=>{
                this.form.name = res.user.name;
                this.form.email = res.user.email;
                this.form.gender = res.user.gender;
                this.form.phone = res.user.phone;
                this.form.address = res.user.address;
                this.profileCreated = res.user.profileCreated;
                this.imageUrl = res.user.imageUrl;
            })
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
    .image{
        display: flex;
        justify-content: center;
        padding: 1em;
    }
    
    img{ 
        border-radius: 10em;
    }
    .details, .edit-details{
        display: flex;
        padding: 1em;
        justify-content: space-around
    }
    h4{
        font-size: 1.1em;
    }
    .detail{
        padding: 1em;
        width: 25em;
        
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
    .deleteBtn {
        width: 4em;
        height: 4em;
        background-color: crimson;
        padding: 3px;
        border-radius: 4em;
        border: none;
        position: absolute;
        right: 2em;
        bottom: 1em;
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
        text-align: center;
        border-radius: 5px;
        padding: 5px 0;
        transition: all 1s ease-in-out;

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
            width: 15em;
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
    }

</style>