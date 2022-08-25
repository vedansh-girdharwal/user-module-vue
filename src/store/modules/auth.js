import {login} from '@/services/auth';

const TOKEN_KEY = 'token';
const EMAIL_KEY = 'email';
const ROLE_KEY = 'role';

const auth = {
    state:{
        token:localStorage.getItem(TOKEN_KEY) || "",
        email:localStorage.getItem(EMAIL_KEY) || "",
        role:localStorage.getItem(ROLE_KEY) || "",
        name: ''
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
        }
    },
    actions:{
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
        }
    }
}

export default auth;