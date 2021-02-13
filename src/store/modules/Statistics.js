import axios from '@/axios';

const state = {
    booksTotal: 0,
    booksInUse: 0,
    users: 0
};
const getters = {
    getBooksTotal: (state) => state.booksTotal,
    getBooksInUse: (state) => state.booksInUse,
    getUsers: (state) => state.users,
};
const mutations = {
    setup: (state, payload) => {
        state.booksTotal = payload.booksTotal;
        state.booksInUse = payload.booksInUse;
        state.users = payload.users;
    }
};
const actions = {
    fetchStats: ({commit}) => {
        axios('/statistics')
            .then(response => {
                commit('setup', response.data.statistics);
            })
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}