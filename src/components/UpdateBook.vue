<template>
  <form @submit.prevent="updateBook">
    <article class="message is-danger mt-5" v-if="result.message !== ''">
      <div class="message-header">
        <p>{{ result.message }}</p>
      </div>
    </article>
    <div class="field">
      <label class="label">Title</label>
      <div class="control has-icons-left">
        <input class="input" type="text" v-model="data.title">
        <span class="icon is-left">
          <i class="fas fa-book"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Author</label>
      <div class="control has-icons-left">
        <div class="select">
          <select v-model="data.author">
            <option :value="author._id" v-for="author in getAuthors" :key="author._id">{{ author.firstName }}
              {{ author.lastName }}
            </option>
          </select>
          <span class="icon is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">ISBN</label>
      <div class="control has-icons-left">
        <input type="text" class="input" v-model="data.isbn">
        <span class="icon is-left">
        <i class="fas fa-barcode"></i>
      </span>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="label">Page count</label>
        <input type="number" class="input" v-model="data.pageCount">
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="label">Written in</label>
        <input type="number" class="input" v-model="data.writtenIn">
      </div>
    </div>

    <button class="button is-outlined button-smooth is-success mr-3">
      Submit
    </button>
  </form>
</template>

<script>
import {createNamespacedHelpers} from 'vuex';

const {mapGetters} = createNamespacedHelpers('Books');

export default {
  name: "UpdateBook",
  props: ['book'],
  data() {
    return {
      data: {
        title: this.book.title,
        author: this.book.author._id,
        isbn: this.book.isbn,
        pageCount: this.book.pageCount,
        writtenIn: this.book.writtenIn
      },
      result: {
        success: true,
        message: ''
      }
    }
  },
  methods: {
    updateBook() {
      this.$store.dispatch('Books/updateBook', {id: this.book._id, data: this.data})
          .then(() => {
            this.$emit('changeNav', 'books');
          })
          .catch(err => {
            this.result = {
              success: false,
              message: err.response.data.message
            };
          })
    }
  },
  computed: {
    ...mapGetters(["getAuthors"])
  }
}
</script>

<style scoped>

</style>