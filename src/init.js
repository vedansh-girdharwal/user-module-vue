import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import Vuelidate from 'vuelidate';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import {library} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouseUser,faFileLines,faUsers,faUserTie,faAddressCard,faArrowRightFromBracket,faCameraAlt,faCamera,faTrashCan} from '@fortawesome/free-solid-svg-icons'
// import {} from '@fortawesome/free-regular-svg-icons';

library.add(faHouseUser, faFileLines,faUsers,faUserTie,faAddressCard, faArrowRightFromBracket,faCameraAlt,faCamera,faTrashCan);
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuex);
Vue.use(Router);
Vue.use(Vuelidate);
Vue.use(VueToast);