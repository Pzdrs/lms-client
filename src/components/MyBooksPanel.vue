<template>
  <nav class="panel is-warning">
    <p class="panel-heading">
      <router-link to="/my-books" class="has-text-black">My books</router-link>
    </p>
    <p class="panel-tabs">
      <a @click="changeNav('all')" :class="isActive('all')">All</a>
      <a @click="changeNav('active')" :class="isActive('active')">Active</a>
      <a @click="changeNav('expired')" :class="isActive('expired')">Expired</a>
    </p>

    <a class="panel-block" v-for="book in filteredBooks.slice(0,5)" :key="book._id">
        <span class="panel-icon">
          <i class="fas fa-book" aria-hidden="true"></i>
        </span>
      <div class="book">
        <p class="book-title">
          <strong>{{ book.title }}</strong> by {{ book.author.firstName }} {{ book.author.lastName }}
        </p>
        <p class="has-text-success" v-if="new Date(book.date.to).getTime() > new Date().getTime()">Due
          {{ formatTime(book.date.to) }}</p>
        <p class="has-text-danger" v-else>Expired on {{ formatTime(book.date.to) }}</p>
      </div>
    </a>
    <div class="panel-block" v-if="filteredBooks.length === 0">
      <p style="margin: 0 auto;">Not much of a reader, are you?</p>
    </div>
    <div class="panel-block" v-if="filteredBooks.length > 5">
      <router-link to="/my-books" style="margin: 0 auto;">and <strong>{{ filteredBooks.length - 5 }}</strong> more...
      </router-link>
    </div>
  </nav>
</template>

<script>
import moment from 'moment';
import {createNamespacedHelpers} from 'vuex';

const {mapGetters} = createNamespacedHelpers('Books');

export default {
  name: "MyBooksPanel",
  data() {
    return {
      nav: 'active'
    }
  },
  methods: {
    formatTime: (time) => {
      const date = new Date(time);
      return moment(date).format('Do MMMM YYYY HH:mm');
    },
    changeNav(newNav) {
      if (this.nav !== newNav) this.nav = newNav;
    },
    isActive(link) {
      if (link === this.nav) return 'is-active';
    }
  },
  created() {
    this.$store.dispatch('Books/fetchMyBooks')
  },
  computed: {
    ...mapGetters({
      books: 'getMyBooks'
    }),
    filteredBooks() {
      switch (this.nav) {
        case "active":
          return this.books.filter(book => new Date(book.date.to).getTime() > new Date().getTime())
              .sort((a, b) => new Date(a.date.to) - new Date(b.date.to));
        case "expired":
          return this.books.filter(book => new Date(book.date.to).getTime() < new Date().getTime())
              .sort((a, b) => new Date(a.date.to) - new Date(b.date.to));
        default:
          return this.books;
      }
    }
  }
}
</script>

<style scoped>

</style>