import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Login  from './Components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './Actions/User';
import  Home  from './Components/Home/Home';
import Account from './Components/Account/Account';
import NewPost from './Components/NewPost/NewPost';
import Register from './Components/Register/Register';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import UpdatePassword from './Components/UpdatePassword/UpdatePassword';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';

import UserDetail from './Components/UserDetail/UserDetail';
import Search from './Components/Search/Search';
import NotFound from './Components/NotFound/NotFound';

function App() {
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector((state) => state.user);


  useEffect(() => {
dispatch(loadUser())
  },[dispatch])


  return (
    <div className="App">
     <Router>
     {isAuthenticated && <Header/>}

<Routes>
      <Route path="/" element={isAuthenticated ? <Home/> : <Login/>} />
      <Route path="/account" element={ isAuthenticated ? <Account/> : <Login/>} />
      <Route path="/newpost" element={ isAuthenticated ? <NewPost /> : <Login/> } />
      <Route path="/register" element={ isAuthenticated ? <Account/> :<Register /> } />
      <Route path="/update/profile" element={isAuthenticated ? <UpdateProfile/> :  <Login/> } />
      <Route path="/update/password" element={isAuthenticated ? <UpdatePassword/> :  <Login/> } />
      <Route path="/forgot/password" element={isAuthenticated ? <UpdatePassword/> : <ForgotPassword/> } />
      <Route path="/password/reset/:token" element={isAuthenticated ? <UpdatePassword/> : <ResetPassword/> } />
      <Route path="/user/:id" element={isAuthenticated ? <UserDetail /> : <Login />} />
      <Route path='search' element = {isAuthenticated ? <Search /> : <Login />} />
      <Route path='*' element={<NotFound />} />







</Routes>

     </Router>
    </div>
  );
}

export default App;
