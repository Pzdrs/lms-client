<template>
  <div class="sign-up">
    <Hero title="Sign up for LMS"/>
    <div class="container">
      <div class="columns">
        <div class="
      column
      has-text-centered
      is-10-mobile is-offset-1-mobile
      is-8-tablet is-offset-2-tablet
      is-6-desktop is-offset-3-desktop
      is-4-widescreen is-offset-4-widescreen">
          <form @submit.prevent="signUp" class="box">
            <div class="notification is-light p-2" :class="result.success ? 'is-success' : 'is-danger'"
                 v-if="result.message !== ''">
              {{ result.message }}
            </div>
            <div class="field">
              <div class="control has-icons-left">
                <input class="input" type="text" placeholder="Username" v-model="username"
                       autocomplete="on" required>
                <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
              </span>
              </div>
            </div>

            <div class="field">
              <div class="control has-icons-left">
                <input class="input" type="text" placeholder="First name" v-model="firstName"
                       autocomplete="on" required>
                <span class="icon is-small is-left">
              F
              </span>
              </div>
            </div>

            <div class="field">
              <div class="control has-icons-left">
                <input class="input" type="text" placeholder="Last name" v-model="lastName"
                       autocomplete="on" required>
                <span class="icon is-small is-left">
              L
              </span>
              </div>
            </div>

            <div class="field">
              <div class="control has-icons-left">
                <input class="input" type="email" placeholder="Email" v-model="email"
                       autocomplete="on" required>
                <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
              </span>
              </div>
            </div>

            <div class="field">
              <div class="control has-icons-left">
                <input id="password" class="input" type="password" placeholder="Password" v-model="password"
                       autocomplete="on" required>
                <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
              </span>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <button type="submit"
                        class="button button-smooth is-outlined is-primary is-medium is-fullwidth is-rounded">
                  <i class="fas fa-sign-in-alt mr-2"></i>
                  Sign Up
                </button>
              </div>
            </div>

            <router-link to="/login">
              <a>Already have an account?</a>
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
  name: 'Sign-up',
  data() {
    return {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      result: {
        success: true,
        message: ''
      }
    }
  },
  components: {Hero, Footer},
  methods: {
    signUp() {
      this.$store.dispatch('Auth/registerNewUser', {
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      })
          .then(() => {
            this.$store.dispatch('Auth/LOGIN', {
              username: this.username,
              password: this.password
            });
          })
          .catch(err => {
            if (err.response.data.message.details && err.response.data.message.details.length !== 0) {
              this.result = {
                success: false,
                message: err.response.data.message.details[0].message
              };
            } else {
              this.result = {
                success: false,
                message: err.response.data.message
              };
            }
          })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  margin-top: 3rem;
}

</style>