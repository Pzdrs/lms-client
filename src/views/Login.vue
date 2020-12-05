<template>
  <div class="login">
    <Hero title="Sign in to LMS"/>
    <Navigation/>
    <div class="container">
      <div class="columns has-text-centered">
        <div class="
      column
      is-10-mobile is-offset-1-mobile
      is-8-tablet is-offset-2-tablet
      is-6-desktop is-offset-3-desktop
      is-4-widescreen is-offset-4-widescreen">
          <form @submit.prevent="signIn" class="box">
            <div class="field">
              <div class="control has-icons-left">
                <input class="input" type="text" placeholder="Username or email"
                       autocomplete="on" required>
                <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
              </div>
            </div>

            <div class="field">
              <div class="control has-icons-left">
                <input class="input" type="password" placeholder="Password"
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
                <button type="submit" class="button button-smooth is-outlined is-primary is-medium is-fullwidth">
                  <i class="fas fa-sign-in-alt mr-2"></i>
                  Sign In
                </button>
              </div>
            </div>

            <router-link to="/forgot-password">
              <a>Forgot password?</a>
            </router-link>
            &#128900;
            <router-link to="/signup">
              <a>Don't have an account?</a>
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
import Navigation from "@/components/Navigation";

export default {
  name: 'Login',
  components: {Navigation, Hero, Footer},
  methods: {
    signIn: () => {

    }
  }
}
</script>
<style lang="scss" scoped>
.button {
  border-radius: 25px;
}

</style>