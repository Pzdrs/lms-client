<template>
  <article class="message is-info">
    <div class="message-header">
      <p>Welcome back, {{ user.firstName }}.</p>
    </div>
    <div class="message-body">
      <div class="time has-text-centered pb-4 mb-1" style="border-bottom: 1px solid lightgray;">{{ time }}</div>
      <div class="qod has-text-centered">
        <h1 class="subtitle mb-2">Quote of the day</h1>
        <q>{{ quote }}</q><br>
        <small class="ml-3">— {{ quoteAuthor }}</small>
      </div>
    </div>
  </article>
</template>

<script>
import moment from "moment";
import {mapGetters} from 'vuex';

export default {
  name: "DashWelcome",
  computed: {
    ...mapGetters({
      user: "Auth/getUser",
      quote: "Quote/getQuote",
      quoteAuthor: "Quote/getAuthor"
    }),
    time: () => {
      const date = new Date();
      return `It's ${moment(date).format('dddd Do of MMMM YYYY')}.`;
    }
  }
}
</script>

<style scoped>

</style>