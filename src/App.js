import Goals from "./Goals"
import logo from "./logo.png";
import { useState } from 'react';
import Login from './LoginComp/Login';
import Main from './Body/Main';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';

import { Link } from 'react-router-dom';
import Footer from './FooterComp/Footer'
import {onAuthStateChanged} from "firebase/auth";
import { useStateValue } from "./stateProvider";

import './App.css';
import {auth} from "./firebase";
import { useEffect } from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {signOut} from "firebase/auth";
import Doctors from "./Side Headings/DoctorComp/Doctors";
import DoctorPage from "./Side Headings/DoctorComp/DoctorPage";

import AOS from 'aos';
import 'aos/dist/aos.css';
import Appointment from './Side Headings/DoctorComp/Appointment';

import Button from '@mui/material/Button';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import HealthMetrics from "./HealthMetrics";
import Profile from "./Profile";
import Prescriptions from "./Prescriptions";
import HealthRecords from './HealthRecords';
function App() {

  useEffect(()=>{
      AOS.init({duration:2000});
  },[])

  const [sideHead,setSideHead] = useState(false);
  const [{user},dispatch]=useStateValue();

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
    
     console.log("user");
     if(user){
        dispatch({
         type:'SET_USER',
         user:user
        })
     }
     else{
       dispatch({
         type:'SET_USER',
         user:null
        })
     } 
    });
    },[]);
  function handleAuth(){
    if(user)
    {
        signOut(auth);
    }
     
   }
   const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

   function MenuPopupState() {
    return (
      <PopupState variant="popover" popupId="demo-popup-menu" >
        {(popupState) => (
          <React.Fragment>
            <Button style={{margin:"0px 30px"}} variant="contained" {...bindTrigger(popupState)}>
              Dashboard
            </Button>
            <Menu {...bindMenu(popupState)}>
               <Link to={user && '/profile'}><MenuItem onClick={popupState.close} className='menu-item'>Profile</MenuItem> </Link> 
               <Link to={user && '/healthrecords'}><MenuItem onClick={popupState.close} className='menu-item'>Health Records</MenuItem></Link>
               <Link to={user && '/prescriptions'}><MenuItem onClick={popupState.close} className='menu-item'>Prescriptions</MenuItem></Link>
               <Link to={user && '/healthmetrics'}><MenuItem onClick={popupState.close} className='menu-item'>Health Metrics</MenuItem></Link>
               <Link to={user && '/goals'}><MenuItem onClick={popupState.close} className='menu-item'>Goals</MenuItem></Link>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    );
  }

  function UserDetails(){
    return (
      <div>
        <span>SIGN OUT</span>
      </div>
    )
  }

  function Nav(){
    return (
      <div className="nav-bar">
        <div style={{float:"left",display:"flex",margin:"5px"}}>
          <Link style={{textDecoration:"none"}} to="/">
            <img style={{width:"75px",height:"75px"}} src={logo}/>
          </Link>
          <Link to="/finddoctor" style={{textDecoration:"none", "&hover":{color:"blue"}}}>
            <h2 className="nav-heading" style={{border:"1px solid none",textDecoration:"none",padding:"10px",marginTop:"2.5%",marginLeft:"5%",width:"200px",color:"white"}}>Find Doctors</h2>
          </Link>
        </div>
        <div style={{alignItems:"center",justifyContent:"space-around",display:"flex",float:"right"}}>
          <h5 style={{margin:"0px 10px"}}>Hello {user?user.email:"guest"}</h5>  
          <MenuPopupState style={{height:"20px",margin:"0px 300px"}} />
          <Link to={!user && '/login'} >
          <button  style={{margin:"0px 30px",
          height : "33px",
          paddingLeft:"35px",
          paddingRight:"35px",
          backgroundColor:"#1565c0",
          color:"white",
          border:"none",
          fontFamily:"Merriweather",
          borderRadius:"7px"
          }} onClick={handleAuth}>{user ? 'SIGN OUT':'SIGN IN'}</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{margin:"0px"}}>
      <Router>
        <Routes>
            <Route path="/" element ={[<Nav /> , <Main />, <Footer />]}></Route>
            <Route path="/login" element={[<Login />]}></Route>
            <Route path="/finddoctor" element={[<Nav />,<Doctors />]}></Route>
            <Route path="/finddoctor/doctorpage" element={[<Nav />,<DoctorPage />]}></Route>
            <Route path="/finddoctor/appoint" element={[<Nav/>,<Appointment/>]} ></Route>
            <Route path='/appoint' element={[<Nav/>]} > </Route>
            <Route path="/healthrecords" element={[<Nav />,<HealthRecords />]}> </Route>
            <Route path="/prescriptions" element={[<Nav />,<Prescriptions />]}> </Route>
            <Route path="/healthmetrics" element={[<Nav />,<HealthMetrics/>]}> </Route>
            <Route path="/profile" element={[<Nav />,<Profile />]}> </Route>
            <Route path="/goals" element={[<Nav />,<Goals />]}> </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
