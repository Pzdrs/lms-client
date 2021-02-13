<template>
  <form @submit.prevent="createUser" onsubmit="">
    <article class="message" :class="result.success ? 'is-success' : 'is-danger'"
             v-if="result.message !== ''">
      <div class="message-header">
        <p>{{ result.message }}</p>
      </div>
    </article>
    <div class="field">
      <label class="label">First name</label>
      <div class="control has-icons-left">
        <input class="input" type="text" placeholder="John" v-model="user.firstName" required>
        <span class="icon is-left">
          F
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Last name</label>
      <div class="control has-icons-left">
        <input class="input" type="text" placeholder="Doe" v-model="user.lastName" required>
        <span class="icon is-left">
          L
        </span>
      </div>
    </div>

    <label class="label">Username</label>
    <b-field>
      <b-input
          v-model="user.username"
          type="text"
          placeholder="johndoe69"
          icon-pack="fas"
          icon="user"
          required/>
    </b-field>

    <label class="label">Email</label>
    <b-field>
      <b-input
          v-model="user.email"
          type="email"
          placeholder="john@gmail.com"
          icon-pack="fas"
          icon="envelope"
          required/>
    </b-field>

    <label class="label">Password</label>
    <b-field>
      <b-input
          v-model="user.password"
          type="password"
          placeholder="password123"
          icon-pack="fas"
          icon="lock"
          password-reveal
          required/>
    </b-field>

    <button type="submit" class="button is-outlined button-smooth is-success mr-3">
      Submit
    </button>
    <button type="reset" class="button is-outlined button-smooth is-link">
      Reset
    </button>
  </form>
</template>

<script>
export default {
  name: "CreateUser",
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
      },
      result: {
        success: true,
        message: ''
      },
    }
  },
  methods: {
    createUser() {
      this.$store.dispatch('Auth/registerNewUser', this.user)
          .then(() => {
            this.result = {
              success: true,
              message: 'Successfully registered new user.'
            }
            this.$store.dispatch('Users/reFetchUsers');
          })
          .catch(err => {
            if (err.response.data.message.details && err.response.data.message.details.length !== 0) {
              this.result = {
                success: false,
                message: err.response.data.message.details[0].message
              };
            } else {
              this.result = {
                success: false,
                message: err.response.data.message
              };
            }
          });
    }
  }
}
</script>

<style scoped>

</style>