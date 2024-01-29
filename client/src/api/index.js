import axios from 'axios'

const API = axios.create({baseURL : 'http://localhost:5000'})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.getAuthorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token }`
    }

    return req;
})

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newpost) => API.post('/posts' , newpost);
export const updatePost = (id,updatedPost) => API.patch(`${'/posts'}/${id}` , updatedPost);
export const deletePost = (id) => API.delete(`${'/posts'}/${id}`);
export const likePost = (id) => API.patch(`${'/posts'}/${id}/likePost`)
export const comment = (value ,id) => API.post(`${'/posts'}/${id}/commentPost` , {value})


export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);


