<template>
  <footer class="footer has-text-weight-light has-background-grey-light has-text-light p-2">
    <div class="columns">
      <!-- For mobile devices-->
      <div class="column has-text-centered is-family-secondary is-hidden-tablet">
        <p>Copyright &copy; {{ currentYear }} {{ projectName }}. All Rights Reserved</p>
        <p>Created by <a :href="author.link" target="_blank">{{ author.name }}</a></p>
      </div>
      <!-- For tablets -->
      <div class="column has-text-centered is-hidden-desktop is-hidden-mobile">
        <p>Copyright &copy; {{ currentYear }} {{ projectName }}. All Rights Reserved | Created by
          <a :href="author.link" target="_blank">{{ author.name }}</a>
        </p>
      </div>
      <!-- For desktops-->
      <div class="column has-text-centered is-hidden-touch">
        <div class="columns">
          <div class="column">
            <p>Copyright &COPY; {{ currentYear }} {{ projectName }}. All Rights Reserved</p>
          </div>
          <div class="column">
            <p>Created by <a :href="author.link" target="_blank">{{ author.name }}</a></p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>

export default {
  name: 'Footer',
  components: {},
  data() {
    return {
      currentYear: new Date().getFullYear(),
      projectName: 'LMS',
      author: {
        name: 'Petr Boháč',
        link: 'https://github.com/Pzdrs'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>