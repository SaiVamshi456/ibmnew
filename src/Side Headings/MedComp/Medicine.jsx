import { useState } from "react";
import datas from "./MedData";
import "./Medicine.css";
export default function Medicine(){

    const [inp,setInp] = useState("");
    const [det,setDetails] = useState("Enter the Disease you are suffering from and get relief with the suggestions given");

    const dis= ["fever","cold","cough"];

    function handleMed(event){
        setInp(event.target.value);
    }

    function handleClick(){
        var i=0;
        for(i=0;i<datas.length;i++){
            if(datas[i].disease===inp){
                setDetails(datas[i].medicine);
                setInp("");
                return;
            }
        }
        setDetails("Medicines cannot cure this Disease")
        setInp("");
    }

    return(
        <div className="med">
            <div className="div-top">
                <p>We are Here to Clear your medical doubts<br/>
                Ask our chat bot to clear your doubts and know the related answer.
                </p>
            </div>
            <div className="div-bottom">
                <div className="div-bottom-div">
                    <input type="text" onChange={handleMed} placeholder="Enter the disease you are suffering from" value={inp}/>
                    <button onClick={handleClick} type="submit">Submit</button>
                </div>
                <h1>{det}</h1>
            </div>
        </div>
    )
}