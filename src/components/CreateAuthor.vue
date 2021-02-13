<template>
  <form @submit.prevent="createAuthor" onsubmit="this.reset()">
    <article class="message mt-5" :class="result.success ? 'is-success' : 'is-danger'" v-if="result.message !== ''">
      <div class="message-header">
        <p>{{ result.message }}</p>
        <button class="delete" aria-label="delete"></button>
      </div>
    </article>
    <div class="field">
      <label class="label">First name</label>
      <div class="control has-icons-left">
        <input class="input" type="text" placeholder="Clive" v-model="firstName" required>
        <span class="icon is-left">
          F
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Last name</label>
      <div class="control has-icons-left">
        <input class="input" type="text" placeholder="Staples Lewis" v-model="lastName" required>
        <span class="icon is-left">
          L
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Born</label>
      <div class="control">
        <input class="input" type="date" v-model="born" required>
      </div>
    </div>

    <div class="field">
      <label class="label">Died</label>
      <div class="control">
        <input class="input" type="date" v-model="died">
      </div>
    </div>

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
  name: "CreateAuthor",
  data() {
    return {
      firstName: '',
      lastName: '',
      born: '',
      died: '',
      result: {
        success: true,
        message: ''
      }
    }
  },
  methods: {
    createAuthor() {
      this.$store
          .dispatch("Books/createAuthor", {
            firstName: this.firstName,
            lastName: this.lastName,
            born: this.born,
            died: this.died,
          })
          .then(() => {
            this.result = {
              success: true,
              message: 'Successfully added new author'
            };
          })
          .catch(err => {
            this.result = {
              success: false,
              message: err.response.data.message
            };
          })
    }
  }
}
</script>

<style scoped>

</style>