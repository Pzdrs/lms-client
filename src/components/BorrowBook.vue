<template>
  <div class="borrow-book">
    <h1 class="title has-text-centered">Borrow a book</h1>
    <h1 class="subtitle has-text-centered">{{ this.book.title }}</h1>
    <hr>
    <form @submit.prevent="changeNav('summary')" v-if="this.nav === ''">
      <h1 class="title has-text-centered">Pre-requirements</h1>

      <label class="label required">For how long are you planning on keeping this book?</label>
      <b-field class="field">
        <b-input type="number"
                 v-model.number="period"
                 placeholder="Number of days"
                 min="1"
                 max="90"
                 validation-message="A book can be borrowed for maximum of 90 days (3 months)"
                 required
        >
        </b-input>
      </b-field>

      <button @click="changeNavOuter('books')" type="button" class="button is-success is-outlined button-smooth">
        <i class="fas fa-arrow-left mr-1"></i> Back to Books
      </button>
      <button type="submit" class="button is-success is-outlined button-smooth is-pulled-right">
        Next <i class="fas fa-arrow-right ml-1"></i></button>
    </form>
    <div v-if="this.nav === 'summary'">
      <h1 class="title has-text-centered">Summary</h1>
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <tbody>
        <tr>
          <th>Book</th>
          <td>{{ this.book.title }}</td>
        </tr>
        <tr>
          <th>Today's date</th>
          <td>{{ formatDate(new Date()) }}</td>
        </tr>
        <tr>
          <th>Booked for</th>
          <td>{{ this.period }} day(s)</td>
        </tr>
        <tr>
          <th>Date of return</th>
          <td>{{ formatDate('') }}</td>
        </tr>
        </tbody>
      </table>
      <button @click="changeNav('')" type="button" class="button is-success is-outlined button-smooth">
        <i class="fas fa-arrow-left mr-1"></i> Previous
      </button>
      <button @click="borrowBook" class="button is-success is-outlined button-smooth is-pulled-right">Finish</button>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "BorrowBook",
  props: ['book'],
  data() {
    return {
      period: 1,
      nav: ''
    }
  },
  methods: {
    changeNav(nav) {
      this.nav = nav;
    },
    changeNavOuter(nav) {
      this.$emit('changeNav', nav);
    },
    borrowBook() {
      this.$store.dispatch('Books/borrowBook', {
        book: this.book._id,
        user: this.$store.getters["Auth/getUser"]._id,
        to: moment().add(this.period, 'd').unix()
      })
          .then(() => {
            this.$store.dispatch('Books/reFetchMyBooks');
            this.$store.dispatch('Books/reFetchAllBooks');
            if (this.$store.getters["Auth/getUser"].isAdmin)
              this.$store.dispatch('Books/reFetchHistory');
            alert(`You successfully borrowed ${this.book.title}. You have ${this.period} day(s) to return it.`)
            this.changeNavOuter('books');
          })
          .catch(() => {
            alert('There has been a problem while trying to borrow a book, please try again later.')
          });
    },
    formatDate(date) {
      if (date === '') return moment().add(this.period, 'd').format('dddd Do of MMMM YYYY');
      return moment(date).format('dddd Do of MMMM YYYY');
    }
  }
}
</script>

<style scoped>
.required:after {
  content: "*";
  color: red;
}
</style>