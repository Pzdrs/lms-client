import router from '@/router';
import axios from '@/axios';
import axios2 from 'axios';
import {extractTokenData} from "@/helpers/utils";

let refresherID;

const state = {
    user: {},
    access_token: ''
};
const getters = {
    getUser: (state) => state.user,
    getAccessToken: (state) => state.access_token
};
const mutations = {
    setUser: (state, user) => {
        state.user = user;
    },
    setAccessToken: (state, access_token) => {
        state.access_token = access_token;
    },
    updateName: (state, name) => {
        state.user.firstName = name.firstName;
        state.user.lastName = name.lastName;
    }
};
const actions = {
    LOGIN: ({commit, dispatch}, credentials) => {
        return axios2
            .post(`${axios.defaults.baseURL}/auth/login`, {
                username: credentials.username,
                password: credentials.password
            }, {
                withCredentials: true
            })
            .then(response => {
                commit('setAccessToken', response.data.token);
                commit('setUser', response.data.user);
                router.push('/dashboard').then();
                setTimeout(() => {
                    dispatch('refreshToken');
                }, extractTokenData(response.data.token).ttl * 1000)
                return response.data;
            })
            .catch(error => {
                return error.response.data;
            });
    },
    refreshToken: ({commit, dispatch}) => {
        return axios
            .get('/auth/refresh_token', {withCredentials: true})
            .then(response => {
                commit('setAccessToken', response.data.token);
                commit('setUser', response.data.user);
                console.log('Your access token has been automatically refreshed.')
                clearInterval(refresherID);
                refresherID = setInterval(() => {
                    dispatch('refreshToken');
                }, extractTokenData(response.data.token).ttl * 1000);
                return response;
            });
    },
    registerNewUser: (context, payload) => {
        return axios
            .post('/auth/signup', payload);
    },
    forgotPassword: (context, payload) => {
        return axios
            .post('/auth/forgotPass', payload);
    },
    signOut: () => {
        return axios
            .get('/auth/logout', {
                withCredentials: true
            })
            .then(() => location.reload())
            .catch(err => {
                alert(err.response.data.message);
            });
    },
    signOutEverywhere: ({state}) => {
        return axios
            .get(`/auth/logoutAll/${state.user._id}`, {
                withCredentials: true
            })
            .then(() => location.reload());
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}