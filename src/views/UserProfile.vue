<template>
  <div class="userProfile">
    <Hero title="Your profile"/>
    <Navigation/>
    <div class="container">
      <!-- For mobile devices -->
      <div class="columns box is-hidden-desktop has-text-centered">
        <div class="column">
          <h1 class="title mb-2 has-text-weight-light">{{ `${user.firstName} ${user.lastName}` }}</h1>
          <span class="rank subtitle" :class="user.isAdmin ? 'admin' : 'user'"></span>
        </div>
        <hr class="is-marginless">
        <div class="column">
          <Statistics/>
        </div>
      </div>

      <!-- For desktop -->
      <div class="columns is-hidden-touch mt-2">
        <div class="column">
          <h1 class="title mb-2 has-text-weight-light">{{ `${user.firstName} ${user.lastName}` }}</h1>
          <span class="rank subtitle" :class="user.isAdmin ? 'admin' : 'user'"></span>
        </div>
        <div class="column">
          <Statistics/>
        </div>
      </div>

      <div class="columns">
        <div class="column is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">General</p>
            </header>
            <div class="card-content">
              <ChangeGeneral/>
            </div>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">Change password</p>
            </header>
            <div class="card-content">
              <ChangePassword/>
            </div>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">Miscellaneous</p>
            </header>
            <div class="card-content">
              <div class="content">
                <div class="buttons">
                  <button @click="signOut" class="button button-smooth is-fullwidth is-outlined is-danger">Sign out on
                    all devices
                  </button>
                  <button @click="deleteAccount" class="button button-smooth is-fullwidth is-outlined is-danger">Delete
                    account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>
<script>
import Footer from "@/components/Footer";
import Statistics from "@/components/userProfile/UserProfileStatistics";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import {createNamespacedHelpers} from 'vuex';
import ChangePassword from "@/components/userProfile/ChangePassword";
import ChangeGeneral from "@/components/userProfile/ChangeGeneral";
import bcrypt from 'bcryptjs';

const {mapGetters} = createNamespacedHelpers('Auth');

export default {
  name: 'User-profile',
  created() {
    this.$store.dispatch('Books/fetchMyBooks');
  },
  components: {ChangeGeneral, ChangePassword, Navigation, Hero, Statistics, Footer},
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  methods: {
    async deleteAccount() {
      const user = this.$store.getters["Auth/getUser"];
      if (confirm('Are you sure you want to delete your account?\nYou will be asked to enter your password for confirmation.')) {
        const password = prompt('Please enter your password:');
        if (await bcrypt.compare(password, user.password)) {
          this.$store.dispatch('Users/deleteUser', {_id: user._id})
              .then(() => {
                this.$store.dispatch('Auth/signOut');
              })
              .catch(({response}) => {
                alert(response.data.message);
              })
        } else {
          alert('The entered password is invalid.')
        }
      }
    },
    signOut() {
      this.$store.dispatch('Auth/signOutEverywhere');
    }
  }
}
</script>
<style lang="scss" scoped>

</style>