<template>
  <div class="users">
    <Hero title="Users"/>
    <Navigation/>
    <div class="container is-fluid my-5">
      <div class="columns">
        <div class="column is-2">
          <aside class="menu">
            <p class="menu-label">
              Search
            </p>
            <div class="control">
              <input type="text" class="input" placeholder="First/last name or username" v-model="filter">
            </div>
            <p class="menu-label">
              General
            </p>
            <ul class="menu-list">
              <li>
                <a @click="changeNav('users')" :class="isActive('users', 'user-update')">Users
                  <span class="is-pulled-right">{{ users.length }}</span>
                </a>
              </li>
            </ul>
            <p class="menu-label">
              Administration
            </p>
            <ul class="menu-list">
              <li>
                <a @click="changeNav('user-create')" :class="isActive('user-create')">Register new user</a>
              </li>
            </ul>
          </aside>
        </div>
        <div class="column is-10">

          <div class="container" v-if="this.nav === 'users'">
            <div class="columns">
              <div class="column">
                <div class="card mb-3"
                     v-for="user in users.filter(({firstName, lastName, username}) =>
                     firstName.toLowerCase().includes(filter) ||
                     lastName.toLowerCase().includes(filter) ||
                     username.toLowerCase().includes(filter))"
                     :key="user._id">
                  <div class="card-content">
                    <div class="media">
                      <div class="media-left">
                        <i class="fas fa-user fa-4x" style="color: #7957d5"></i>
                      </div>
                      <div class="media-content">
                        <p class="title is-4 mb-1">
                          <span class="rank subtitle" :class="user.isAdmin ? 'admin' : 'user'"></span>
                          <span class="is-size-4"> {{ user.firstName }} {{ user.lastName }} </span>
                          <span class="has-text-weight-light">({{ user.username }})</span>
                        </p>
                        <span>{{ user._id }}</span><br>
                        <strong v-if="isCurrentUser(user._id)">Hey, that's you!</strong>
                      </div>
                    </div>

                    <div class="content">
                      <div class="mb-2">
                        <strong>Email: </strong>
                        <span>{{ user.email }}</span>
                      </div>
                      Registered on {{ registeredAt(user.registeredAt).format('Do MMMM YYYY HH:mm') }}
                    </div>
                    <div class="card-footer" v-if="isLoggedIn && !isCurrentUser(user._id)">
                      <a class="mt-3 mx-3" @click="deleteUser(user)">
                        <i class="fas fa-trash has-text-danger"></i>
                      </a>
                      <a class="mt-3 mx-3" @click="updateUser(user); changeNav('user-update')">
                        <i class="fas fa-edit has-text-info"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="this.nav === 'user-update'">
            <UpdateUser v-bind:user="userToUpdate" @changeNav="changeNav"/>
          </div>

          <div v-if="this.nav === 'user-create'">
            <CreateUser/>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import moment from 'moment';
import {isLoggedIn} from '@/helpers/utils'
import {createNamespacedHelpers} from 'vuex';
import UpdateUser from "@/components/UpdateUser";
import CreateUser from "@/components/CreateUser";

const {mapGetters} = createNamespacedHelpers('Users');

export default {
  name: "Users",
  data() {
    return {
      filter: '',
      nav: 'users',
      userToUpdate: {}
    }
  },
  methods: {
    isActive(...links) {
      if (links.includes(this.nav)) return 'is-active';
    },
    isLoggedIn() {
      return isLoggedIn();
    },
    registeredAt(date) {
      return moment(date);
    },
    changeNav(newNav) {
      if (this.nav !== newNav) this.nav = newNav;
    },
    deleteUser(user) {
      if (confirm(`Are you sure you want to delete this user's account?`)) {
        this.$store.dispatch('Users/deleteUser', user)
            .then(() => {
              alert(`User ${user.firstName} ${user.lastName} deleted`)
              this.$store.dispatch('Users/reFetchUsers');
            })
            .catch(({response}) => {
              alert(response.data.message);
            })
      }
    },
    updateUser(user) {
      this.userToUpdate = user;
    },
    isCurrentUser(id) {
      return this.$store.getters['Auth/getUser']._id === id;
    }
  },
  created() {
    this.$store.dispatch('Users/fetchUsers');
  },
  components: {CreateUser, UpdateUser, Footer, Navigation, Hero},
  computed: {
    ...mapGetters({
      users: 'getUsers'
    })
  }
}
</script>

<style scoped>

</style>