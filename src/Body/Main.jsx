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
// import Carasol from "./Carasol";
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
        AOS.init({duration:5000});
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
            <div style={{padding:"20px",width:"250px",height:"200px",boxShadow:"1px 2px 10px grey",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center"}} data-aos='fade-down'>
                <img style={{width:"150px",height:"150px",alignItems:"center",justifyContent:"center"}} src={props.img} alt={props.alter} />
                <p style={{alignItems:"center",textAlign:"center",fontSize:"30px",textDecoration:"none",color:"black"}}>{props.name}</p>
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
                <Link to="/finddoctor">
                    <Box img={docimage} alter="Near Doctors" name="Doctors near You" />
                </Link>
                <Link>
                    <Box img={aid} alter="First Aid" name="First Aid"  />
                </Link>
                <Link to="/medicine">
                    <Box img={medicine} alter="Tablets" name="Medicines used according to issue" />    
                </Link>
            </div>
            <h1 className="faq">FAQs</h1>
            {/* <Carasol/> */}
        </div>
    );
}