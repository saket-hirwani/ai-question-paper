import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import db from "../firebase";

function Verify() {
  let location = useLocation();
  const [isloaded, setisloaded] = useState(false);
  const [filelink, setfilelink] = useState([]);
  useEffect(() => {
    // console.log(location)
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
      .where("isverifed", "==", false)
      .onSnapshot((snapshot) =>
        setfilelink(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
        setisloaded(true)
      ))
    // });
    //   .get()
    //   .then((snapshot) =>
    //     setfilelink(
    //       snapshot.docs.map((doc) => ({
    //         id: doc.id,
    //         data: doc.data(),
    //       }))
    //     )
    //   )
    //   .catch(function (error) {
    //     alert("Error getting documents: ", error);
    //   })
    //   .finally(() => {
    //     setisloaded(true);
    //   });

    // .onSnapshot((snapshot) =>
    // setfilelink(
    //     snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       data: doc.data(),
    //     }))
    //   ),

    // )
    // .then(()=>{
    //   console.log("done");
    // });
    return () => {};
  }, [
    location.state.branchId,
    location.state.semId,
    location.state.subId,
    location.state.universityId,
    location.state.yearId,
  ]);

  const verify = (linkid) => {
    //   console.log(linkid)
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
      .doc(linkid)
      .update({
        isverifed: true,
      })
      .then(function () {
        alert("Document successfully updated!");
      });

      db.collection("verify").doc(location.state.id).update(
          {isverified:true}
      )
  };
  if (!isloaded) {
    return (
      <div style={{ marginTop: 100, textAlign: "center" }}>
        <p>Loading..</p>
      </div>
    );
  } else if (filelink == "") {
    return (
      <div style={{ marginTop: 100, textAlign: "center" }}>
        <p>All set, Nothing to verify.</p>
      </div>
    );
  } else {
    return (
      <div style={{ marginTop: 80, textAlign: "center" }}>
        {filelink.map((item, index) => {
          return (
            <div>
           
            <p key={index} value={item.data.id} style={{ padding: 10 }}>
            <a href={item.data.link} rel="noopener noreferrer" target="_blank">
                  <button  style={{
                  border: "none",
                  padding: 10,
                  backgroundColor: "#3f51b5",
                  color: "#fff",
                  borderRadius: 10,
                  fontSize: 20,
                  outline: "none",
                  marginRight:10,
                }}>view file</button>
                </a>
              <button
                style={{
                  border: "none",
                  padding: 10,
                  backgroundColor: "green",
                  color: "#fff",
                  borderRadius: 10,
                  fontSize: 20,
                  outline: "none",
                }}
                onClick={()=>verify(item.id)}
              >
                verify
              </button>
            </p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Verify;
