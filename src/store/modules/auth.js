import {register,login} from '@/services/auth';

const TOKEN_KEY = 'token';
const EMAIL_KEY = 'email';
const ROLE_KEY = 'role';
const USER_ID = 'userId';

const auth = {
    state:{
        token:localStorage.getItem(TOKEN_KEY) || "",
        email:localStorage.getItem(EMAIL_KEY) || "",
        role:localStorage.getItem(ROLE_KEY) || "",
        name: '',
        userId:localStorage.getItem(USER_ID)||""
    },
    getters:{
        isAuthenticated(state){
            return !!state.token;
        },
        isAdmin(state){
            return state.role === 'admin';
        },
        getName(state){
            return state.name;
        },
        getUserId(state){
            return state.userId;
        }
    },
    mutations:{
        setToken(state, token){
            state.token = token;
        },
        setEmail(state, email){
            state.email = email;
        },
        setRole(state, role){
            state.role = role;
        },
        setName(state, name){
            state.name = name;
        },
        setUserId(state,userId){
            state.userId = userId
        }
    },
    actions:{
        register({commit},form){
            return register(form)
                .then(response=>{
                    const {_id}=response.data;
                    localStorage.setItem(USER_ID,_id);
                    commit('setUserId',_id);
                    return _id;
                })
        },
        login({commit},form){
            return login(form)
                .then(response=>{
                    const {name,email, role, token} = response.data
                    localStorage.setItem(EMAIL_KEY,email);
                    localStorage.setItem(ROLE_KEY,role);
                    localStorage.setItem(TOKEN_KEY,token);

                    commit('setToken',token);
                    commit('setEmail',email);
                    commit('setRole',role);
                    commit('setName',name);

                    return email;
                })
        },
        logout({commit}){
            localStorage.removeItem(EMAIL_KEY);
            localStorage.removeItem(ROLE_KEY);
            localStorage.removeItem(TOKEN_KEY);
            commit('setToken','');
            commit('setEmail','');
            commit('setRole','');
            commit('setName','');
        }
    }
}

export default auth;