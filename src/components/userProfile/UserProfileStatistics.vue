<template>
  <nav class="level has-text-centered">
    <div class="level-item">
      <div>
        <p class="heading">Registered for</p>
        <p class="title">{{ accountAge }}</p>
        <p class="heading">days</p>
      </div>
    </div>
    <div class="level-item">
      <div>
        <p class="heading">Borrowed</p>
        <p class="title">{{ myBooks.length }}</p>
        <p class="heading">books in total</p>
      </div>
    </div>
    <div class="level-item">
      <div>
        <p class="heading">Have</p>
        <p class="title">
          {{ myBooks.filter(book => new Date(book.date.to).getTime() > new Date().getTime()).length }}</p>
        <p class="heading">books at home</p>
      </div>
    </div>
  </nav>
</template>
<script>
import moment from 'moment';
import {mapGetters} from 'vuex';

export default {
  name: 'Statistics',
  computed: {
    ...mapGetters({
      user: 'Auth/getUser',
      myBooks: 'Books/getMyBooks'
    }),
    accountAge() {
      const now = moment(new Date())
      const registeredAt = moment(new Date(this.user.registeredAt));
      return now.diff(registeredAt, 'days');
    }
  }
}
</script>