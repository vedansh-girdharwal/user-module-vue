<template>
    <div >
        <nav>
                <ul class="nav-part">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'home',params: { name:name }}" exact>
                            Home
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'about',params: { name:name }}" exact>
                            About
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="role">
                        <router-link class="nav-link" :to="{name: 'users',params: { name:name }}" exact>
                            Users List
                        </router-link>
                    </li>
                </ul>
                <ul class="nav-part">
                    <li @click="toggleMenu">
                        <img src="@/assets/user-icon.jpg">
                    </li>
                </ul>
                <ul class="nav-part2" v-show="show">
                    <li class="nav-item" style="border:none">
                        {{name}} <br>
                        {{email}}
                    </li>
                    <li class="nav-item">
                        <button class="profileBtn btn3">
                            <router-link to="/profile" exact>
                                My Profile
                            </router-link>
                        </button>
                    </li>
                    <li class="nav-item">
                        <button class="logoutBtn btn3" @click="logout">Logout</button>
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
            email:''
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
                this.role = (res.user.role ==='admin')
            })
    }
}
</script>

<style scoped>
    nav{
        display: flex;
        justify-content: space-between;
        position: sticky;
        background-color: white;
        border-bottom-left-radius: 1em;
        border-bottom-right-radius: 1em;
    }
    .nav-part{
        display: flex;
        justify-content: space-evenly;
        margin: 0;
        padding: 0.5em;
        align-items: center;
    }
    
    .nav-part .nav-item{
        margin-right: 1em;
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
        right: 0.5em;
        top: 2.2em;
        background-color: white;
        padding: 0.5em;
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
    .btn3{
        padding: 0.5em;
        font-size: 100%;
        border-radius: 0.6em;
        border: none;
        color:white;
        box-shadow: 5px 5px 5px rgba(0,0,0,0.2);
        cursor: pointer;
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
</style>