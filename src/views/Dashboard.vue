<template>
  <div class="dashboard">
    <Hero title="Dashboard"/>
    <Navigation/>
    <div class="container">
      <nav class="level has-text-centered box">
        <div class="level-item">
          <div>
            <p class="title">36</p>
            <p class="heading">Books in total</p>
          </div>
        </div>
        <div class="level-item">
          <div>
            <p class="title">123</p>
            <p class="heading">Currently borrowed books</p>
          </div>
        </div>
        <div class="level-item">
          <div>
            <p class="title">5</p>
            <p class="heading">Active users</p>
          </div>
        </div>
      </nav>
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-8">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child notification is-primary">
                <p class="title">Vertical...</p>
                <p class="subtitle">Top tile</p>
              </article>
              <article class="tile is-child notification is-warning">
                <p class="title">...tiles</p>
                <p class="subtitle">Bottom tile</p>
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child notification is-info">
                <p class="title">Middle tile</p>
                <p class="subtitle">With an image</p>
                <figure class="image is-4by3">
                  <img src="https://bulma.io/images/placeholders/640x480.png">
                </figure>
              </article>
            </div>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification is-danger">
              <p class="title">Wide tile</p>
              <p class="subtitle">Aligned with the right tile</p>
              <div class="content">
                <!-- Content -->
              </div>
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-success">
            <div class="content">
              <p class="title">Tall tile</p>
              <p class="subtitle">With even more content</p>
              <div class="content">
                <!-- Content -->
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
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";

export default {
  name: 'Dashboard',
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
  components: {
    Hero,
    Navigation,
    Footer
  }
}
</script>
