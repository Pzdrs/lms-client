<template>
  <div class="my-books">
    <Hero title="My Books"/>
    <Navigation/>
    <div class="container mt-3">
      <div class="tabs is-centered">
        <ul>
          <li :class="isActive('all')"><a @click="changeNav('all')">All books</a></li>
          <li :class="isActive('active')"><a @click="changeNav('active')">Active books</a></li>
          <li :class="isActive('expired')"><a @click="changeNav('expired')">Expired books</a></li>
        </ul>
      </div>
      <div class="columns is-centered">
        <div class="column is-11">
          <h1 class="subtitle has-text-centered" v-if="myBooks.length <= 0">Not much of a reader, are you?</h1>
          <article class="message" :class="getColor" v-for="book in filteredBooks" :key="book._id">
            <div class="message-header">
              <a style="text-decoration: none" target="_blank"
                 :href="`https://www.google.com/search?tbm=bks&q=${normalizeName(book.title).replace(' ', '+')}`">
                {{ book.title }} ({{ book.writtenIn }})</a>
              <span class="has-text-weight-light">by {{ book.author.firstName }} {{ book.author.lastName }}</span>
            </div>
            <div class="message-body">
              <div class="content">
                <p class="pb-2" style="border-bottom: 1px solid gray;">
                  You borrowed this book on
                  {{ formatBorrowedDate(book.date.from) }}.
                  <span v-if="!book.returned">
                  You have
                  <span v-if="daysLeft(book.date) >= 1">
                    <strong>{{ daysLeft(book.date) }}</strong> more day(s) to return it.
                  </span>
                    <span v-else>
                      <strong>{{ hoursLeft(book.date) }}</strong> more hour(s) to return it.
                    </span>
                </span>
                  <span v-else>
                  It reached it's expiration or you have already returned it.
                </span>
                </p>
                <p><strong>Pages:</strong> {{ book.pageCount }}</p>
                <p><strong>ISBN:</strong> {{ book.isbn }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import moment from 'moment';
import {createNamespacedHelpers} from 'vuex';
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const {mapGetters} = createNamespacedHelpers('Books');

export default {
  name: "MyBooks",
  data() {
    return {
      nav: 'active',
    }
  },
  created() {
    this.$store.dispatch('Books/fetchMyBooks');
  },
  methods: {
    changeNav(newNav) {
      if (this.nav !== newNav) this.nav = newNav;
    },
    isActive(link) {
      if (link === this.nav) return 'is-active';
    },
    formatBorrowedDate(date) {
      return moment(new Date(date)).format('MMMM Do YYYY');
    },
    daysLeft(date) {
      return moment(date.to).diff(moment(date.from), 'days');
    },
    hoursLeft(date) {
      return moment(date.to).diff(moment(), 'hours');
    },
    normalizeName(title) {
      return require('diacritics').remove(title);
    }
  },
  computed: {
    ...mapGetters({
      myBooks: 'getMyBooks'
    }),
    getColor() {
      switch (this.nav) {
        case "active":
          return 'is-success';
        case "expired":
          return 'is-danger'
      }
      return '';
    },
    filteredBooks() {
      switch (this.nav) {
        case "active":
          return this.myBooks.filter(book => new Date(book.date.to).getTime() > new Date().getTime())
              .sort((a, b) => new Date(a.date.to) - new Date(b.date.to));
        case "expired":
          return this.myBooks.filter(book => new Date(book.date.to).getTime() < new Date().getTime())
              .sort((a, b) => new Date(a.date.to) - new Date(b.date.to));
        default:
          return this.myBooks;
      }
    }
  },
  components: {Footer, Navigation, Hero}
}
</script>

<style scoped>

</style>