<template>
  <form @submit.prevent="updateUser">
    <div class="field">
      <label class="label">First name</label>
      <div class="control has-icons-left">
        <input class="input" type="text" :placeholder="this.user.firstName" v-model="firstName">
        <span class="icon is-small is-left">
              F
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Last name</label>
      <div class="control has-icons-left">
        <input class="input" type="text" :placeholder="this.user.lastName" v-model="lastName">
        <span class="icon is-small is-left">
              L
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control has-icons-left">
        <input id="password" class="input" type="password" placeholder="Password" v-model="password">
        <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
        </span>
      </div>
    </div>

    <button type="submit" class="button is-outlined button-smooth is-success mr-3">
      Submit
    </button>
  </form>
</template>

<script>
export default {
  name: "UpdateUser",
  props: ['user'],
  data() {
    return {
      firstName: '',
      lastName: '',
      password: ''
    }
  },
  methods: {
    updateUser() {
      this.$store.dispatch('Users/updateUser', {
        _id: this.user._id,
        firstName: this.firstName === '' ? this.user.firstName : this.firstName,
        lastName: this.lastName === '' ? this.user.lastName : this.lastName,
        password: this.password === '' ? this.user.password : this.password,
      }).then(() => {
        this.$store.dispatch('Users/reFetchUsers')
        this.$emit('changeNav', 'users');
      });
    }
  }
}
</script>

<style scoped>

</style>