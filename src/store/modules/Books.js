import axios from "@/axios";
import store from "@/store";

const state = {
    myBooks: [],
    unavailableBooks: [],
    authors: [],
    allBooks: []
};
const getters = {
    getMyBooks: (state) => {
        return state.myBooks;
    },
    getAllBooks: (state) => {
        return state.allBooks;
    },
    getUnavailableBooks: (state) => state.unavailableBooks,
    getAuthors: (state) => {
        return state.authors;
    }
};
const mutations = {
    setBooks: (state, books) => {
        books.forEach(book => state.allBooks.push(book));
    },
    addBook: (state, book) => {
        state.allBooks.push(book);
    },
    setMyBook: (state, myBook) => {
        state.myBooks.push(myBook);
    },
    setAuthors: (state, authors) => {
        state.authors = authors;
    },
    addAuthor: (state, author) => state.authors.push(author),
    setUnavailableBook: (state, book) => {
        state.unavailableBooks.push(book);
    },
    deleteAuthor: (state, id) => {
        state.authors = state.authors.filter(author => author['_id'] !== id);
    },
    deleteBook: (state, id) => {
        state.allBooks = state.allBooks.filter(book => book['_id'] !== id);
    },
    flushAllBooks: (state) => {
        state.allBooks = [];
    },
    flushMyBooks: (state) => {
        state.myBooks = [];
    }
};
const actions = {
    fetchAuthors: ({commit, state}) => {
        if (!state.authors.length)
            axios('/authors')
                .then(res => {
                    commit('setAuthors', res.data.authors)
                })
    },
    fetchMyBooks: ({commit, state}) => {
        if (!state.myBooks.length)
            axios('/history')
                .then(res => {
                    res.data.history.filter(history => new Date(history.date.to) > new Date()).forEach(history => {
                        commit('setUnavailableBook', history.book)
                    });
                    res.data.history.filter(history => history.user === store.getters["Auth/getUser"]._id).forEach(history => {
                        axios(`/history/${history._id}/extended`)
                            .then(res => {
                                commit('setMyBook', res.data.history.book);
                            });
                    });
                });
    },
    fetchUnavailableBooks: ({commit}) => {
        axios('/history')
            .then(res => {
                res.data.history.filter(history => new Date(history.date.to) > new Date()).forEach(history => {
                    commit('setUnavailableBook', history.book)
                })
            })
    },
    reFetchMyBooks: ({commit, dispatch}) => {
        commit('flushMyBooks');
        dispatch('fetchMyBooks');
    },
    fetchAllBooks: ({commit, state}) => {
        if (!state.allBooks.length)
            axios('/books/extended')
                .then(res => {
                    commit("setBooks", res.data.books);
                });
    },
    reFetchAllBooks: ({commit}) => {
        axios('/books/extended')
            .then(res => {
                commit('flushAllBooks');
                commit("setBooks", res.data.books);
            });
    },
    reFetchAllAuthors: ({commit}) => {
        axios('/authors')
            .then(res => {
                commit('setAuthors', res.data.authors)
            })
    },
    createAuthor: ({commit}, payload) => {
        return axios.post('/authors', {
            firstName: payload.firstName,
            lastName: payload.lastName,
            born: payload.born,
            died: payload.died
        })
            .then(response => {
                commit('addAuthor', response.data.author)
                return response;
            })
    },
    createBook: ({commit}, payload) => {
        return axios.post('/books', payload)
            .then(response => {
                commit('addBook', response.data.book);
                return response;
            })
    },
    deleteBook: ({commit}, id) => {
        return axios.delete(`/books/${id}`).then((response) => {
            commit('deleteBook', id);
            return response;
        });
    },
    deleteAuthor: ({commit}, id) => {
        return axios.delete(`/authors/${id}`).then((response) => {
            commit('deleteAuthor', id);
            return response;
        });
    },
    updateBook: ({dispatch}, payload) => {
        return axios.patch(`/books/${payload.id}`, payload.data).then(response => {
            dispatch('reFetchAllBooks');
            dispatch('reFetchMyBooks');
            return response;
        })
    },
    updateAuthor: (context, payload) => {
        return axios.patch(`/authors/${payload.id}`, payload.data).then(response => {
            context.dispatch('reFetchAllAuthors').then();
            return response;
        })
    },
    borrowBook(context, payload) {
        return axios
            .post('/history', payload)
            .then(res => {
                return res;
            });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}