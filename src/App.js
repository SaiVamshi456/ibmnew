import { useState } from 'react';
import Login from './LoginComp/Login';
import Main from './Body/Main';
import { Link } from 'react-router-dom';
import Footer from './FooterComp/Footer'
import {onAuthStateChanged} from "firebase/auth";
import { useStateValue } from "./stateProvider";
// import Dropdown from 'react-bootstrap/Dropdown';
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
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
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

   function MenuPopupState() {
    return (
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Button variant="contained" {...bindTrigger(popupState)}>
              Dashboard
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
    );
  }



  function handleHeads(event){
    if(event.target.name==='menu' || event.target.name==='sideheading'){
      setSideHead(true);
    }
    else if(event.target.name==='close'){
      setSideHead(false);
    }
  }

  function handleSideHeads(event){
    setSideHead(!sideHead);
  }


  function Heads(){
    return(
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Button class="material-symbols-outlined" variant="contained" style={{margin:"10px",padding:"10px",fontSize:"40px",cursor:"pointer"}} {...bindTrigger(popupState)}>
                X
              </Button>
              <Menu {...bindMenu(popupState)}>
                <Link to={user && '/'}><MenuItem onClick={popupState.close} className='menu-item'>Home</MenuItem> </Link> 
                <Link to={user && '/finddoctor'}><MenuItem onClick={popupState.close} className='menu-item'>Find Doctors</MenuItem></Link>
                <Link to={user && '/treat'}><MenuItem onClick={popupState.close} className='menu-item'>Treatment</MenuItem></Link>
                <Link to={user && '/medicine'}><MenuItem onClick={popupState.close} className='menu-item'>Medicine Suggestions</MenuItem></Link>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
    )
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
      <div style={{margin:"0",alignItems:"center",textAlign:"center",justifyContent:"space-between",display:"flex",height:"100px",position:"sticky",boxShadow:"1px 2px 10px grey"}}>
        <Heads/>
        {/* <Link to="/heads">
          <button onClick={handleHeads} style={{justifyContent:"center",alignItems:"center"}} name="menu" class="material-symbols-outlined menu">
            menu
          </button>
        </Link> */}
        <div style={{alignItems:"center",justifyContent:"space-evenly",display:"flex",float:"right"}}>
          <h5 style={{margin:"0px 10px"}}>Hello {user?user.email:"guest"}</h5>          
          <MenuPopupState style={{height:"20px"}} />
          <Link to={!user && '/login'} >
              <button style={{margin:"0px 20px",padding:"10px",backgroundColor:"transparent",border:"none",boxShadow:"1px 1px 10px blue",borderRadius:"10px"}} onClick={handleAuth}>{user ? <UserDetails/>:'signIn'}</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{margin:"0px"}}>
      <Router>
        <Routes>
            <Route path="/" element ={[<Nav /> ,sideHead? <Heads/>:"", <Main />, <Footer />]}></Route>
            <Route path="/login" element={[<Nav/>,<Login />]}></Route>
            <Route path='/heads' element={[<Nav /> ,sideHead?<Heads/>:"",]}></Route>
            <Route path='/treat' element={[<Nav/>,<Treat/>]}></Route>
            <Route path="/finddoctor" element={[<Nav />,<Doctors />]}></Route>
            <Route path="/finddoctor/doctorpage" element={[<Nav />,<DoctorPage />]}></Route>
            <Route path="/finddoctor/appoint" element={[<Nav/>,<Appointment/>]} ></Route>
            <Route path='/medicine' element={[<Nav/>,<Medicine/>]}></Route>
            <Route path='/appoint' element={[<Nav/>]} > </Route>
            <Route path="/healthrecords" element={[<Nav />,<HealthRecords />]}> </Route>
            <Route path="/prescriptions" element={[<Nav />,<Prescriptions />]}> </Route>
            <Route path="/healthmetrics" element={[<Nav />,<HealthMetrics/>]}> </Route>
            <Route path="/profile" element={[<Nav />,<Profile />]}> </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
