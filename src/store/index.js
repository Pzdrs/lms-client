import Vue from 'vue'
import Vuex from 'vuex'
import Books from "@/store/modules/Books";
import Auth from "@/store/modules/Auth";
import Quote from "@/store/modules/Quote";
import Statistics from "@/store/modules/Statistics";
import Users from "@/store/modules/Users";

Vue.use(Vuex)
Vue.config.devtools = true;

const store = new Vuex.Store({
    modules: {
        Books,
        Auth,
        Quote,
        Statistics,
        Users
    }
});

export default store;
