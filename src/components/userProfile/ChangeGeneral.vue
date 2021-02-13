<template>
  <form class="content" @submit.prevent="updateProfile">
    <b-field label="First name">
      <div class="control has-icons-left">
        <b-input :placeholder="user.firstName" v-model="firstName" required/>
        <span class="icon is-small is-left">
          F
        </span>
      </div>
    </b-field>

    <b-field label="Last name">
      <div class="control has-icons-left">
        <b-input :placeholder="user.lastName" v-model="lastName" required/>
        <span class="icon is-small is-left">
          L
        </span>
      </div>
    </b-field>

    <b-field label="Email">
      <b-input
          :value="user.email"
          icon-pack="fas"
          icon="envelope" disabled/>
    </b-field>
    <button class="button is-success is-outlined button-smooth">Submit</button>
  </form>
</template>

<script>
import {createNamespacedHelpers} from 'vuex';

const {mapGetters} = createNamespacedHelpers('Auth');

export default {
  name: "ChangeGeneral",
  data() {
    return {
      firstName: '',
      lastName: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  methods: {
    updateProfile() {
      this.$store.dispatch('Users/updateUser', {
        _id: this.user._id,
        firstName: this.firstName,
        lastName: this.lastName
      }).then(() => {
        this.$store.commit('Auth/updateName', {
          firstName: this.firstName,
          lastName: this.lastName
        });
        this.$store.dispatch('Users/reFetchUsers');
        alert(`Successfully changed your name to ${this.firstName} ${this.lastName}`)
        this.$data.firstName = '';
        this.$data.lastName = '';
      })
    }
  }
}
</script>

<style scoped>

</style>