import { useState } from "react";
import { useEffect } from "react";
import list from "./doctorList";
import { useStateValue } from "../../stateProvider";
import "./Appoint.css";
import { collection, doc, getDoc, setDoc, updateDoc} from "firebase/firestore"; 
import{ db} from "../../firebase";
import emailjs from "@emailjs/browser";
export default function Appointment(){
    const [{ doctor,user }, dispatch] = useStateValue();
    const [startTime, setStart] = useState(doctor.startTime);
    const [endTime, setEnd] = useState(doctor.endTime);
    const [slot, setSlot] = useState([]);
    const [titles,setTitles] = useState("Slot Avaliable");
    const [loading, setLoading] = useState(false);
   const [datab,udatab]=useState([]);
   const today = new Date() // get today's date
   const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    async function setSlots(i) {
        getDoc(doc(db, "doctors",doctor.id)).then(docSnap => {
            if (docSnap.exists()) {
                setStart(docSnap.data().startTime);
                setEnd(docSnap.data().endTime);
            } else {
              console.log("No such document!");
            }
          })
        return new Promise((resolve, reject) => {
        setSlot((prev) => {
            return [...prev, i];
        });

        if (slot) {
            resolve("It worked!");
        } else {
            reject(Error("It failed!"));
        }
        });
    }
    useEffect(() => {
        emailjs.init("iuFtzLVK3q6_61olU")
        getDoc(doc(db, "doctors",doctor.id)).then(docSnap => {
            if (docSnap.exists()) {
                const a=[];
                a.push(docSnap.data().slots.slot1);
                a.push(docSnap.data().slots.slot2);
                a.push(docSnap.data().slots.slot3);
                a.push(docSnap.data().slots.slot4);
                a.push(docSnap.data().slots.slot5);
                a.push(docSnap.data().slots.slot6);
                a.push(docSnap.data().slots.slot7);
                a.push(docSnap.data().slots.slot8);
                udatab(a);
                
            } else {
              console.log("No such document!");
            }
          })
        
        console.log(datab[1]);
        setSlot([]);
        addSlot();
        
    }, []);

    function addSlot() {
       
        let i = 0;
        console.log(startTime+" "+endTime);
        for (i = startTime; i < endTime; i++) {
            console.log(i, i + 1);
            setSlots(i);
            
        }
       
    }
    
    const handleSlots  = async (event) =>
    {
        console.log(event);
        event.preventDefault();
        var datax = event.currentTarget.getAttribute('data');
        var slotTime = event.currentTarget.getAttribute('time');
         // Add 1 to today's date and set it to tomorrow
          //console.log("Tomorrow is", tomorrow.toDateString())
        console.log(datax);
       datab[datax]=1;
       udatab(datab);
       console.log(datab+"here bkvgw");
        if(event.currentTarget.style.backgroundColor="green"){   
            event.currentTarget.style.backgroundColor="red";
            event.currentTarget.style.boxShadow="red";
            event.currentTarget.style.border= "1px solid darkred";
            setTitles("No Slot Avaliable");
            const DocRef = doc(db, "doctors",doctor.id);
            await updateDoc(DocRef, {
              
              "slots.slot1":datab[0],
              "slots.slot2":datab[1],
              "slots.slot3":datab[2],
              "slots.slot4":datab[3],
              "slots.slot5":datab[4],
              "slots.slot6":datab[5],
              "slots.slot7":datab[6],
              "slots.slot8":datab[7],
              
                
            });
           
            const serviceId = "service_y9h5hak.";
             const templateId = "template_2ahhf3g";
           try {
            
                await emailjs.send(serviceId, templateId, {
                  name: user.email,
                  doctorName:doctor.name,

                  t1:slotTime,
                  t2:(slotTime+1),
                  day:tomorrow.toDateString(),
                 recipient: user.email
             });
             alert("slot booked sucessfully");
           } catch (error) {
             console.log(error);
           } finally {
          
           }
           
      }
        else{
            event.currentTarget.style.backgroundColor="green";
            event.currentTarget.style.boxShadow="green";
            event.currentTarget.style.border="1px solid darkgreen";
            setTitles("Slot Avaliable");
        }
    };

    return (
        <div class="main">
            <div class="conatiner">
                <div class="sub">
                    <div class="image">
                        <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/005/724/584/small_2x/professional-doctor-with-stethoscope-line-icon-female-physicians-specialist-and-assistant-linear-pictogram-isolated-illustration-vector.jpg"
                        width="100"
                        height="100"
                        />
                    </div>
                    <div class="text">
                        <p>
                        <b>{doctor.name}</b>
                        </p>
                        <p>MBBS</p>
                        <p>{doctor.specialization}</p>
                        <p>{doctor.expe} years Experience </p>
                        <p>Medical Registration Verified</p>
                    </div>
                </div>
            </div>
            <div class="info">
                <h3>ABOUT</h3>
                <p>
                {doctor.about}
                </p>
            </div>
            <div class="info1">
                <center>
                <table>
                    <tr>
                    <th>Address</th>
                    <th>Work Timings</th>
                    <th>Fee</th>
                    </tr>
                    <tr>
                    <td>{doctor.address}</td>
                    <td>
                        {doctor.startTime}:00 - {doctor.endTime}:00 
                    </td>
                    <td>₹500</td>
                    </tr>
                </table>
                </center>
            </div>
            <div class="book">
                HealthConnect: Streamlined Doctors Appointment and Health Record
                Management
                <h2>Book Your Slot for :   <p>{tomorrow.toDateString()}</p> </h2>
            </div>
            <div class="btn">
                {slot.length > 0 ? (
                    
                slot.map((ele, idx) => {   
                    if(datab[idx]===0){
                        return (
                            <div  className="slots"  key={idx}>
                                <button style ={{backgroundColor:"green"}} title={titles} time={ele} data={idx} className="bookings" onClick={handleSlots}>
                                    {ele} - {ele + 1}
                                </button>
                            </div>
                        );
                    }
                    else{
                        return (
                            <div  className="slots"  key={idx}>
                                <button style={{backgroundColor: "red"}} title={titles} value={idx} className="bookings"  >
                                    {ele} - {ele + 1}
                                </button>
                            </div>
                        );

                    }
                    
                   
                })
                ) : (
                <div>No slots available</div>
                )}
            </div>
        </div>
    )
}