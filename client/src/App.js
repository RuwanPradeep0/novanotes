import { BrowserRouter, Routes, Route , Navigate   } from 'react-router-dom';


import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails from './components/PostDetails/PostDetails';



const App = () => {
 
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <GoogleOAuthProvider clientId="143884249264-vif23tetgev769gr5aisc2m3kbp8mfjj.apps.googleusercontent.com">
    <Container maxWidth="xl">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path='/posts'  element={<Home/>} />
          <Route path='/posts/search'  element={<Home/>} />
          <Route path='/posts/:id'  element={<PostDetails/>} />
          <Route path='/auth'  element={(!user ? <Auth/> : <Navigate to ='/posts'/>)}/>
        </Routes>

      </BrowserRouter>
    </Container>
    </GoogleOAuthProvider>
  );
}

export default App;
