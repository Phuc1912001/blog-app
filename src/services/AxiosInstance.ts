import axios from "axios";

import { store } from "../Redux/store";

// export const createAxiosInstance = (user: RootState['user']['user']): AxiosInstance => {
//     const instance = axios.create();
//     // Interceptor để thêm thông tin xác thực vào tiêu đề Authorization
//     instance.interceptors.request.use(
//         (config) => {
//             if (user.token) {
//                 config.headers.Authorization = `Bearer ${user.token}`;
//             }
//             return config;
//         },
//         (error) => {
//             return Promise.reject(error);
//         }
//     );

//     return instance;
// };

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});
api.interceptors.request.use(
    (config) => {
        const _store = store.getState();
        const user = _store.user.user;

        config.headers.Authorization = user?.token ? `Bearer ${user.token}` : '';

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
