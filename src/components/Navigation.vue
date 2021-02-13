<template>
  <nav class="navbar sticky is-info is-bold" aria-label="main navigation">
    <!-- Navigation brand -->
    <div class="navbar-brand">
      <router-link to="/dashboard" class="navbar-item" style="background-color: #167df0">
        <i class="fas fa-book is-size-3"></i>
        <p class="brand-text">LMS</p>
      </router-link>

      <!-- For mobile devices and tablets-->
      <router-link to="/profile" class="navbar-item is-hidden-desktop">
        <i class="fas fa-user"></i>
      </router-link>

      <a role="button" title="Navigation" class="navbar-burger" style="margin: auto 0;" aria-label="menu"
         aria-expanded="false"
         data-target="navbar">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>

      <!-- For mobile devices and tablets-->
      <a v-on:click="logout" class="navbar-item is-hidden-desktop has-text-danger">
        <i class="fas fa-sign-out-alt"></i>
      </a>
    </div>

    <!-- Navigation bar -->
    <div v-if="!blank" id="navbar" class="navbar-menu has-text-centered">
      <div class="navbar-start">
        <router-link
            v-for="route in links"
            :to="route"
            :key="route.path"
            class="navbar-item"
        >
          {{ route.name }}
        </router-link>
      </div>
      <div class="navbar-end">
        <!-- For desktop -->
        <div class="navbar-item has-dropdown is-hidden-touch is-hoverable">
          <a role="button" class="navbar-item has-text-white">
            <i class="fas fa-ellipsis-h"></i>
          </a>
          <div class="navbar-item navbar-dropdown">
            <router-link to="/profile" class="navbar-item">
              <i class="fas fa-user mr-2"></i>
              Profile
            </router-link>
            <hr class="navbar-divider">
            <a v-on:click="logout" class="navbar-item has-text-danger">
              <i class="fas fa-sign-out-alt mr-2 mt-1"></i>
              Sign out
            </a>
          </div>
        </div>
        <p class="navbar-item is-hidden-touch">Signed in as {{ user.username }}</p>
      </div>
    </div>
  </nav>
</template>

<script>
import $ from 'jquery';
import {createNamespacedHelpers} from 'vuex';

const {mapGetters} = createNamespacedHelpers('Auth');

export default {
  name: 'Navigation',
  components: {},
  props: {
    blank: Boolean
  },
  data() {
    return {}
  },
  mounted() {
    $(document).ready(() => {
      // Check for click events on the navbar burger icon
      $(".navbar-burger").click(() => {
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
      });
    });
  },
  methods: {
    logout() {
      this.$store.dispatch('Auth/signOut');
    }
  },
  computed: {
    ...mapGetters({
      user: "getUser"
    }),
    links() {
      return this.$router.options.routes
          .filter(route => route.meta && route.meta.navbar)
          .filter(route => (route.meta.requiresAdmin && this.$store.getters["Auth/getUser"].isAdmin) || (!route.meta.requiresAdmin));
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}

.dropdown-arrow {
  margin: .25rem 0 0 .25rem;
}

.brand-text {
  font-size: 2em;
  margin-left: 15px;
  font-weight: 600;
}
</style>