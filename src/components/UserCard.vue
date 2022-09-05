<template>
    <div class="box">
        <div class="user">
            <div class="row">
                Name : {{user.name}}
            </div>
            <div class="row">
                Email : {{user.email}}
            </div>
            <div class="row">
                Role : {{user.role}}
            </div>
            <div class="row">
                Name : {{user.name}}
            </div>
        </div>
        <div class="changeRole">
            <label for="btn2">Change the role to</label>
            <button class="btn2" :disabled="(user.name==='Vedansh Girdharwal')" @click="change(user)">{{changeRole}}</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserCard',
    props:{
        user: Object,
        changeRole: String,
        change: Function
    }
}
</script>

<style scoped>
    .box{
        flex-direction: row;
        align-items: center;
        padding: 1.5em;
        width: 98%;
        max-width: none;
        justify-content: space-between;
        margin-bottom: 1em;
        box-shadow: 5px 5px rgba(0,0,0,0.2);
        transition:all 0.5s;
    }
    .box:hover{
        box-shadow: 10px 10px 5px rgba(0,0,0,0.2);
        width: 99%;
    }
    .user{
        width:50vw;
    }
    .changeRole{
        display: flex;
        flex-direction: column;
    }
    .btn2{
        font-size: 1em;
        padding: 0.3em;
        border-radius: 0.5em;
        width: 100%;
        background-color: rgba(255,255,255,0.8);
        border: 0.5px solid green;
        color: green;
        box-shadow: 5px 5px 5px rgba(0,0,0,0.2);
    }
    .btn2:hover{
        background-color: rgba(228, 228, 228, 0.821) ;
        cursor: pointer;
    }
    @media (max-width:650px) {
        .box{
            flex-direction: column;
            size: auto;
            padding: 3%;
        }
        .changeRole{
            margin-top: 1em ;
        }
    }
    /* @media (max-width:400px) {
        .box{
            padding: 0.6em;
    }
    } */
</style>