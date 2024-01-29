import React , {useState}  from 'react'
import { Avatar , Button , Paper , Grid , Typography , Container } from '@material-ui/core'
import { GoogleLogin } from '@react-oauth/google';
import LockOutLinedIcon from '@material-ui/icons/LockOpenOutlined'
import Input from './input'
import usestyles from './styles'
import { useDispatch } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import {useNavigate } from 'react-router-dom';
import {signin , signup} from '../../actions/auth'


const initialState = { firstName : '' , lastName : ''  , email :'' ,password : '' , confirmPasword: '' }

const Auth = () => {

    const classes = usestyles();
    const[showPassword , setShowPassword] = useState(false);
    const[isSignup , setIsSignup] = useState(false)
    const[formData , setFormData] = useState(initialState)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

  
    
    const handleSubmit = (e) => {
       e.preventDefault();
    
        if(isSignup){
            console.log(formData)
            dispatch(signup(formData , navigate ))
            
           }else {
            dispatch(signin(formData  , navigate))
           }
        
      
      };
      

    const handleChange = (e)=>{
        setFormData({...formData , [e.target.name] : e.target.value})
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false)
    }

    // const googleSuccess = async(res) => {
    //     console.log(res)
    //     const result = res?.profileObj;
    //     const token = res?.tokenId;

    //     try {
    //         dispatch({type: 'AUTH' , data : {result , token}})
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const googleSuccess = async (credentialResponse ) => {
        
        const decoded = jwtDecode(credentialResponse.credential);
        
         

        try {
            dispatch({type:'AUTH' , data : decoded})
            navigate('/')
        } catch (error) {
            console.log(error)
        }

      }



    const googleFailur  = () => {
        console.log('google SignUp Was Unsuccesful. Try again latter')
    }

  return (
    <Container component='main' maxWidth = "xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutLinedIcon/>
            </Avatar>

        <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {isSignup && (
                    <>
                    <Input name='firstName' label= 'First Name' handleChange={handleChange} autoFocus half/>
                    <Input name='lastName' label= 'Last Name' handleChange={handleChange}  half/>
                    </>
                )}

            <Input name='email' label= 'email' handleChange={handleChange} type='email'/>
            <Input name='password' label= 'Password' handleChange={handleChange} type = {showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
            
            {isSignup && (
                <Input name = 'confirmPasword' label ="Repeat Password" handleChange={handleChange} type ='password'/>
            )}
            </Grid>

            <GoogleLogin
                
                className={classes.googleButton} 
                onSuccess={googleSuccess}
                onFailure={googleFailur}
                cookiePolicy='single_host_origin'
            
            />
            
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>

            <Grid container justifyContent='flex-end'>
                <Grid item>
                    <Button onClick={switchMode}>
                        {isSignup ? 'Already have an account ? Sign In' : "Don't have an account ?  Sign Up"}
                    </Button>
                </Grid>
            </Grid>

        </form>
        </Paper>
    </Container>
  )
}

export default Auth


//143884249264-vif23tetgev769gr5aisc2m3kbp8mfjj.apps.googleusercontent.com