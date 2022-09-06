<template>
    <div>
        <NavBar />
        <div class="container" >    
            <UserCard v-for="user in users" :key="user.email" :user="user" :change="changeUserRole" :changeRole="altRole(user)"/>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import config from '@/config.js';
    import NavBar from '@/components/NavBar.vue';
    import UserCard from '@/components/UserCard.vue';
    import {getUsers, changeRole} from '@/services/auth.js';
    export default {
        name: 'UsersListPage',
        components:{
            NavBar,
            UserCard
        },
        data(){
            return{
                users:[],
                page:1,
                name: this.$store.getters.getName,
                email: this.$store.getters.getEmail
            }
        },
        methods:{
            fetchUsers(){
                return getUsers()
                    .then(data=>{
                        this.users = data.users;
                    }).catch(error=>{
                        Vue.$toast.open({
                            message: error.response.data.message,
                            duration: config.toastDuration,
                            type: 'error'
                        });
                    })
            },
            changeUserRole(record){
                if(!(record.name==="Vedansh Girdharwal" || record.name==this.name)){
                    return changeRole(record)
                        .then(response=>{
                            Vue.$toast.open({
                                message: response.message,
                                duration: config.toastDuration,
                                type: 'success'
                            });
                        }).then(()=>{
                            this.fetchUsers();
                        }).catch(error=>{
                            Vue.$toast.open({
                                message: error.response.data.message,
                                duration: config.toastDuration,
                                type: 'error'
                            });
                        })
                }
            },
            altRole(user){
                return user.role === 'admin'? 'standard':'admin'
            }
        },
        created(){
            this.fetchUsers();
            this.$store.dispatch('getUser')
                .then(res=>{
                    this.name = res.user.name,
                    this.email = res.user.email
                })
        }
    }
</script>

<style scoped>
    .container{
        margin-top: 5em;
        padding: 2em;
        align-items: center;
        justify-content: center;
    }
    @media(650px<= width <=829px){
       .container{
        margin-top:8em;
        }
    }
    @media (width<=650px) {
      .container{
        /* margin-top:260px; */
        margin-top:15em;
        }
    }
    /* @media (max-width:448px) {
      .container{
        margin-top:18em;
        }
    } */
    
</style>