import React , {useState , useEffect} from 'react'
import { AppBar , Avatar, Button, Typography , Toolbar } from '@material-ui/core';
import useStyles from './styles'
import {Link, useLocation} from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import memoriesLogo from '../../images/memoriesLogo.png'

const Navbar = () => {
    const classes= useStyles();
    const[user , setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    
//    const user = null;

    const logout = () => {
        dispatch({type: 'LOGOUT' })
        navigate('/')
        setUser (null);
    }
    //const user = null;
    //console.log(user?.name)
    //console.log(user)

    useEffect(() => {
        //user?.email_verified && setUser(JSON.parse(localStorage.getItem('profile'))) 
        const token = user?.token;
        if(token){
           const decodedToken = jwtDecode(token)
           if(decodedToken.exp*1000 < new Date().getTime()) logout()
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    } , [location] )


  return (
    <AppBar className= {classes.appBar} position='static' color='inherit'>

    <div className={classes.brandContainer}>
    <Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'>
    NovaNotes
    </Typography>

    <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
    </div>

    <Toolbar className ={classes.toolbar}>
        {
            user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user?.name} src={user?.imageUrl}>
                        {user?.result?.name.charAt(0)}
                    </Avatar>
                    
                    <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                    <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                </div>
            ): (
                <div>
                    <Button component={Link} to='/auth' variant='contained' color = 'primary'>
                        Sign In
                    </Button>

                </div>

            )
        }
    </Toolbar>
    
  </AppBar>
  )
}

export default Navbar