import { useState } from 'react';
import Login from './LoginComp/Login';
import Main from './Body/Main';
import { Link } from 'react-router-dom';
import Footer from './FooterComp/Footer'
import {onAuthStateChanged} from "firebase/auth";
import { useStateValue } from "./stateProvider";
import User from './User';
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
            <Link to="/User">
             <button style={{marginTop:"20px"}} >Hello {user?user.email:"guest"}</button>
            </Link>
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
            <Route>
                <Route path="/" element ={[<Nav /> ,sideHead? <Heads/>:"", <Main />, <Footer />]}></Route>
                <Route path="/login" element={[<Nav/>,<Login />,<Footer/>]}></Route>
                <Route path='/heads' element={[<Nav /> ,sideHead?<Heads/>:"", <Footer/>]}></Route>
                <Route path='/treat' element={[<Nav/>,<Treat/>,<Footer/>]}></Route>
                <Route path="/finddoctor" element={[<Nav />,<Doctors />,<Footer/>]}></Route>
                <Route path="/finddoctor/doctorpage" element={[<Nav />,<DoctorPage />,<Footer/>]}></Route>
                <Route path="/finddoctor/appoint" element={[<Nav/>,<Appointment/>,<Footer/>]} ></Route>
                <Route path='/medicine' element={[<Nav/>,<Medicine/>,<Footer/>]}></Route>
                {/* <Route path='/' element={[<Nav/>]}></Route> */}
                <Route path='/User' element={[<Nav/>,<YourProfile/>,<Footer/>]}></Route>
                <Route path='/appoint' element={[<Nav/>,<Footer/>]} ></Route>
            </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
