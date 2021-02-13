<template>
  <div class="page-not-found has-text-centered">
    <Hero title="Oops, page not found.."/>
    <h1 class="title">404</h1>
    <Footer/>
  </div>
</template>
<script>
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export default {
  name: '404',
  components: {Hero, Footer}
};
</script>
<style scoped>
h1 {
  font-size: 30rem;
}
</style>