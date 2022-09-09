<template>
    <div>
        <h1>4<span style="color:rgb(0, 127, 185)">0</span>4</h1>
        <h3>Page Not Found</h3>
        The page you are looking for is unavailable. Do you want to redirect to <a href="/">Home Page</a>
    </div>
</template>

<script>
export default {
    name:'PageNotFound'
}
</script>

<style scoped>
    body{
        background-image:unset;
        background-color:aliceblue;
    }
    div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: white;
        text-align: center;
        height: 100vh;
    }
    *{
        font-size: 100%;
    }
    h1,span{
        font-size: 8rem;
    }
    a{
        color: green;
    }

</style>