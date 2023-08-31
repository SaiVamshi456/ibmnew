import Goals from "./Goals"
import logo from "./logo.png";
import { useState } from 'react';
import Login from './LoginComp/Login';
import Main from './Body/Main';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import * as React from 'react';
import Logout from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import Footer from './FooterComp/Footer'
import {onAuthStateChanged} from "firebase/auth";
import { useStateValue } from "./stateProvider";
import userDrop from "./userDrop";
import BasicExample from "./BasicExample";
import './App.css';
import {auth} from "./firebase";
import { useEffect } from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {signOut} from "firebase/auth";
import Doctors from "./Side Headings/DoctorComp/Doctors";
import DoctorPage from "./Side Headings/DoctorComp/DoctorPage";
import Treat from './Side Headings/TreatMentComp/Treat';
import Medicine from './Side Headings/MedComp/Medicine';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Appointment from './Side Headings/DoctorComp/Appointment';
import YourProfile from './YourProfile';
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
     // User is signed in, see docs for a list of available properties
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
              {user?user.email:"guest"}
            </Button>
            <Menu {...bindMenu(popupState)}>
               <Link to={user && '/profile'}><MenuItem onClick={popupState.close} className='menu-item'>Profile</MenuItem> </Link> 
               <Link to={user && '/healthrecords'}><MenuItem onClick={popupState.close} className='menu-item'>Health Records</MenuItem></Link>
               <Link to={user && '/prescriptions'}><MenuItem onClick={popupState.close} className='menu-item'>Prescriptions</MenuItem></Link>
               <Link to={user && '/healthmetrics'}><MenuItem onClick={popupState.close} className='menu-item'>Health Metrics</MenuItem></Link>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
      // <Menu
      //   anchorEl={anchorEl}
      //   id="account-menu"
      //   open={open}
      //   onClose={handleClose}
      //   onClick={handleClose}
      //   PaperProps={{
      //     elevation: 0,
      //     sx: {
      //       overflow: 'visible',
      //       filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      //       mt: 1.5,
      //       '& .MuiAvatar-root': {
      //         width: 32,
      //         height: 32,
      //         ml: -0.5,
      //         mr: 1,
      //       },
      //       '&:before': {
      //         content: '""',
      //         display: 'block',
      //         position: 'absolute',
      //         top: 0,
      //         right: 14,
      //         width: 10,
      //         height: 10,
      //         bgcolor: 'background.paper',
      //         transform: 'translateY(-50%) rotate(45deg)',
      //         zIndex: 0,
      //       },
      //     },
      //   }}
      //   transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      //   anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      // >
      //   <MenuItem onClick={handleClose}>
      //     <Avatar /> Profile
      //   </MenuItem>
      //   <MenuItem onClick={handleClose}>
      //     <Avatar /> My account
      //   </MenuItem>
      //   <Divider />
      //   <MenuItem onClick={handleClose}>
      //     <ListItemIcon>
      //       <PersonAdd fontSize="small" />
      //     </ListItemIcon>
      //     Add another account
      //   </MenuItem>
      //   <MenuItem onClick={handleClose}>
      //     <ListItemIcon>
      //       <Settings fontSize="small" />
      //     </ListItemIcon>
      //     Settings
      //   </MenuItem>
      //   <MenuItem onClick={handleClose}>
      //     <ListItemIcon>
      //       <Logout fontSize="small" />
      //     </ListItemIcon>
      //     Logout
      //   </MenuItem>
      // </Menu>
    );
  }

  function UserDetails(){
    return (
      <div>
        <span>sign out</span>
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
          <BasicExample/>
        </div>
        <div style={{alignItems:"center",justifyContent:"space-around",display:"flex",float:"right"}}>
          {/* <h5 style={{margin:"0px 10px"}}>Hello {user?user.email:"guest"}</h5>           */}
          <MenuPopupState style={{height:"20px",margin:"0px 300px"}} />
          <Link to={!user && '/login'} >
              <button style={{margin:"0px 20px",padding:"10px",backgroundColor:"blue",color:"white",border:"none",boxShadow:"1px 1px 10px #AEE2FF"}} onClick={handleAuth}>{user ? <UserDetails/>:'signIn'}</button>
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
            <Route path="/finddoctor" element={[<Nav />,<Doctors />, <Footer />]}></Route>
            <Route path="/finddoctor/doctorpage" element={[<Nav />,<DoctorPage />, <Footer />]}></Route>
            <Route path="/finddoctor/appoint" element={[<Nav/>,<Appointment/>, <Footer />]} ></Route>
            <Route path='/appoint' element={[<Nav/>, <Footer />]} > </Route>
            <Route path="/healthrecords" element={[<Nav />,<HealthRecords />, <Footer />]}> </Route>
            <Route path="/prescriptions" element={[<Nav />,<Prescriptions />, <Footer />]}> </Route>
            <Route path="/healthmetrics" element={[<Nav />,<HealthMetrics/>, <Footer />]}> </Route>
            <Route path="/profile" element={[<Nav />,<Profile />]}> </Route>
            <Route path="/goals" element={[<Nav />,<Goals />]}> </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
