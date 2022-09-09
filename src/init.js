import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import Vuelidate from 'vuelidate';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import { VueSpinners } from "@saeris/vue-spinners";
import {library} from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouseUser,faFileLines,faUsers,faUserTie,faAddressCard,faArrowRightFromBracket,faCameraAlt,faCamera,faTrashCan,faArrowRightToBracket,faUserPlus,faUnlockKeyhole,faFloppyDisk,faXmark,faPenToSquare,faEnvelopesBulk,faKey,faUserShield} from '@fortawesome/free-solid-svg-icons'
import {faGoogle} from '@fortawesome/free-brands-svg-icons';

library.add(faHouseUser, faFileLines,faUsers,faUserTie,faAddressCard, faArrowRightFromBracket,faCameraAlt,faCamera,faTrashCan,faArrowRightToBracket,faUserPlus,faUnlockKeyhole,faFloppyDisk,faXmark,faPenToSquare,faEnvelopesBulk,faKey,faUserShield,faGoogle);


Vue.use(VueSpinners);
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuex);
Vue.use(Router);
Vue.use(Vuelidate);
Vue.use(VueToast);