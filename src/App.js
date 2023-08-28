import { useState } from 'react';
import Login from './LoginComp/Login';
import Main from './Body/Main';
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
      <div className='sidenav' data-aos="zoom">
        <button onClick={handleHeads} data-aos="fade-down" name='close' className="material-symbols-outlined close">close</button>
        <div className='heading' data-aos="fade-up">
          <Link to="/">
            <button onClick={handleSideHeads} name='sideheading' className='sides'>Home</button>
          </Link>
          <Link to="/firstaid">
            <button onClick={handleSideHeads} name='sideheading' className='sides'>First Aid</button>
          </Link>
          <Link to="/medicine">
            <button onClick={handleSideHeads} name='sideheading' className='sides'>Medicine Suggestions</button>
          </Link>
          <Link to="/treat">
            <button onClick={handleSideHeads} name='sideheading' className='sides'>Treatment</button>
          </Link>
          <Link to="/finddoctor">
            <button onClick={handleSideHeads} name='sideheading' className='sides'>Find Doctors</button>
          </Link>
          
        </div>
      </div>
    )
  }

  const [icon,setIcon]= useState("light_mode");

  function handleModes(){
    if(icon==="light_mode"){
      setIcon("dark_mode");
    }
    else{
      setIcon("light_mode");
    }
  }

  function UserDetails(){
    return (
      <div>
        <span>sign out</span>
        {/* <span style={{border:"none"}} class="material-symbols-outlined">menu</span> */}
      </div>
    )
  }

  function Nav(){
    return (
      <div className='nav'>
        <div className='navi'>
          <Link to="/heads">
            <button onClick={handleHeads} name="menu" class="material-symbols-outlined menu">
              menu
            </button>
          </Link>
          <div className='buttons'>
         
           
             <h5 style={{margin:"30px"}} >Hello {user?user.email:"guest"}</h5>
          
            <MenuPopupState style={{height:"10px"}} />
            <Link to={!user && '/login'} >
               <button className='reg' onClick={handleAuth}>{user ? <UserDetails/>:'signIn'}</button>
            </Link>
         </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          
                <Route path="/" element ={[<Nav /> ,sideHead? <Heads/>:"", <Main />, <Footer />]}></Route>
                <Route path="/login" element={[<Nav/>,<Login />,<Footer/>]}></Route>
                <Route path='/heads' element={[<Nav /> ,sideHead?<Heads/>:"",]}></Route>
                <Route path='/treat' element={[<Nav/>,<Treat/>,<Footer/>]}></Route>
                <Route path="/finddoctor" element={[<Nav />,<Doctors />,<Footer/>]}></Route>
                <Route path="/finddoctor/doctorpage" element={[<Nav />,<DoctorPage />,<Footer/>]}></Route>
                <Route path="/finddoctor/appoint" element={[<Nav/>,<Appointment/>,<Footer/>]} ></Route>
                <Route path='/medicine' element={[<Nav/>,<Medicine/>,<Footer/>]}></Route>
                {/* <Route path='/' element={[<Nav/>]}></Route> */}
              
                <Route path='/appoint' element={[<Nav/>,<Footer/>]} > </Route>
                <Route path="/healthrecords" element={[<Nav />,<HealthRecords />,<Footer />]}> </Route>
                <Route path="/prescriptions" element={[<Nav />,<Prescriptions />,<Footer />]}> </Route>
                <Route path="/healthmetrics" element={[<Nav />,<HealthMetrics/>,<Footer />]}> </Route>
                <Route path="/profile" element={[<Nav />,<Profile />,<Footer />]}> </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
