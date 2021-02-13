<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
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
  }
}
</script>