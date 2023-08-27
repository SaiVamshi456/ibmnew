import doctor from "./doctor.webp";
import aid from "./firstaid.png";
import doc_img from "./doctorsimage.jpg";
import medicine from "./medicine.png";
import docimage from "./doctor.png";
import logo from "./logo.webp";
import "./Main.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../stateProvider";
import{ db} from "../firebase";
import { collection, doc, getDoc,updateDoc,setDoc ,update } from "firebase/firestore"; 
export default function Main(){
    const [{user},dispatch]=useStateValue();
    useEffect(()=>{
        AOS.init({duration:5000});
       if(user){
        getDoc(doc(db, "users",user.email)).then(docSnap => {
            if (docSnap.exists()) {
                console.log("hurray user");
            } else {
              
            }
          })
       }
    },[])

    function Box(props){
        return(
            <div className="boxes">
                <div className="img">
                    <img src={props.img} alt={props.alt} />
                </div>
                <hr/>
                <p>{props.name}</p>
            </div>
        )
    }

    return (
        <div className="body-main">
            <div className="poster" data-aos="fade-up">
                <h1>Expertise ensures a proactive<br/> approach to your health<br/>
                No fear when we are here
                </h1>
                <img className="doc-img" src={doctor}/>
            </div>
            <div className="imp" data-aos="fade-down">
                <Link to="/finddoctor">
                    <Box img={docimage} alter="Near Doctors" name="Doctors near You" />
                </Link>
                <Box img={aid} alter="First Aid" name="First Aid"  />
                <Link to="/medicine">
                    <Box img={medicine} alter="Tablets" name="Medicines used according to issue" />    
                </Link>
            </div>
            <div style={{height:"20vh"}}></div>
            <h1 style={{height:"10vh",textAlign:"center"}}>About US</h1>
            <div className="about-us">
                <div className="about-details d1">
                    Check doctors near you Check doctors near you
                    Check doctors near you Check doctors near you
                    Check doctors near you Check doctors near you
                    Check doctors near you Check doctors near you
                    Check doctors near you Check doctors near you
                    Check doctors near you Check doctors near you
                    Check doctors near you Check doctors near you
                    Check doctors near you Check doctors near you
                </div>
                <div className="about-details d2">
                    First Aid First Aid
                    First Aid First Aid
                    First Aid First Aid
                    First Aid First Aid
                    First Aid First Aid
                    First Aid First Aid
                    First Aid First Aid
                    First Aid First Aid
                </div>
                <div className="about-details d3">
                    Prescription Notification Prescription Notification
                    Prescription Notification Prescription Notification
                    Prescription Notification Prescription Notification
                    Prescription Notification Prescription Notification
                    Prescription Notification Prescription Notification
                    Prescription Notification Prescription Notification
                    Prescription Notification Prescription Notification
                    Prescription Notification Prescription Notification
                </div>
                <div className="about-details d4">
                    Medicine delivery Medicine delivery
                    Medicine delivery Medicine delivery
                    Medicine delivery Medicine delivery
                    Medicine delivery Medicine delivery
                    Medicine delivery Medicine delivery
                    Medicine delivery Medicine delivery
                    Medicine delivery Medicine delivery
                    Medicine delivery Medicine delivery
                </div>
            </div>
        </div>
    );
}