import axios from "axios";

const client = axios.create({
    baseURL: 'https://imonint.shop',
    withCredentials: true
})

client.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('token')
    config.headers.common['Authorization'] = `${accessToken}`;
    return config;
});

export const getApi = (path, config) => {
    return client.get(path, config)
}

export const postApi = (path, data, config) => {
    return client.post(path, data, config)
}

export const patchApi = (path, data, config) => {
    return client.patch(path, data, config)
}

export const putApi = (path, data, config) => {
    return client.put(path, data, config)
}

export const deleteApi = (path, config) => {
    return client.delete(path, config)
}

export default client