import "./records.css"
import { useState, useEffect } from "react";
import { storage } from "./firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
  list,
} from "firebase/storage";
import { useStateValue } from "./stateProvider";
import { doc, updateDoc, arrayUnion,arrayRemove,getDoc  } from "firebase/firestore";
import {db} from "./firebase.js";
import { saveAs } from 'file-saver'
export default function HealthRecords() {
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [{ user }, dispatch] = useStateValue();
  const [files, setFiles] = useState([]);
  const [comment,setComment]=useState();

  useEffect(() => 
  {
    getDoc(doc(db, "users", user.email)).then(docSnap => 
      {
      if (docSnap.exists()) {
        console.log("Document data:",);
        console.log(docSnap.data());
        const k=docSnap.data().healthdoc;
        
          setFiles(k);
      }
      
    })
   
  }, );
  function handleDownload(event) {
    event.preventDefault();
    saveAs( event.target.value,'image_url'); 
  }
  const handleSubmit = (e) => 
  {
    e.preventDefault();
    const file = e.target[0]?.files[0];

    if (!file) return;
    const storageRef = ref(storage, `${user.email}2/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
          const Ref = doc(db, "users", user.email);
            const newup={
              url:downloadURL,
              date:new Date().toLocaleString(), 
              comm:comment
            }
           updateDoc(Ref, {
            healthdoc: arrayUnion(newup)|| null,
          
          });
        });
      }
    );
  };

  return (
    <div  style={{height:"50vh",background:"linear-gradient(18deg,#E6FFFD,#AEE2FF,#ACBCFF,#B799FF)"}}>
      <h3 style={{textAlign:"center",fontSize:"40px",
                  marginTop:"5%",
                  marginBottom:"5%"}}><b>Manage your health records, you can upload  your health records or can download them.</b></h3>
                  <form style={{backgroundColor:"white",color:"blue"}}onSubmit={handleSubmit} className="form">
        <input type="file" />
        
        <label>Add a comment</label>
        <textarea style={{marginBottom:"4%"}}value={comment}  onChange={e=>setComment(e.target.value)}  />
        <button type="submit">Upload</button>
      </form>
      {!imgUrl && (
        <div className="outerbar">
          <div className="innerbar" style={{ width: `${progresspercent}%` }}>
            {progresspercent}%
          </div>
        </div>
      )}
      <div style={{width:"400px",height:"200px",margin:"20px"}}>
        {files?.map((val) => {
          return (
            <div className="user-card">
              <div className="container">
                <img src={val.url} className="user-img" alt="photo" />
                <button className="btn" value={val.url} onClick={handleDownload}>Download</button>
              </div>
              <h4> updated on: {val.date}</h4>
              <h4>comment : {val.comm}</h4> 
            </div>
          );
        })}
      </div>
    </div>
  );
}