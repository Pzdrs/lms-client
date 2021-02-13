<template>
  <form @submit.prevent="createBook">
    <article class="message mt-5" :class="result.success ? 'is-success' : 'is-danger'" v-if="result.message !== ''">
      <div class="message-header">
        <p>{{ result.message }}</p>
      </div>
    </article>
    <div class="field">
      <label class="label">Title</label>
      <div class="control has-icons-left">
        <input class="input" type="text" placeholder="The Chronicles of Narnia: The Lion, the Witch and the Wardrobe"
               v-model="book.title" required>
        <span class="icon is-left">
          <i class="fas fa-book"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Author</label>
      <div class="control has-icons-left">
        <div class="select">
          <select v-model="book.author" required>
            <option :value="author['_id']" v-for="author in getAuthors" :key="author['_id']">{{ author.firstName }}
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
        <input type="text" class="input" placeholder="000721152X" v-model="book.isbn" required>
        <span class="icon is-left">
        <i class="fas fa-barcode"></i>
      </span>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="label">Page count</label>
        <input type="number" class="input" v-model="book.pageCount" required>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="label">Written in</label>
        <input type="number" class="input" placeholder="1950" v-model="book.writtenIn">
      </div>
    </div>

    <button class="button is-outlined button-smooth is-success mr-3">
      Submit
    </button>
    <button type="reset" class="button is-outlined button-smooth is-link">
      Reset
    </button>
  </form>
</template>

<script>
import {createNamespacedHelpers} from 'vuex';

const {mapGetters} = createNamespacedHelpers('Books');

export default {
  name: "CreateBook",
  data() {
    return {
      book: {
        title: '',
        author: '',
        isbn: '',
        pageCount: 0,
        writtenIn: ''
      },
      result: {
        success: true,
        message: ''
      }
    }
  },
  methods: {
    createBook() {
      this.$store.dispatch('Books/createBook', this.book)
          .then(() => {
            this.result = {
              success: true,
              message: 'Successfully added new book'
            };
            this.$store.dispatch('Books/reFetchAllBooks');
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
    ...mapGetters(['getAuthors'])
  }
}
</script>

<style scoped>

</style>