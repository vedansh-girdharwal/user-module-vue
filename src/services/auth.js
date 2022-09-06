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
    ).then(res=>{
        return res.data;
    })
    .catch(error=>{
        throw error
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
        throw error
    })
};

const getUser = ()=>{
    return axios.get(
        `${config.BaseUrl}/auth/user`,
        {
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`${localStorage.getItem('token')}`
            }
        }
    ).then(res=>{
        return res.data;
    }).catch(error=>{
        throw error;
    })
}

const updateImage = (id,form) => {
    return axios.patch(
        `${config.BaseUrl}/auth/${id}/updateImage`,
        form,
        {
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization':`${localStorage.getItem('token')}`
            }
        }
    ).then(res=>{
        return res.data;
    }).catch(error=>{
        throw error;
    })
}
const updateProfile = (id,form) => {
    return axios.patch(
        `${config.BaseUrl}/auth/${id}/updateProfile`,
        form,
        {
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`${localStorage.getItem('token')}`
            }
        }
    ).then(res=>{
        return res.data;
    }).catch(error=>{
        throw error;
    })
}

const forgotPassword = (form)=>{
    return axios.post(
        `${config.BaseUrl}/auth/forgotPassword`,
        form,
        {
            headers:{
                'Content-Type':'application/json'
            }
        }
    ).then(res=>{
        return res.data;
    }).catch(error=>{
        throw error;
    })
};

const resetPassword = (form,id)=>{
    return axios.post(
        `${config.BaseUrl}/auth/${id}/resetPassword`,
        form,
        {
            headers:{
                'Content-Type':'application/json'
            }
        }
    ).then(res=>{
        return res.data;
    }).catch(error=>{
        throw error;
    })
}

const deleteUser = (id)=>{
    return axios.delete(
        `${config.BaseUrl}/auth/${id}/deleteUser`,{
            headers:{
                'Content-Type':'application/json',
                'Authorization':`${localStorage.getItem('token')}`
            }
        }
    ).then(res=>{
        return res.data;
    }).catch(error=>{
        throw error;
    })
}

const verifyOTP = (otp,userId)=>{
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
        throw error;
    })
}

const resendOTP = (userId)=>{
    return axios.post(
        `${config.BaseUrl}/auth/${userId}/resendOTP`
    ).then(res=>{
        return res.data;
    }).catch(error=>{
        throw error;
    })
}

const getUsers = ()=>{
    const token = localStorage.getItem('token');
    return axios.get(
        `${config.BaseUrl}/auth/users`,
        {
            headers:{
                'Authorization':`${token}`
            }
        }
    ).then(res=>{
        return res.data;
    }).catch(error=>{
        throw error;
    })
}

const changeRole = (user)=>{
    return axios.patch(
        `${config.BaseUrl}/auth/${user._id}/changeRole`,
        {role:user.role},
        {
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`${localStorage.getItem('token')}`
            }
        }
    ).then(res=>{
        return res.data;
    }).catch(error=>{
        throw error;
    })
}

export {
    register,
    login,
    getUser,
    verifyOTP,
    resendOTP,
    forgotPassword,
    resetPassword,
    getUsers,
    updateProfile,
    updateImage,
    changeRole,
    deleteUser
}