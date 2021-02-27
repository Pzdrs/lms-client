<template>
  <div class="history">
    <Hero title="History"/>
    <Navigation/>
    <div class="container is-fluid my-5">
      <div class="columns">
        <div class="column is-2">
          <aside class="menu">
            <p class="menu-label">
              Search
            </p>
            <div class="control">
              <input type="text" class="input" placeholder="Book/Author/User" v-model="filter.search">
            </div>
            <p class="menu-label">
              Filters <span class="coming-soon">Coming soon!</span>
            </p>
            <label class="checkbox">
              <input type="checkbox" v-model="filter.notReturned" disabled>
              Not returned yet
            </label><br>
            <label class="checkbox">
              <input type="checkbox" v-model="filter.expired" disabled>
              Expired
            </label><br>
          </aside>
        </div>
        <div class="column is-8">
          <article class="message is-primary"
                   v-for="history in applyFilters(getHistory)"
                   :key="history._id">
            <div class="message-header">
              <a style="text-decoration: none" target="_blank">
                {{ history.book.title }} ({{ history.book.isbn }})
              </a>
              <span class="has-text-weight-light" v-if="history.book.author !== null">by
                  {{ history.book.author.firstName }}
                  {{ history.book.author.lastName }}
                </span>
              <span class="has-text-weight-light" v-else>
                  by Unknown Author
                </span>
            </div>
            <div class="message-body">
              <div class="content">
                <table class="table is-bordered is-fullwidth">
                  <tbody>
                  <tr>
                    <th>History ID</th>
                    <td>{{ history._id }}</td>
                  </tr>
                  <tr>
                    <th>State</th>
                    <td class="has-text-success" v-if="history.returned">Returned</td>
                    <td class="has-text-danger" v-else>
                      <label>Not returned yet</label>
                      <button @click="markAsFinal(history)" class="button is-light is-success is-pulled-right">Mark as
                        returned
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th>User</th>
                    <td>{{ getUserFullName(history.user) }}</td>
                    <td class="is-hidden-mobile"><a :href="'mailto:' + getEmail(history.user)">{{
                        getEmail(history.user)
                      }}</a></td>
                  </tr>
                  <tr>
                    <th>Borrowed</th>
                    <td>{{ dateFormat(history.date.from) }}</td>
                    <td class="is-hidden-mobile">Borrowed for <strong>{{ borrowedPeriod(history.date) }}</strong> day(s)
                    </td>
                  </tr>
                  <tr>
                    <th>To be returned</th>
                    <td>{{ dateFormat(history.date.to) }}</td>
                    <td class="is-hidden-mobile"><span v-html="daysLeft(history.date)"/></td>
                  </tr>
                  </tbody>
                </table>
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
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import {createNamespacedHelpers} from 'vuex';
import {getUserFromId} from "@/helpers/utils";
import moment from 'moment';

const {mapGetters} = createNamespacedHelpers('Books');

export default {
  name: "History",
  data() {
    return {
      filter: {
        search: '',
        expired: false,
        notReturned: false
      }
    }
  },
  components: {Navigation, Hero, Footer},
  created() {
    this.$store.dispatch('Users/fetchUsers');
    this.$store.dispatch('Books/fetchWholeHistory');
  },
  computed: {
    ...mapGetters({
      getHistory: 'getWholeHistory'
    })
  },
  methods: {
    idToUser(id) {
      return getUserFromId(id);
    },
    getUserFullName(user) {
      const userObj = this.idToUser(user);
      return userObj.firstName + " " + userObj.lastName;
    },
    getEmail(user) {
      return this.idToUser(user).email;
    },
    dateFormat(date) {
      return moment(new Date(date)).format('MMMM Do YYYY');
    },
    daysLeft(date) {
      const daysLeft = moment(new Date(date.to)).diff(new Date(), 'd');
      const hoursLeft = moment(new Date(date.to)).diff(new Date(), 'hours');
      if (hoursLeft <= 0) return 'Should have already been returned';
      return (daysLeft > 0 ? '<strong>' + daysLeft + '</strong> day(s) left' : '<strong>' + hoursLeft + '</strong> hour(s) left') + ' to return';
    },
    borrowedPeriod(date) {
      return Math.ceil(moment(new Date(date.to)).diff(new Date(date.from), 'h') / 24);
    },
    applyFilters(history) {
      let filtered = history;
      filtered.filter(({book, user}) =>
          (book.title.toLowerCase().includes(this.filter.search)) ||
          (book.author.firstName.toLowerCase().includes(this.filter.search) || book.author.lastName.toLowerCase().includes(this.filter.search)) ||
          (this.idToUser(user).firstName.toLowerCase().includes(this.filter.search) || this.idToUser(user).lastName.toLowerCase().includes(this.filter.search)));
      return filtered;
    },
    markAsFinal(history) {
      this.$store.dispatch('Books/markAsReturned', history);
    }
  }
}
</script>

<style scoped>
.coming-soon {
  font-weight: bold;
  color: black;
  text-transform: uppercase;
}

.returned button, label {
  margin: 10px 0;
  display: inline-block;
  vertical-align: middle;
}
</style>