<template>
  <div class="history">
    <Hero title="History"/>
    <Navigation/>
    <div class="container is-fluid my-5">
      <div class="columns">
        <div class="column is-2"></div>
        <div class="column is-8">
          <article class="message is-primary5" v-for="history in getHistory" :key="history._id">
            <div class="message-header">
                <span>
                  <a style="text-decoration: none" target="_blank">
                    {{ history.book.title }} ({{ history.book.isbn }})
                  </a>
                </span>
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
                    <td class="has-text-danger" v-else>Not returned yet</td>
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
                    <td class="is-hidden-mobile"><span v-html="daysLeft(history.date)"/> to return</td>
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
      filter: ''
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
      const daysLeft = moment(new Date(date.to)).diff(new Date(date.from), 'd');
      const hoursLeft = moment(new Date(date.to)).diff(new Date(date.from), 'h');
      return daysLeft > 0 ? '<strong>' + daysLeft + '</strong> day(s) left' : '<strong>' + hoursLeft + '</strong> hour(s) left';
    },
    borrowedPeriod(date) {
      return Math.ceil(moment(new Date(date.to)).diff(new Date(date.from), 'h') / 24);
    }
  }
}
</script>

<style scoped>

</style>