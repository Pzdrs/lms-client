<template>
  <div class="login">
    <Hero title="Sign in to LMS"/>
    <div class="container">
      <div class="columns has-text-centered">
        <div class="
      column
      is-10-mobile is-offset-1-mobile
      is-8-tablet is-offset-2-tablet
      is-6-desktop is-offset-3-desktop
      is-4-widescreen is-offset-4-widescreen">
          <form @submit.prevent="login" class="box" v-if="nav === 'login'">
            <div v-if="loginResult" class="notification is-danger is-light p-2">
              {{ loginResult }}
            </div>
            <div class="field">
              <div class="control has-icons-left">
                <input v-model="username" class="input" type="text" placeholder="Username or email"
                       autocomplete="on" required>
                <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
              </div>
            </div>

            <div class="field">
              <div class="control has-icons-left">
                <input v-model="password" class="input" type="password" placeholder="Password"
                       autocomplete="on" required>
                <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label class="checkbox">
                  <input type="checkbox">
                  Remember me
                </label>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <button type="submit"
                        class="button button-smooth is-outlined is-primary is-medium is-fullwidth is-rounded">
                  <i class="fas fa-sign-in-alt mr-2"></i>
                  Sign In
                </button>
              </div>
            </div>

            <router-link to="/forgot-password">
              Forgot password?
            </router-link>
            &#128900;
            <router-link to="/signup">
              Don't have an account?
            </router-link>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>
<script>
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export default {
  name: 'Login',
  components: {Hero, Footer},
  data() {
    return {
      username: '',
      password: '',
      loginResult: '',
      email: '',
      nav: 'login'
    }
  },
  methods: {
    login() {
      this.$store.dispatch('Auth/LOGIN', {
        password: this.password,
        username: this.username
      }).then(response => {
        this.loginResult = response.message;
      })
    },
    changeNav(nav) {
      this.nav = nav;
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  margin-top: 3rem;
}
</style>