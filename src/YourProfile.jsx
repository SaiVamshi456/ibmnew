import User from "./User";
import "./yourprofile.css";
import { useState } from "react";
export default function YourProfile(){

    const [pro,setPro] = useState(<HomeUser/>);
    const [name, setName] = useState("username");
    const [pass, setPass] = useState("password");

    function HomeUser(){
        return(
            <form>
                <h2>Name: {name} </h2>
                <h2>Password: {pass}</h2>
                <button type="submit">Submit</button>
            </form>
        )
    }

    function handleName(event) {
        setName(event.target.value);
    }
    function handlePass(event) {
        setPass(event.target.value);
    }



    function handleHome(){
        setPro(<HomeUser/>);
    }
    function handleProfile(){
        setPro(<HomeUser/>);
    }
    function handleFiles(){
        setPro(<User/>);
    }

    function Settings(){
        return (
            <div>
              <div>
                <h2>Name:</h2>
                <input type="text" placeholder={name} onChange={handleName} />
              </div>
              <div>
                <h2>Password:</h2>
                <input type="text" placeholder={pass} onChange={handlePass} />
              </div>
            </div>
          );
    }

    function handleSettings(){
        setPro(<Settings/>);
    }

    return(
        <div className="pro">
            <div className="mennu">
                <button onClick={handleHome}>Home</button>
                <button onClick={handleProfile}>Profile</button>
                <button onClick={handleFiles}>Files</button>
                <button onClick={handleSettings}>Settings</button>
            </div>
            <div className="deta">
                {pro}
            </div>
        </div>
    )
}