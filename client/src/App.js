import React from 'react';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';

import {useSelector} from 'react-redux'
import jwt_decode from 'jwt-decode';
import {userLoginHelper, userLogout} from './redux/actions/userAction'
import setAuthToken from './redux/helper/setAuthToken'
import store from './redux/store' 

//elements
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Cart from './pages/Admin/Cart'
import Navbar from './components/Navbar'
import Payment from './pages/Admin/Payment'
import MyCourses from './pages/Admin/MyCourses'
import CourseDetails from './pages/Admin/CourseDetails'
import Profile from './pages/Admin/Profile'

//Admin
import UploadVideos from './pages/Admin/UploadVideos'


 if (window.localStorage.userJwtToken) {
  setAuthToken(localStorage.userJwtToken);
  const decoded = jwt_decode(localStorage.userJwtToken);
  store.dispatch(userLoginHelper(decoded.user))
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(userLogout());
    window.location.href = '/';
  }
} 




function App() {
  const store = useSelector(store => store.userRoot)
  
  return (
    <div className="App">
      <Router>
        {store.isAuthenticated ?<Navbar />: null} 
        <Routes>
          <Route exact path='/' element={<LoginPage/>} />
          <Route exact path='/register' element={<RegisterPage/>} />
          <Route exact path="/forgotPassword" element={<ForgotPassword/>} />
          <Route exact path="/home" element={<Home/>} />
          <Route exact path="/addCourse" element={<UploadVideos/>} />
          <Route exact path="/cart" element={<Cart/>} />
          <Route exact path="/payment/:courseId" element={<Payment/>} />
          <Route exact path="/myCourses" element={<MyCourses/>} />
          <Route exact path="/courseDetails/:courseId" element={<CourseDetails/>} />
          <Route exact path="/profile" element={<Profile/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
