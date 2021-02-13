import {quotes} from '@/axios';

const state = {
    qod: 'Fetching quote of the day',
    author: 'No one ever'
};
const getters = {
    getQuote: (state) => state.qod,
    getAuthor: (state) => state.author
};
const mutations = {
    setup: (state, payload) => {
        state.qod = payload.text;
        if (payload.author !== '') {
            state.author = payload.author;
        } else {
            state.author = 'Nobody';
        }
    }
};
const actions = {
    fetchQuote: ({commit}) => {
        quotes('/quote')
            .then(response => {
                commit('setup', response.data);
            })
            .catch(() => {
                commit('setup', {
                    text: 'Seems like there is no quote for today, better luck next time.',
                    author: 'QuoteAPI'
                })
            });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}