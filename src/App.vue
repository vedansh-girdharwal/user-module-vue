<template>
  <div id="app">
    <router-view></router-view>
    <button @click="redirect">Login</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  methods:{
    redirect(){
      this.$router.push({name:'login'})
    }
  }
  
}
</script>

<style>
#app {
}
</style>
