import axios from "@/axios";

const state = {
    users: []
};
const getters = {
    getUsers: (state) => state.users
};
const mutations = {
    setUsers: (state, users) => state.users = users,
    flushUsers: (state) => state.users = []
}
const actions = {
    fetchUsers: ({commit, state}) => {
        if (!state.users.length)
            return axios('/users')
                .then(res => {
                    commit('setUsers', res.data.users);
                });
    },
    reFetchUsers: ({commit}) => {
        return axios('/users')
            .then(res => {
                commit('flushUsers');
                commit('setUsers', res.data.users);
            });
    },
    updateUser: (context, payload) => {
        return axios
            .patch(`/users/${payload._id}`, payload)
    },
    deleteUser: (context, payload) => {
        return axios.delete(`/users/${payload._id}`);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}