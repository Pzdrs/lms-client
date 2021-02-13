<template>
  <form @submit.prevent="updateAuthor">
    <article class="message is-danger mt-5" v-if="result.message !== ''">
      <div class="message-header">
        <p>{{ result.message }}</p>
        <button class="delete" aria-label="delete"></button>
      </div>
    </article>
    <div class="field">
      <label class="label">First name</label>
      <div class="control has-icons-left">
        <input class="input" type="text" v-model="data.firstName">
        <span class="icon is-left">
          F
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Last name</label>
      <div class="control has-icons-left">
        <input class="input" type="text" v-model="data.lastName">
        <span class="icon is-left">
          L
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Born</label>
      <div class="control">
        <input class="input" type="date" v-model="data.born">
      </div>
    </div>

    <div class="field">
      <label class="label">Died</label>
      <div class="control">
        <input class="input" type="date" v-model="data.died">
      </div>
    </div>

    <button type="submit" class="button is-outlined button-smooth is-success mr-3">
      Submit
    </button>
  </form>
</template>

<script>
export default {
  name: "UpdateAuthor",
  props: ['author'],
  data() {
    return {
      data: {
        firstName: this.author.firstName,
        lastName: this.author.lastName,
        born: new Date(this.author.born).toISOString().split('T')[0],
        died: new Date(this.author.died).toISOString().split('T')[0],
      },
      result: {
        success: true,
        message: ''
      }
    }
  },
  methods: {
    updateAuthor() {
      this.$store.dispatch('Books/updateAuthor', {id: this.author._id, data: this.data})
          .then(() => {
            this.$emit('changeNav', 'authors');
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