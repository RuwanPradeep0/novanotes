import {COMMENT ,FETCH_POST,START_LOADING,END_LOADING,FETCH_BY_SEARCH, UPDATE , DELETE , CREATE , FETCH_ALL , LIKE} from '../constants/actionTypes'
import * as api  from '../api' // import everything 

// action creators
export const  getPost = (id) => async(dispatch) => {
  try{
      dispatch({type:START_LOADING})
     
      const {data} = await api.fetchPost(id);

      dispatch({type:FETCH_POST , payload:data});

      console.log(data)

      dispatch({type:END_LOADING})

  } catch (error) {
      
      if (error.response) {
        console.error('Error response from server:', error.response.data);

      } else if (error.request) {
        console.error(error.request);
       
      } else {
        console.error('Error setting up the request:', error.message);
        
      }
    }
  
}


export const  getPosts = (page) => async(dispatch) => {
    try{
        dispatch({type:START_LOADING})

        const {data} = await api.fetchPosts(page);
        dispatch({type:FETCH_ALL , payload:data});
        console.log(data)

        dispatch({type:END_LOADING})

    } catch (error) {
      
      if (error.response) {
        console.error('Error response from server:', error.response.data);

      } else if (error.request) {
        console.error(error.request);
       
      } else {
        console.error('Error setting up the request:', error.message);
        
      }
    }
}

export const getPostsBySearch = (searchQuery) => async(dispatch) =>{
    try {
      
      dispatch({type:START_LOADING})
      console.log('running getPostBySerach')
     
      const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
      console.log('finished')

      dispatch({type:FETCH_BY_SEARCH , payload:data});

      dispatch({type:END_LOADING})

    } catch (error) {
      
      if (error.response) {
        console.error('Error response from server:', error.response.data);

      } else if (error.request) {
        console.error(error.request);
       
      } else {
        console.error('Error setting up the request:', error.message);
        
      }
    }
}

export const createPost = (post , navigate ) => async (dispatch) => {
    try {
        
      dispatch({type:START_LOADING})

      const {data} = await api.createPost(post);

      navigate(`/posts/${data._id}`)
     
      dispatch({type: CREATE , payload: data})

      dispatch({type:END_LOADING})

    } catch (error) {
        
        if (error.response) {
          console.error('Error response from server:', error.response.data);

        } else if (error.request) {
          console.error('No response received from the server');
         
        } else {
          console.error('Error setting up the request:', error.message);
          
        }
      }
}

export const updatePost = (id , post) => async(dispatch) =>{
    try{
        const {data} = await api.updatePost(id, post);

        dispatch({type:UPDATE , payload:data} )
    }catch(error){
        console.log(error)
    }
}


export const likePost = (id) => async(dispatch) =>{
    try {
        const{data} = await api.likePost(id);
        dispatch({type: LIKE , payload:data})

    } catch (error) {
        console.log(error)
    }
}

export const commentPost= (value , id) => async(dispatch) =>{
  try {
    const {data} = await api.comment(value ,id)
    
    dispatch({type:COMMENT , payload:data})

    return data.commentPost
  } catch (error) {
    
  }
}

export const deletePost = (id)=> async(dispatch) =>{
  try {
      await api.deletePost(id);

      dispatch({type:DELETE , payload:id } )
  } catch (error) {
      console.log(error)
  }
}