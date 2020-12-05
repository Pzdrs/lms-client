<template>
  <div class="hero is-primary is-bold has-text-centered">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">{{ title }}</h1>
        <hr>
        <h2 class="subtitle">Library Management System</h2>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Hero',
  props: {
    title: String
  }
}
</script>