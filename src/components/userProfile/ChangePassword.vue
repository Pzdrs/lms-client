<template>
  <form @submit.prevent="changePassword">
    <b-field>
      <b-input
          v-model="currentPassword"
          type="password"
          placeholder="Current password"
          icon-pack="fas"
          icon="lock"
          required/>
    </b-field>
    <b-field>
      <b-input
          v-model="newPassword"
          type="password"
          placeholder="New password"
          icon-pack="fas"
          icon="lock"
          password-reveal
          required/>
    </b-field>
    <b-field>
      <b-input
          v-model="newPasswordConfirm"
          type="password"
          placeholder="Confirm new password"
          icon-pack="fas"
          icon="lock"
          required/>
    </b-field>
    <button type="submit" class="button is-success is-outlined button-smooth">Change password</button>
  </form>
</template>

<script>
import bcrypt from 'bcryptjs';

export default {
  name: "ChangePassword",
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: ''
    }
  },
  methods: {
    async changePassword() {
      const user = this.$store.getters["Auth/getUser"];
      if (await bcrypt.compare(this.currentPassword, user.password)) {
        if (this.newPassword === this.newPasswordConfirm || this.newPassword === '') {
          this.$store.dispatch('Users/updateUser', {_id: user._id, password: this.newPassword})
              .then(() => {
                alert('You successfully changed your password.')
              })
        } else {
          alert('Your new password does not match the confirmation password.')
        }
      } else {
        alert('Your current password is invalid.')
      }
    }
  }
}
</script>

<style scoped>

</style>