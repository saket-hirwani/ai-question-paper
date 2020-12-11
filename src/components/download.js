import React,{useEffect, useState} from 'react'
import {Link, useLocation} from "react-router-dom";
import db from "../firebase";

function DownloadFile() {
    let location = useLocation();
    const [filelink, setfilelink] = useState([])
    useEffect(() => {
        console.log(location)
    db.collection("university")
      .doc(location.state.universityId)
      .collection("branch")
      .doc(location.state.branchId)
      .collection("semester")
      .doc(location.state.semId)
      .collection("subject")
      .doc(location.state.subId)
      .collection("year")
      .doc(location.state.yearId)
      .collection("link")
      .onSnapshot((snapshot) =>
      setfilelink(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        ),
        
      );
        return () => { 
        }
    }, [])
return(
<div style={{marginTop:100,textAlign:'center'}}>

{filelink.map((item, index) => {
    return (
      <p key={index} value={item.data.id} style={{padding:10}}>
      <a href={item.data.link} rel="noopener noreferrer" target="_blank">
      <button style={{border:'none', padding:10, backgroundColor:'#3f51b5', color:'#fff', borderRadius:10, fontSize:20, outline:'none'}}>view file</button>
    </a>
      </p>
     
    );
  })}
</div>
)
}

export default DownloadFile;