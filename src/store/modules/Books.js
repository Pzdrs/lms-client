import axios from "@/axios";
import store from "@/store";

const state = {
    myBooks: [],
    authors: [],
    allBooks: [],
    history: []
};
const getters = {
    getMyBooks: (state) => {
        return state.myBooks;
    },
    getAllBooks: (state) => {
        return state.allBooks;
    },
    getAuthors: (state) => {
        return state.authors;
    },
    getWholeHistory: (state) => state.history
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
    },
    addHistory: (state, history) => state.history.push(history),
    flushWholeHistory: (state) => state.history = [],
    markAsFinalLocal: (state, history) => {
        state.history.filter(({_id}) => _id === history)[0].returned = true;
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
                    res.data.history.filter(history => history.user === store.getters["Auth/getUser"]._id).forEach(history => {
                        axios(`/history/${history._id}/extended`)
                            .then(res => {
                                let book = res.data.history.book;
                                book['date'] = res.data.history.date;
                                book['returned'] = res.data.history.returned;
                                commit('setMyBook', book);
                            });
                    });
                });
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
    fetchWholeHistory: ({commit, state}) => {
        if (!state.history.length)
            axios('/history')
                .then(({data}) => {
                    data.history.forEach(history => {
                        axios(`/history/${history._id}/extended`)
                            .then(({data}) => {
                                commit('addHistory', data.history);
                            });
                    });
                });
    },
    reFetchHistory: ({commit, dispatch}) => {
        commit('flushWholeHistory');
        dispatch('fetchWholeHistory');
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
    },
    markAsReturned({commit, dispatch}, payload) {
        return axios
            .patch(`/history/${payload._id}`, {returned: true})
            .then(response => {
                commit('markAsFinalLocal', payload._id);
                dispatch('reFetchAllBooks')
                dispatch('reFetchMyBooks')
                return response;
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