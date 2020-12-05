<template>
  <div class="userProfile">
    <Hero title="Your profile"/>
    <Navigation/>
    <div class="container">
      <!-- For mobile devices -->
      <div class="columns box is-hidden-desktop has-text-centered">
        <div class="column">
          <h1 class="title mb-2 has-text-weight-light">Petr Bohac</h1>
          <span class="rank subtitle" :class="{admin: user.isAdmin, user: !user.isAdmin}"></span>
        </div>
        <hr class="is-marginless">
        <div class="column">
          <Statistics/>
        </div>
      </div>

      <!-- For desktop -->
      <div class="columns is-hidden-touch mt-2">
        <div class="column">
          <h1 class="title mb-2 has-text-weight-light">Petr Bohac</h1>
          <span class="rank subtitle" :class="{admin: user.isAdmin, user: !user.isAdmin}"></span>
        </div>
        <div class="column">
          <Statistics/>
        </div>
      </div>

      <div class="columns">
        <div class="column is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">General</p>
            </header>
            <div class="card-content">
              <div class="content">
                <div class="field">
                  <label for="firstName" class="label">First name</label>
                  <div class="control has-icons-left">
                    <input id="firstName" class="input" type="text" :value="user.firstName" disabled>
                    <span class="icon is-small is-left">
                      F
                    </span>
                  </div>
                </div>

                <div class="field">
                  <label for="lastName" class="label">Last name</label>
                  <div class="control has-icons-left">
                    <input id="lastName" class="input" :value="user.lastName" type="text" disabled>
                    <span class="icon is-small is-left">
                      L
                    </span>
                  </div>
                </div>

                <div class="field">
                  <label for="email" class="label">Email</label>
                  <div class="control has-icons-left">
                    <input id="email" class="input" :value="user.email" type="email" disabled>
                    <span class="icon is-small is-left">
                      <i class="fas fa-envelope"></i>
                    </span>
                  </div>
                </div>

                <div class="field">
                  <label for="password" class="label">Password</label>
                  <div class="control has-icons-left">
                    <input id="password" class="input" value="Nice try xd" type="password" disabled>
                    <span class="icon is-small is-left">
                      <i class="fas fa-lock"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">Miscellaneous</p>
            </header>
            <div class="card-content">
              <div class="content">
                <DeleteAccount/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>
<script>
import Footer from "@/components/Footer";
import Statistics from "@/components/UserProfileStatistics";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import DeleteAccount from "@/components/UserProfileDeleteAccount";

export default {
  name: 'User-profile',
  components: {DeleteAccount, Navigation, Hero, Statistics, Footer},
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
  }
}
</script>
<style lang="scss" scoped>

</style>