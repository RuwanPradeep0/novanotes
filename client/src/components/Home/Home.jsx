import React, { useState } from 'react'
import { Container , Grow , Grid, Paper , AppBar ,Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useNavigate , Location, useLocation } from 'react-router';
import ChipInput from 'material-ui-chip-input'
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination/Pagination';
import { useDispatch } from 'react-redux';
import { getPostsBySearch } from '../../actions/posts';
import useStyles from './styles'

function useQuery(){
  return new URLSearchParams(useLocation().search)
}


const Home = () => {

    const [currentId , setCurrentId] = useState(0);
    const [search , setSearch] = useState("")
    const [tags , setTags] = useState([]);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();

    


    const handleKeyPress = (e)=>{
      if(e.keyCord === 13){
        //search posts
        searchPosts();
      }
    }

    const handleAdd = (tag) => {
      setTags([...tags , tag])
    }

    const handleDelete = (tagToDelete) => {
      setTags(tags.filter((tag)=> tag !== tagToDelete))
    }

    const searchPosts = () => {
      if(search.trim() || tags){
          dispatch(getPostsBySearch({search , tags:tags.join(',') }))
          navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
      }else{
        navigate('/')
      }
    }

  return (
   <Grow in>
        <Container maxWidth= 'xl'>
          <Grid container  alignItems='stretch' className={classes.gridContainer}  spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
               <Posts setCurrentId = {setCurrentId}/>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                <TextField 
                name='search' 
                variant='outlined' 
                label="Search Posts"
                fullWidth
                onKeyPress={handleKeyPress}
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                }}/>

              <ChipInput
                style={{margin : '10px 0'}}
                value={tags}
                onAdd= {handleAdd}
                onDelete={handleDelete}
                label='Search Tags'
                variant='outlined'             
              /> 

              <Button onClick={searchPosts} className={classes.searchButton} variant ='contained' color='primary'>Search</Button>

              </AppBar>

              <Form currentId = {currentId} setCurrentId = {setCurrentId}/>

              {(!searchQuery && !tags.length) && (
                <Paper  elevation={6} className={classes.pagination}>
                <Pagination page={page}/>
              </Paper>
              )}
              
            </Grid>
          </Grid>
        </Container>
    </Grow>
  )
}

export default Home