import doctor from "./doctor.webp";
import aid from "./firstaid.png";
import docimage from "./doctor.png";
import medicine from "./medicine.jfif";
import "./Main.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../stateProvider";
import{ db} from "../firebase";
import { collection, doc, getDoc,updateDoc,setDoc ,update } from "firebase/firestore"; 
import Carasol from "./Carasol";
export default  function Main(){
    const [{user},dispatch]=useStateValue();
    const userdata={
        UserName:"",
        cistole:[],
        diastole:[],
        weight:[],
        glucose:[],
        glucoseDate:[],
        weightDate:[],
        cystole:[],
        diastole:[],
        bloodpressureDate:[],
        goals:[],
        goalDate:[],
    }
    useEffect(()=>{
        AOS.init({duration:3000});
       if(user){
        getDoc(doc(db, "users",user.email)).then(docSnap => {
            if (docSnap.exists()) {
                console.log("hurray user");
            } else {
                setDoc(doc(db, "users", user.email), userdata);
              console.log("usernot found");

            }
          })
       }
    },[])

    function Box(props){
        return(
            <div className="boxes">
                <img className="img" src={props.img} alt={props.alter} style={{backgroundColor:"white",borderRadius:"30%"}}/>
                <p>{props.name}</p>
            </div>
        )
    }

    return (
        <div className="body-main">
            <div className="poster" data-aos="fade-up">
                <h1>Expertise ensures a proactive approach to your health<br/>
                No fear when we are here
                </h1>
                <img className="doc-img" src={doctor} />
            </div>
            <div style={{margin:"50px 0px",display:"flex",justifyContent:"space-around",alignItems:"center",textAlign:"center"}} data-aos="fade-down">
                <Link style={{textDecoration:"none"}} to="/finddoctor">
                    <Box className="box" img={"https://o.remove.bg/downloads/a4bfa163-c63c-4819-8979-5a4b064339b4/physician-icon-png-16-removebg-preview.png"} alter="Near Doctors" name="DOCTORS AROUND YOU" />
                </Link>
                <Link style={{textDecoration:"none"}}  to ="/healthmetrics">
                    <Box img={"https://o.remove.bg/downloads/b4db66ce-1c32-4768-8a5b-56eb84c2a7e2/140257962-heartbeat-with-chronometer-to-health-lifestyle-balance-vector-illustration-removebg-preview.png"} alter="First Aid" name="HEALTH METRICS"  />
                </Link>
                <Link to="/goals" style={{textDecoration:"none"}}>
                    <Box img={"https://o.remove.bg/downloads/06a3d536-7132-4432-87df-b03b60e42d01/goal-51-removebg-preview.png"} alter="Tablets" name="SET PERSONAL GOALS" />    
                </Link>
            </div>
            <h1 style={{textAlign:"center",width:"fit-content",padding:"10px",margin:"10px auto"}}>OUR SERVICES</h1>
            <Carasol/>
        </div>
    );
}