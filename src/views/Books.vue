<template>
  <div class="books">
    <Hero title="Books"/>
    <Navigation/>
    <div class="container is-fluid my-5">
      <div class="columns">
        <div class="column is-2">
          <aside class="menu">
            <div v-if="nav === 'books' || nav === 'authors'">
              <p class="menu-label">
                Search
              </p>
              <div class="control">
                <input type="text" class="input" :placeholder="searchPlaceholder" v-model="filter">
              </div>
            </div>
            <p class="menu-label">
              General
            </p>
            <ul class="menu-list">
              <li>
                <a @click="changeNav('books')" :class="isActive('books', 'book-update')">Books
                  <span class="is-pulled-right">{{ books.length }}</span>
                </a>
              </li>
              <li>
                <a @click="changeNav('authors')" :class="isActive('authors', 'author-update')">Authors
                  <span class="is-pulled-right">{{ authors.length }}</span>
                </a>
              </li>
            </ul>
            <div v-if="isAdmin()">
              <p class="menu-label">
                Administration
              </p>
              <ul class="menu-list">
                <li><a @click="changeNav('book-create')" :class="isActive('book-create')">Add new book</a></li>
                <li><a @click="changeNav('author-create')" :class="isActive('author-create')">Add new author</a></li>
              </ul>
            </div>
          </aside>
        </div>
        <div class="column is-10">
          <div class="container" v-if="this.nav === 'books'">
            <article class="message is-primary5"
                     v-for="book in books.filter(({title, isbn, author}) => (title.toLowerCase().includes(filter) || isbn.toLowerCase().includes(filter)))"
                     :key="book._id">
              <div class="message-header">
                <span>
                  <a style="text-decoration: none" target="_blank">{{ book.title }} ({{ book.writtenIn }})</a>

                  <!-- Availability tag -->
                  <span class="tag is-danger is-light ml-2" v-if="isAvailable(book)">Unavailable</span>
                  <span class="tag is-success is-light ml-2" v-else>Available</span>

                  <span class="ml-2" v-if="isAdmin()">
                  <a class="mt-3 mx-3" @click="deleteBook(book)">
                    <i class="fas fa-trash has-text-danger"></i>
                  </a>
                  <a class="mt-3 mx-3" @click="updateBook(book); changeNav('book-update')">
                    <i class="fas fa-edit has-text-info"></i>
                  </a>
                </span>
                </span>
                <span class="has-text-weight-light" v-if="book.author !== null">by
                  {{ book.author.firstName }}
                  {{ book.author.lastName }}
                </span>
                <span class="has-text-weight-light" v-else>
                  by Unknown Author
                </span>
              </div>
              <div class="message-body">
                <div class="content">
                  <p><strong>Pages:</strong> {{ book.pageCount }}</p>
                  <p><strong>ISBN:</strong> {{ book.isbn }}</p>
                </div>
              </div>
            </article>
          </div>

          <div class="container" v-if="this.nav === 'authors'">
            <div class="columns">
              <div class="column">
                <div class="card mb-3"
                     v-for="author in authors.filter(({firstName, lastName}) => firstName.toLowerCase().includes(filter) || lastName.toLowerCase().includes(filter))"
                     :key="author._id">
                  <div class="card-content">
                    <div class="media">
                      <div class="media-left">
                        <i class="fas fa-user fa-4x" style="color: #7957d5"></i>
                      </div>
                      <div class="media-content">
                        <p class="title is-4">{{ author.firstName }} {{ author.lastName }}</p>
                        <p class="subtitle has-text-weight-light is-6">{{ new Date(author.born).getFullYear() }} -
                          {{ author.died === null ? "Hasn't died yet" : new Date(author.died).getFullYear() }}</p>
                      </div>
                    </div>

                    <div class="content">
                      Added on {{ addedOn(author.createdAt).format('Do MMMM YYYY HH:mm') }}
                    </div>
                    <div class="card-footer" v-if="isAdmin()">
                      <a class="mt-3 mx-3" @click="deleteAuthor(author)">
                        <i class="fas fa-trash has-text-danger"></i>
                      </a>
                      <a class="mt-3 mx-3" @click="updateAuthor(author); changeNav('author-update')">
                        <i class="fas fa-edit has-text-info"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="this.nav === 'author-create'">
            <CreateAuthor/>
          </div>

          <div v-if="this.nav === 'book-create'">
            <CreateBook/>
          </div>

          <div v-if="this.nav === 'book-update'">
            <UpdateBook v-bind:book="bookToUpdate" @changeNav="changeNav"/>
          </div>

          <div v-if="this.nav === 'author-update'">
            <UpdateAuthor v-bind:author="authorToUpdate" @changeNav="changeNav"/>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import {mapGetters} from 'vuex';
import CreateBook from "@/components/CreateBook";
import CreateAuthor from "@/components/CreateAuthor";
import moment from 'moment';
import UpdateBook from "@/components/UpdateBook";
import UpdateAuthor from "@/components/UpdateAuthor";

export default {
  name: "Books",
  data() {
    return {
      filter: '',
      nav: 'books',
      bookToUpdate: {},
      authorToUpdate: {}
    }
  },
  created() {
    this.$store.dispatch('Books/fetchAuthors');
    this.$store.dispatch('Books/fetchUnavailableBooks');
    this.$store.dispatch('Books/fetchAllBooks');
  },
  methods: {
    isActive(...links) {
      if (links.includes(this.nav)) return 'is-active';
    },
    changeNav(newNav) {
      if (this.nav !== newNav) this.nav = newNav;
    },
    addedOn(date) {
      return moment(date);
    },
    deleteAuthor(author) {
      if (confirm(`Are you sure you want to delete author: ${author.firstName} ${author.lastName}`))
        this.$store.dispatch('Books/deleteAuthor', author._id)
            .then(response => {
              alert(`Successfully deleted author ${response.data.author.firstName} ${response.data.author.lastName}`)
            })
            .catch(() => {
              alert('An unexpected error occurred while deleting this author')
            })
    },
    updateAuthor(author) {
      this.authorToUpdate = author;
    },
    deleteBook(book) {
      if (confirm(`Are you sure you want to delete book: ${book.title}`))
        this.$store.dispatch('Books/deleteBook', book._id)
            .then(response => {
              alert(`Successfully deleted book ${response.data.book.title}`)
            })
            .catch(() => {
              alert('An unexpected error occurred while deleting this book')
            })
    },
    updateBook(book) {
      this.bookToUpdate = book;
    },
    isAdmin() {
      return this.$store.getters["Auth/getUser"].isAdmin;
    },
    isAvailable(book) {
      return this.unavailableBooks.includes(book._id);
    }
  },
  computed: {
    ...mapGetters({
      books: 'Books/getAllBooks',
      authors: 'Books/getAuthors',
      unavailableBooks: 'Books/getUnavailableBooks'
    }),
    searchPlaceholder() {
      switch (this.nav) {
        case 'books':
          return 'Book title or ISBN';
        case 'authors':
          return "Author's name";
        default:
          return 'Search';
      }
    }
  },
  components: {UpdateAuthor, UpdateBook, CreateAuthor, CreateBook, Footer, Hero, Navigation}
}
</script>

<style scoped>

</style>