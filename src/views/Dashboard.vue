<template>
  <div class="dashboard">
    <Hero title="Dashboard"/>
    <Navigation/>
    <div class="container">
      <div class="columns">
        <div class="column">
          <!-- Statistics -->
          <nav class="level has-text-centered box my-5">
            <div class="level-item">
              <div>
                <p class="title">{{ booksTotal }}</p>
                <p class="heading">Books in total</p>
              </div>
            </div>
            <div class="level-item">
              <div>
                <p class="title">{{ booksInUse }}</p>
                <p class="heading">Books being read</p>
              </div>
            </div>
            <div class="level-item">
              <div>
                <p class="title">{{ users }}</p>
                <p class="heading">Active users</p>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <DashWelcome/>
        </div>
        <div class="column">
          <UserBooks/>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import UserBooks from "@/components/MyBooksPanel";
import DashWelcome from "@/components/DashWelcome";
import {createNamespacedHelpers} from 'vuex';

const {mapGetters} = createNamespacedHelpers('Statistics');

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters({
      booksTotal: "getBooksTotal",
      booksInUse: "getBooksInUse",
      users: "getUsers",
    })
  },
  created() {
    this.$store.dispatch('Statistics/fetchStats');
    this.$store.dispatch('Quote/fetchQuote');
  },
  components: {
    DashWelcome,
    UserBooks,
    Hero,
    Navigation,
    Footer
  }
}
</script>
