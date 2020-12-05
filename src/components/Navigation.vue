<template>
  <nav class="navbar sticky is-info is-bold" aria-label="main navigation">
    <!-- Navigation brand -->
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </router-link>

      <!-- For mobile devices and tablets-->
      <router-link to="/profile" class="navbar-item is-hidden-desktop">
        <i class="fas fa-user"></i>
      </router-link>

      <a role="button" title="Navigation" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
         data-target="navbar">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>

      <!-- For mobile devices and tablets-->
      <router-link to="/sign-out" class="navbar-item is-hidden-desktop has-text-danger">
        <i class="fas fa-sign-out-alt"></i>
      </router-link>
    </div>

    <!-- Navigation bar -->
    <div id="navbar" class="navbar-menu has-text-centered">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item is-active">Dashboard</router-link>
        <div class="navbar-item has-dropdown is-hoverable">
          <router-link to="/books" class="navbar-item">
            Books
            <i class="fas fa-angle-down dropdown-arrow"></i>
          </router-link>
          <div class="navbar-dropdown">
            <router-link to="/books" class="navbar-item">List</router-link>
            <hr class="navbar-divider">
            <router-link to="/books/create" class="navbar-item">Create</router-link>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <router-link to="/books" class="navbar-item">
            Authors
            <i class="fas fa-angle-down dropdown-arrow"></i>
          </router-link>
          <div class="navbar-dropdown">
            <router-link to="/authors" class="navbar-item">List</router-link>
            <hr class="navbar-divider">
            <router-link to="/authors/create" class="navbar-item">Create</router-link>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable" v-if="user.isAdmin">
          <router-link to="/users" class="navbar-item">
            Users
            <i class="fas fa-angle-down dropdown-arrow"></i>
          </router-link>
          <div class="navbar-dropdown">
            <router-link to="/users" class="navbar-item">List</router-link>
            <hr class="navbar-divider">
            <router-link to="/users/create" class="navbar-item">Create</router-link>
          </div>
        </div>
        <!-- For mobile devices and tablets-->
        <div class="is-hidden-desktop">
          <hr class="m-0">
          <p class="navbar-item has-text-centered">Signed in as {{ user.username }}</p>
        </div>
      </div>
      <div class="navbar-end">
        <!-- For desktop -->
        <div class="navbar-item has-dropdown is-hidden-touch is-hoverable">
          <a role="button" class="navbar-item">
            <i class="fas fa-ellipsis-h"></i>
          </a>
          <div class="navbar-item navbar-dropdown">
            <router-link to="/profile" class="navbar-item">
              <i class="fas fa-user mr-2"></i>
              Profile
            </router-link>
            <hr class="navbar-divider">
            <router-link to="/sign-out" class="navbar-item has-text-danger">
              <i class="fas fa-sign-out-alt mr-2 mt-1"></i>
              Sign out
            </router-link>
          </div>
        </div>
        <p class="navbar-item is-hidden-touch">Signed in as {{ user.username }}</p>
      </div>
    </div>
  </nav>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'Navigation',
  components: {},
  data() {
    return {
      user: {
        isAdmin: true,
        _id: "5f85d1e6ac855b3eb849724a",
        username: "Kokot1",
        password: "$2a$10$zPWUHKNmxLw.JShI09UBf.xi9qybn5ig9GRp5IoBfL/PdW90aUDvi",
        email: "petrbohac35@seznam.cz",
        firstName: "Petr",
        lastName: "Bohac",
        registeredAt: "2020-10-13T16:12:22.484Z"
      }
    }
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
  }
}
</script>

<style lang="scss" scoped>
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}

.dropdown-arrow {
  margin: .25rem 0 0 .25rem;
}
</style>