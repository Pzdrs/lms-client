import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import router from './router'
import store from './store'
import axios from 'axios';

require('./assets/global.scss')

const instance = axios.create({
    baseURL: 'http://localhost:3000/api'
});

Vue.prototype.$api = {
    ...instance,
    statistics() {
        return instance('/statistics');
    }
};
Vue.use(Buefy)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
