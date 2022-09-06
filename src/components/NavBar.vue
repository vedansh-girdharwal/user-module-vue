<template>
    <div >
        <nav>
                <ul class="nav-part">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'home',params: { name:name }}" exact>
                            <font-awesome-icon icon="fa-solid fa-house-user" />Home
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'about',params: { name:name }}" exact>
                            <font-awesome-icon icon="fa-solid fa-file-lines" />About
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="role">
                        <router-link class="nav-link" :to="{name: 'users',params: { name:name }}" exact>
                            <font-awesome-icon icon="fa-solid fa-users" />  Users
                        </router-link>
                    </li>
                </ul>
                <ul class="nav-part" style="margin-right:2em">
                    <li @click="toggleMenu">
                        <img src="@/assets/user-icon.jpg">
                    </li>
                </ul>
                <ul class="nav-part2" v-show="show">
                    <li class="nav-item" style="border:none">
                        <img :src="imageUrl" alt="name"><br>
                        {{name}} <br>
                        {{email}}
                    </li>
                    <li class="nav-item">
                        <button class="profileBtn btn3">
                            <router-link to="/profile" exact>
                               <font-awesome-icon icon="fa-solid fa-address-card" /> My Profile
                            </router-link>
                        </button>
                    </li>
                    <li class="nav-item">
                        <button class="logoutBtn btn3" @click="logout"><font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" /> Logout</button>
                    </li>
                </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name:'NavBar',
    data(){
        return{
            show:false,
            role: this.$store.getters.isAdmin,
            name:'',
            email:'',
            imageUrl:''
        }
    },
    methods:{
        toggleMenu(){
            return this.show = !this.show;
        },
        logout(){
            this.$store.dispatch('logout')
                .then(()=>{
                    this.$router.push({name:'login'})
                })
        }
    },
    created(){
        this.$store.dispatch('getUser')
            .then(res=>{
                this.name=res.user.name,
                this.email=res.user.email,
                this.role = (res.user.role ==='admin'),
                this.imageUrl = res.user.imageUrl
            })
    }
}
</script>

<style scoped>
    nav{
        top: 0;
        display: flex;
        justify-content: space-between;
        position: fixed;
        width: 100vw;
        background-color: white;
        border-bottom-left-radius: 1em;
        border-bottom-right-radius: 1em;
        z-index: 1;
    }
    .nav-part{
        display: flex;
        justify-content: space-evenly;
        margin: 0;
        padding: 0.5em;
        align-items: center;
    }
    
    .nav-part .nav-item{
        margin-right: 1.5em;
        padding: 0.5em;
    }
    li{
        list-style: none;
    }
    li a {
        color: green;
        text-decoration: none;
        cursor: pointer;
    }
    li img{
        width:2em;
        border-radius: 2em;
        cursor: pointer;
    }
    .nav-part2{
        position: absolute;
        right: 2em;
        top: 2.2em;
        padding: 1em;
        background-color: white;
        padding: 1em;
        border-bottom-left-radius: 0.5em;
        border-bottom-right-radius: 0.5em;
        box-shadow: 5px 5px rgba(0,0,0,0.2) ;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    .nav-part2 .nav-item{
        padding: 0.5em;
    }
    .nav-item img{
        height: 100px;
        width: 100px;
        border-radius: 50px;
    }
    .btn3{
        padding: 0.5em;
        font-size: 100%;
        border-radius: 0.6em;
        border: none;
        color:white;
        box-shadow: 5px 5px 5px rgba(0,0,0,0.2);
        cursor: pointer;
        margin: 0;
    }
    .btn3 > a{
        color: white;
    }
    .profileBtn{
        background-color: rgba(4, 4, 175, 0.77);
        
    }
    .logoutBtn{
        background-color: rgba(197, 21, 21, 0.77);

    }
    @media (max-width:650px){
        .nav-part2 .nav-item{
            padding-bottom: 0.2em;
        }
    }
</style>