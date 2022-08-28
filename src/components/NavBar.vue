<template>
    <div >
        <nav>
                <ul class="nav-part">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/home" exact>
                            Home
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/about" exact>
                            About
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="role">
                        <router-link class="nav-link" to="/users" exact>
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
                        <router-link to="/profile" exact>
                        My Profile
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link cursor-pointer" @click="logout">Logout</a>
                    </li>
                </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name:'NavBar',
    props:{
        name: String,
        email: String
    },
    data(){
        return{
            show:false,
            role: this.$store.getters.isAdmin
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
    }
}
</script>

<style scoped>
    nav{
        display: flex;
        justify-content: space-between;
        position: sticky;
        background-color: white;
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
        width:2em
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
    }
    .nav-part2 .nav-item{
        padding: 0.5em;
        border-top: 0.5px solid black;
    }
    .nav-part2 li a{
        color: black;
    }

</style>