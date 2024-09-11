import axios from 'axios';

// 创建 Axios 实例
const instance = axios.create({
    baseURL: 'https://tools.dc-eve.com',
    timeout: 10000,
});

// 定义一个获取新 token 的函数
async function refreshToken() {
    const response = await axios.get('/home/toolsToken', {
        // headers: {
        //     'Access-Control-Allow-Origin' : '*',
        //     'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
        //     'Access-Control-Allow-Headers' : 'Authorization, Content-Type, X-Requested-With',
        //
        // },
        withCredentials: true, // 允许跨域发送 Cookie
    });
    sessionStorage.setItem('token', response.data.token);
    return response.data.token;
}

// 请求拦截器，添加 token
instance.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// 响应拦截器，处理 401 错误
instance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            // originalRequest._retry = true;

            // 获取新的 token
            // const newToken = await refreshToken();
            // axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

            // 重试原始请求
            // originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            // return axios(originalRequest);
        }

        return Promise.reject(error);
    }
);

// 异步请求封装
export async function asyncRequest(method, url, data = {}) {
    try {
        const response = await instance({
            url,
            method,
            data,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export function syncRequest(method, url, data = {}) {
    let result;
    const request = instance({
        url,
        method,
        data,
    })
        .then(response => {
            result = response.data;
        })
        .catch(error => {
            throw error;
        });

    // 使用 await 来模拟同步行为
    return (async () => {
        await request;
        return result;
    })();
}
