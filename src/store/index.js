import Vuex from 'vuex';
import auth from './modules/auth.js';

const store = new Vuex.Store({
    modules:{
        auth: auth
    }
});

export default store;