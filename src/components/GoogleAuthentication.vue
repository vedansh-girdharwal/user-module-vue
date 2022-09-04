<template>
<div>
    <div  id="g-signin2"></div>
  <div v-if="profile">
    <pre>{{ profile }}</pre>
    <button @click="signOut">Sign Out</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'GoogleAuthentication',
    mounted() {
    this.initGoogleAuth();
    this.renderGoogleAuthButton();
  },
  data(){
    return{
      profile:{}
    }
  },
  methods: {
    onSignIn(user) {
      const profile = user.getBasicProfile();
      const fullName = profile.getName();
      const email = profile.getEmail();
      const imageUrl = profile.getImageUrl();
      this.profile = { fullName, email, imageUrl };
    },

    signOut() {
      var auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        console.log("User signed out");
        this.profile = null;
      });
    },

    initGoogleAuth() {
      window.gapi.load("auth2", function () {
        window.gapi.auth2.init();
      });
    },

    renderGoogleAuthButton() {
      window.gapi.signin2.render("g-signin2", {
        onsuccess: this.onSignIn
      });
    }
  }
}
</script>