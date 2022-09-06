<template>
  <div id="app">
    <router-view></router-view>
    
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  
  
}
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto');

    *{
        box-sizing: border-box;
        font-family: 'Roboto',sans-serif;
    }
    h1{
        font-weight: 100;
        font-size: 2.5em;
        text-align: center;
    }
    body{
        /* background-color: hsla(120,70%,40%,0.4); */
        background-image: url('./assets/bg2.jpg');
        background-size: 100% 100%; 
        margin: 0px;
    }
    .container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content:center;
        height: 100vh;
        /* margin-top: 80px; */
    }
    .box{
        background-color: rgba(255,255,255,0.9);
        border-radius: 1em;
        width: 50%;
        display: flex;
        flex-direction: column;
        align-content: space-between;
        justify-items: center;
        max-width: 400px;
        min-width: 300px;
    }
    form{
        padding: 1em;
        display: flex;
        flex-direction: column;
        align-content: space-between;
    }
    .form-group{
        padding: 0.8em;
        text-align: start;
    }
    input{
        margin-top: 0.2em;
        padding: 0.5em;
        width: 100%;
        border-radius: 0.5em;
        border: 1px solid green;
        font-size: 1.2em;
    }
    .error-message{
        color: crimson;
    }
    .redirect{
        background-color: rgb(227, 227, 227);
        border-bottom-left-radius: 1em;
        border-bottom-right-radius: 1em;
        padding-bottom: 1em;
        text-align: center;
    }
    hr{
        margin-top: 0;
    }
    .btn{
        font-size: 1.2em;
        padding: 0.6em;
        border-radius: 0.5em;
        width: 100%;
        background-color: hsla(120,80%,30%,0.8);
        color:white;
        border: none;
        box-shadow: 5px 5px 5px rgba(0,0,0,0.2);
    }
    .btn:hover{
        background-color: hsla(120,60%,40%,0.6) ;
        cursor: pointer;
    }
    .btn:disabled{
        background-color: rgba(38, 100, 38, 0.5);
        cursor:initial;
    }
    .redirect a{
        color: green;
        cursor: pointer;
    }
    
</style>
