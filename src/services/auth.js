import axios from 'axios';
import config from '@/config.js';

let userId = localStorage.getItem('userId');

const register = (form)=>{
    return axios.post(
        `${config.BaseUrl}/auth/register`,
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

const verifyOTP = (otp)=>{
    return axios.post(
        `${config.BaseUrl}/auth/${userId}/verifyOTP`,
        {
            "otp":`${otp}`
        },
        {
            headers:{
                'Content-Type':'application/json'
            }
        }   
    ).then(res=>{
        localStorage.removeItem('userId');
        return res.data;
    }).catch(error=>{
        console.log(error.message);
    })
}

export {
    register,
    login,
    verifyOTP
}