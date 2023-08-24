import { useState } from "react";
import doctors from "./doctorList";
import "./Doctors.css";
import { useStateValue } from "../../stateProvider";
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";
function Doctor() {
  const [cityName, ucity] = useState("");
  const [specialization, uspecialization] = useState("");
  const [{ doctor,user }, dispatch] = useStateValue();
  function handleSpec(event) {
    uspecialization(event.target.value);
  }
  function handleAppointment(ids){
    dispatch({
      type: "SET_DOCTOR",
      doctor:ids
    });
    
    
  }
  function Card(props) {
    
    return (
      <div className="card">
        <p type="text" id="my-city" Style="display:none;">
          {props.location}
        </p>
        <h5>{props.name}</h5>
        <p id="my-specialization" value={props.specialization}>
          {props.specialization}
        </p>
        <p>{props.location}</p>
       

         <Link to={user && "/finddoctor/appoint"}>
           <button onClick={() => handleAppointment(props.ids)}>
           {user? "book a appointment":"Login to book appointemnt "}
          </button>
        </Link> 
      </div>
    );
  }
  function handleDoctor(event) {
    event.preventDefault();
    var e = document.getElementById("city");
    var value = e.options[e.selectedIndex].value;
    ucity(value);

    const cards = document.querySelectorAll(".card");
    const cities = document.querySelectorAll("#my-city");
    const specs = document.querySelectorAll("#my-specialization");
    console.log(specs);
    let i = 0;
    if (cityName !== "" && specialization !== "") {
      cards.forEach((c) => {
        // console.log(cities[i].innerHTML);
        if (
          cities[i].innerHTML === cityName &&
          specs[i].innerHTML === specialization
        ) {
          c.classList.remove("hide");
        } else {
          c.classList.add("hide");
        }
        i += 1;
      });
      i = 0;
    } else if (cityName !== "") {
      cards.forEach((c) => {
        // console.log(cities[i].innerHTML);
        if (cities[i].innerHTML === cityName) {
          c.classList.remove("hide");
        } else {
          c.classList.add("hide");
        }
        i += 1;
      });
      i = 0;
    } else if (specialization !== "") {
      cards.forEach((c) => {
        console.log(specs[i].innerHTML);
        if (specs[i].innerHTML === specialization) {
          c.classList.remove("hide");
        } else {
          c.classList.add("hide");
        }
        i += 1;
      });
    }
  }
  return (
    <>
      <form>
        <label for="lang">specialization</label>
        <input type="text" onChange={handleSpec} />

        <select id="city">
          <option value="">select a city</option>
          <option value="kurnool">kurnool</option>
          <option value="banglore">banglore</option>
          <option value="hyderabad">hyderabad</option>
          <option value="mumbai">mumbai</option>
          <option value="chennai">chennai</option>
        </select>

        <button onClick={handleDoctor} type="submit">
          Search
        </button>
      </form>
      <div style={{display:"flex"}}>
        {doctors.map((doc) => (
          <Card
            ids={doc}
            name={doc.name}
            location={doc.location}
            specialization={doc.specialization}
            rating={doc.rating}
          />
        ))}
      </div>
    </>
  );
}

export default Doctor;
