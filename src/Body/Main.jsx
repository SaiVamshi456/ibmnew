
import medicine from "./medicine.jfif";
import "./Main.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../stateProvider";
import{ db} from "../firebase";
import { collection, doc, getDoc,updateDoc,setDoc ,update } from "firebase/firestore"; 
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
            <div className="boxes" data-aos='fade-down'>
                <div className="image">
                    <img src={props.img} alt={props.alter} />
                </div>
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
                <img className="doc-img" src={"https://img.freepik.com/free-vector/health-professional-team_52683-36023.jpg"}/>
            </div>
            <div className="imp" data-aos="fade-down">
                <Link to="/finddoctor">
                    <Box img={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZfgZ7gJLtqdC0hby93kal4lP4IIsrfJ880g&usqp=CAU"} alter="Near Doctors" name="Doctors near You" />
                </Link>
                <Box img={"https://media.istockphoto.com/id/1215835575/vector/medicine-first-aid-kit.jpg?s=612x612&w=0&k=20&c=L-AcsFJAG2QfO5vg0qPl2_NhH9IRwYkhHUoofqpzkMI="} alter="First Aid" name="First Aid"  />
                <Box img={medicine} alter="Tablets" name="Medicines used according to issue" />    
            </div>
            <h1 className="faq">FAQs</h1>
            <div className="slider" data-aos="fade-up">                    
                <div className="slider-container">
                    <p>“Went with my wife, absolutely brilliant restaurant, the food tasted beautiful, so much depth and very well presented. As good if not better than any in the city centre. Will definitely be returning.” <br/> Nathaniel Harwood – Google</p>
                </div>
                <div className="slider-container">
                    <p>“Great friendly service, the staff don't make you feel rushed, but are also very attentive, and on hand all the time if needed, best Thai food I have had in years, flavours are out of this world, and extremely good prices for the quality you get is top notch!!!!!! Love it” <br/>David Armstrong - Porter – Google</p>
                </div>
                <div className="slider-container">
                    <p>“Possibly one of the best in Manchester. A menu designed and prepared by a very skilled chef, ably assisted by his wife who provides a friendly welcome. Always consistent and of high quality.” <br/>Paul Fletcher – Google</p>
                </div>
                <div className="slider-container">
                    <p>“Food was amazing and service could not have been better...we went for a quick lunch as our office is opposite the restaurant...very quick service...I am highly recommending this restaurant to all my family and friends...” <br/>Nic Gent – Facebook Page</p>
                </div>
            </div>
        </div>
    );
}