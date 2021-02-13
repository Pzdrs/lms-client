<template>
  <div class="welcome">
    <div class="hero is-primary is-fullheight is-bold">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <!-- For desktop -->
            <div class="column is-hidden-touch">
              <div class="container">
                <h1 class="title">Library Management System</h1>
                <h2 class="subtitle">A simple solution to librarianship.</h2>

                <b-button @click="$router.push('/signup')" tag="a" class="is-primary button-smooth mr-3"
                          label="Get Started"
                          inverted
                          outlined/>
              </div>
            </div>
            <div class="column is-hidden-touch">
              <div class="container">
                <b-carousel class="has-text-centered">
                  <b-carousel-item class="pb-1" v-for="(carousel, id) in carousels" :key="id">
                    <h1 class="title">{{ carousel.text }}</h1>
                  </b-carousel-item>
                </b-carousel>
              </div>
            </div>

            <!-- For mobile devices -->
            <div class="column has-text-centered is-hidden-desktop">
              <div class="container">
                <h1 class="title">Library Management System</h1>
                <h2 class="subtitle">A simple solution to librarianship.</h2>

                <b-button @click="$router.push('/signup')" tag="a" class="is-primary button-smooth mb-3"
                          label="Get Started"
                          inverted
                          outlined/>
                <b-carousel class="has-text-centered">
                  <b-carousel-item class="pb-1" v-for="(carousel, id) in carousels" :key="id">
                    <h1 class="title">{{ carousel.text }}</h1>
                  </b-carousel-item>
                </b-carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Welcome',
  data() {
    return {
      carousels: [
        {text: 'VueJS based frontend'},
        {text: 'Modern UI/UX by Buefy'},
        {text: 'NodeJS/Express API'},
        {text: 'NoSQL database provided by MongoDB'}
      ],
      signUpActive: false,
      loginActive: false
    }
  }
}
</script>
<style lang="scss" scoped>
  .welcome {
    margin-bottom: 0;
  }
</style>