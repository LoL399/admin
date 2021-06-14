import api from "./api";

const list = (data) => {              
    return api.post(`${api.url.movies}`,data);
};

const get = (id) => api.get(`${api.url.movies}/${id}`); 

const getOne = (id) => api.get(`${api.url.movies}/get-by-id/${id}`); 
const add = data => api.post(`${api.url.movies}/create`,data);
const update =(id,data)=> api.post(`${api.url.movies}/update/${id}`,data).then(res => res.data).catch(err => console.error("Wasn't able to update property.", err));
const remove = (id) => api.delete(`${api.url.movies}/${id}`);
export default {
    list : list,
    get :get,
    add: add,
    update:update,
    remove:remove,
    getOne: getOne,
};