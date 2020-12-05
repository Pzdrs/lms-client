<template>
  <div class="sign-up">
    <Hero title="Sign up for LMS"/>
    <Navigation/>
    <div class="columns">
      <div class="
      column
      has-text-centered
      is-10-mobile is-offset-1-mobile
      is-8-tablet is-offset-2-tablet
      is-6-desktop is-offset-3-desktop
      is-4-widescreen is-offset-4-widescreen">
        <form @submit.prevent="signUp" class="box">
          <div class="field">
            <div class="control has-icons-left">
              <input class="input" type="text" placeholder="Username"
                     autocomplete="on" required>
              <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <div class="control has-icons-left">
              <input class="input" type="text" placeholder="First name"
                     autocomplete="on" required>
              <span class="icon is-small is-left">
              F
              </span>
            </div>
          </div>

          <div class="field">
            <div class="control has-icons-left">
              <input class="input" type="text" placeholder="Last name"
                     autocomplete="on" required>
              <span class="icon is-small is-left">
              L
              </span>
            </div>
          </div>

          <div class="field">
            <div class="control has-icons-left">
              <input class="input" type="email" placeholder="Email"
                     autocomplete="on" required>
              <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <div class="control has-icons-left">
              <input id="password" class="input" type="password" placeholder="Password"
                     autocomplete="on" required>
              <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button type="submit" class="button button-smooth is-outlined is-primary is-medium is-fullwidth">
                <i class="fas fa-sign-in-alt mr-2"></i>
                Sign Up
              </button>
            </div>
          </div>

          <router-link to="/sign-in">
            <a>Already have an account?</a>
          </router-link>
        </form>
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
  name: 'Sign-up',
  components: {Navigation, Hero, Footer},
  methods: {
    signUp: () => {

    }
  }
}
</script>
<style lang="scss" scoped>
.button {
  border-radius: 25px;
}

</style>