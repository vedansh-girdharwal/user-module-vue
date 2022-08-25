import axios from 'axios';
import config from '@/config.js';

const register = (form)=>{
    return axios.post(
        `${config.BaseUrl}/auth/register`,
        form,
        {
            headers:{
                'Content-Type':'application/json'
            }
        }
    ).then(alert('user registered successfully'))
    .catch(error=>{
        alert(`${error.message}`)
    })
};

const login = (form)=>{
    return axios.post(
        `${config.BaseUrl}/auth/login`,
        form,
        {
            headers:{
                'Content-Type':'application/json'
            }
        }
    ).then(res=>{
        return res.data;
    })
    .catch(error=>{
        alert(`${error.message}`)
    })
};

export {
    register,
    login
}