import axios from "axios";

const client = axios.create({
    baseURL: 'http://52.78.231.125:8080',
})

export const setClient = (token) => {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

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
