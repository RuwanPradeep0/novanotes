import React, {useState} from 'react'
import {Card , CardActions , CardContent , CardMedia , Button , Typography } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment';
import useStyles from './styles'
import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router';
import { CardActionArea } from '@mui/material';


import { deletePost , likePost } from '../../../actions/posts'

const Post = ({post , setCurrentId}) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[likes, setLikes] = useState(post?.likes)
  const user = JSON.parse(localStorage.getItem('profile'));

  const hasLikedPost = likes.find((like) => like === (user?.result?._id))
  const userId = user?.result?.googleId || user?.result?._id;

  const handleLike =async() => {
    dispatch(likePost(post._id))

    if(hasLikedPost){
      setLikes(post.likes.filter((id) => id !== userId));
    }else {
       setLikes([...post.likes , userId])
    }
  }

  const Likes = () => {
    if (post?.likes?.length > 0) {
      return likes.find((like) => like === (user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpOutlinedIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpOutlinedIcon fontSize="small" />&nbsp;Like</>;
  };

  const openPost = ()=>{
    navigate(`/posts/${post._id}`)
  }
 

  return (
    <Card className={classes.card} raised elevation={6}>
      
     
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
        <div className={classes.overlay}>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body'>{moment(post.createdAt).fromNow()}</Typography>
        </div>
        
        
        {(user?.result?._id === post?.creator) && (
            <div className={classes.overlay2}>
            <Button style= {{color:'white'} } 
            size = 'small' 
            onClick={() => setCurrentId(post._id)} >
              <MoreHorizIcon fontSize='medium'/>
            </Button>
          </div>
  
        )}

     <CardActionArea onClick={openPost}>


        <div className={classes.details}>
          {<Typography variant='body2' color='textSecondary'>{post.tags.map((tag)=>`#${tag} `)}</Typography>}

        </div>

        <CardContent>
        <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>

        <Typography  variant='body2' color='textSecondary' component= "p" >{post?.message.substring(0, 100)}</Typography>
        </CardContent>

        </CardActionArea>

        <CardActions className={classes.CardActions}>
          <Button size='small' color='primary' disabled= {!user?.result} onClick={handleLike}>
            <Likes/>
          </Button>

         
          {(user?.result?._id === post?.creator) && (
               <Button size='small' color='primary' onClick={()=> dispatch(deletePost(post._id))}>
               <DeleteIcon fontSize='small'/>
               Delete
             </Button>
          )}
        </CardActions>
        
    </Card>
  )
}

export default Post