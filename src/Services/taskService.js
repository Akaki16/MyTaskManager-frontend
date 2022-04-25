import axios from 'axios';

const baseURL = 'https://sleepy-basin-02107.herokuapp.com/api/tasks';

const getAll = () => {
    return axios.get(baseURL);
}

const create = (taskObject) => {
    return axios.post(baseURL, taskObject);
}

const deleteObject = (id) => {
    return axios.delete(`${baseURL}/${id}`);
}

const update = (id, newObject) => {
    return axios.put(`${baseURL}/${id}`, newObject)
}

export default { getAll, create, deleteObject, update };