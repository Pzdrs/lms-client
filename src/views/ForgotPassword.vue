<template>
  <div class="forgot-password">
    <Hero title="Forgot your password?"/>
    <div class="container has-text-centered mt-6">
      <div class="columns">
        <div class="column
      is-10-mobile is-offset-1-mobile
      is-8-tablet is-offset-2-tablet
      is-6-desktop is-offset-3-desktop
      is-4-widescreen is-offset-4-widescreen">
          <div v-if="emailSent" class="notification is-success is-light p-2">
            Email has been sent to {{ email }}
          </div>
          <p class="box" v-if="emailSent">Didn't receive an email? <a @click="sendEmail">Send again.</a></p>
          <form @submit.prevent="sendEmail" class="box" v-if="!emailSent">
            <div class="field">
              <div class="control has-icons-left">
                <input v-model="email" class="input" type="email" placeholder="Email"
                       autocomplete="on" required/>
                <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <button type="submit"
                        class="button button-smooth is-outlined is-primary is-medium is-fullwidth is-rounded">
                  <i class="fas fa-envelope mr-2"></i>
                  Send email
                </button>
              </div>
            </div>

            <router-link to="/login">
              I remembered, take me back
            </router-link>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default {
  name: "ForgotPassword",
  data() {
    return {
      email: 'kaosdf@oljasdhnf.cz',
      emailSent: false
    }
  },
  mounted() {
    if (this.$route.query.t) {
      console.log('t parameter exists')
    }
  },
  methods: {
    sendEmail() {
      this.$store.dispatch('Auth/forgotPassword', {
        email: this.email
      })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err.response);
          })
          .finally(() => {
            this.emailSent = true;
          });
    }
  },
  components: {Footer, Hero}
}
</script>

<style scoped>

</style>