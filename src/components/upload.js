import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CircularProgress from "@material-ui/core/CircularProgress";
import DoneIcon from "@material-ui/icons/Done";

import db, { storage } from "../firebase";
function Uplaod() {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      // minWidth: 120,
      textAlign: "center",
      display: "flex",
      marginLeft: "auto",
      marginRight: "auto",
      width: "70%",
      backgroundColor: "white",
      borderRadius: 5,
      padding: 5,
      //margin:0
    },
  }));

  const classes = useStyles();
  const [datastore, setdatastore] = useState([]);
  useEffect(() => {
    const unsubscribe = db.collection("university").onSnapshot((snapshot) =>
      setdatastore(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);
  const [universityId, setuniversityId] = useState(null);
  const [branchId, setbranchId] = useState(null);
  const [semId, setsemId] = useState(null);
  const [subId, setsubId] = useState(null);
  const [yearId, setyearId] = useState(null);

  const [universityname, setuniversityname] = useState(null);
  const [branchname, setbranchname] = useState(null);
  const [semname, setsemname] = useState(null);
  const [subname, setsubname] = useState(null);
  const [yearname, setyearname] = useState(null);

  // const [university, setuniversity] = useState([]);
  const [branch, setbranch] = useState([]);
  const [semester, setsemester] = useState([]);
  const [subject, setsubject] = useState([]);
  const [year, setyear] = useState([]);
  const [file, setfile] = useState(null);
  const [uploadprogress, setuploadprogress] = useState(0);
  const [url, seturl] = useState(null);
  const [isShow, setisShow] = useState(false);

  const [isBranchdisabled, setisBranchdisabled] = useState(true);
  const [isSemdisabled, setisSemdisabled] = useState(true);
  const [isSubdisabled, setisSubdisabled] = useState(true);
  const [isYeardisabled, setisYeardisabled] = useState(true);
  const [isUplaoddisabled, setisUplaoddisabled] = useState(true);

  const [isBranchLoaded, setisBranchLoaded] = useState(false);

  

  const handleUniversityChange = (event) => {
    setisBranchdisabled(false)
    setuniversityname(event.target.value)
    var val = datastore.filter((item) => {
      return item.data.name === event.target.value;
    });
    setuniversityId(val[0].id);
    db.collection("university")
      .doc(val[0].id)
      .collection("branch")
      .onSnapshot((snapshot) =>
        setbranch(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        ),
        setisBranchLoaded(true)
      )
    // console.log("val", event.target.value);
  };
  const handleBranchChange = (event) => {
    setisSemdisabled(false)
    setbranchname(event.target.value)
    var val = branch.filter((item) => {
      return item.data.bname === event.target.value;
    });
    setbranchId(val[0].id);
    db.collection("university")
      .doc(universityId)
      .collection("branch")
      .doc(val[0].id)
      .collection("semester")
      .onSnapshot((snapshot) =>
        setsemester(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      )
  };
  const handleSemChange = (event) => {
    setisSubdisabled(false)
    setsemname(event.target.value)
    var val = semester.filter((item) => {
      return item.data.sem === event.target.value;
    });
    setsemId(val[0].id);
    db.collection("university")
      .doc(universityId)
      .collection("branch")
      .doc(branchId)
      .collection("semester")
      .doc(val[0].id)
      .collection("subject")
      .onSnapshot((snapshot) =>
        setsubject(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  };
  const handlesubjectChange = (event) => {
    setisYeardisabled(false)
    setsubname(event.target.value)
    var val = subject.filter((item) => {
      return item.data.sname === event.target.value;
    });
    setsubId(val[0].id);
    db.collection("university")
      .doc(universityId)
      .collection("branch")
      .doc(branchId)
      .collection("semester")
      .doc(semId)
      .collection("subject")
      .doc(val[0].id)
      .collection("year")
      .onSnapshot((snapshot) =>
        setyear(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  };

  const handleyearChange = (event) => {
    setisUplaoddisabled(false)
    setyearname(event.target.value)
    var val = year.filter((item) => {
      return item.data.year === event.target.value;
    });
    setyearId(val[0].id);
    // db.collection('university').doc(universityId).collection('branch').doc(branchId).collection('semester').doc(semId).collection('subject').doc(val[0].id).collection('year').onSnapshot(snapshot=>(
    //   setyear(snapshot.docs.map(doc=>(
    //         {
    //             id: doc.id,
    //             data: doc.data(),
    //           }
    //           )))
    //           ))
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setfile(e.target.files[0]);
      // console.log("file", e.target.files[0]);
    }
  };



  const handleupload = () => {
    if(universityId && branchId && semId && subId && yearId){
      console.log(universityId,branchId,semId,subId,yearId)
    setisShow(true)
    var today = new Date();
    var todaytime =
      today.getHours().toLocaleString() +
      today.getMinutes().toLocaleString() +
      today.getSeconds().toLocaleString();
    const upload = storage.ref(`images/${file.name}`).put(file);
    upload.on(
      "state_changed",
      (snapshot) => {
        setuploadprogress(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            seturl(url)
            addFileLink(url)
          });
      }
    );
    }
    else{
      alert("Please Select all sections..")
    }
  };

  const adduniversity = () => {
    const universityname = prompt("enter university");
    if (universityname) {
      db.collection("university").add({
        name: universityname,
      });
    }
  };

  const addbranch = () => {
    const branchname = prompt("enter branch");
    if (branchname) {
      db.collection("university").doc(universityId).collection("branch").add({
        bname: branchname,
      });
    }
  };

  const addsemester = () => {
    const semestername = prompt("enter semester");
    if (semestername) {
      db.collection("university")
        .doc(universityId)
        .collection("branch")
        .doc(branchId)
        .collection("semester")
        .add({
          sem: semestername,
        });
    }
  };

  const addsubject = () => {
    const subjectname = prompt("enter subject");
    if (subjectname) {
      db.collection("university")
        .doc(universityId)
        .collection("branch")
        .doc(branchId)
        .collection("semester")
        .doc(semId)
        .collection("subject")
        .add({
          sname: subjectname,
        });
    }
  };

  const addyear = () => {
    const yearname = prompt("enter Exam Year");
    if (yearname) {
      db.collection("university")
        .doc(universityId)
        .collection("branch")
        .doc(branchId)
        .collection("semester")
        .doc(semId)
        .collection("subject")
        .doc(subId)
        .collection("year")
        .add({
          year: yearname,
        });
    }
  };

  const addFileLink = (link) => {
    console.log("link",link);
    if (link) {
      db.collection("university")
        .doc(universityId)
        .collection("branch")
        .doc(branchId)
        .collection("semester")
        .doc(semId)
        .collection("subject")
        .doc(subId)
        .collection("year")
        .doc(yearId)
        .collection("link")
        .add({
          link: link,
        });
    }
  };
  return (
    <Container
      maxWidth="md"
      style={{ backgroundColor: "lightgray", height: "90vh", paddingTop: 10 }}
    >
      <h1 style={{ textAlign: "center" }}>Select your university details</h1>
      <FormControl className={classes.formControl}>
        <h5>University</h5>
        <div className="upload_select">
        <select onChange={handleUniversityChange}>
        {datastore?
          <>
          <option>--select--</option>
          {datastore.map((item, index) => {
            return (
              <option key={index} value={item.data.id}>
                {item.data.name}
              </option>
            );
          })}
          </>
          :<option>Loading...</option>
        }
        </select>
        <div className="add_button">
        <button onClick={adduniversity}>+</button>
        <p>add university</p>
        </div>
        </div>
      </FormControl>

      <FormControl className={classes.formControl}>
        <h5>Branch</h5>
        <div className="upload_select">
        <select onChange={handleBranchChange} disabled={isBranchdisabled}>
        {isBranchLoaded?
          <>
          <option>--select--</option>
          {branch.map((item, index) => {
            return (
              <option key={index} value={item.data.id}>
                {item.data.bname}
              </option>
            );
          })}
          </>
          :<option>Loading...</option>
        }
        </select>
        <div className="add_button">
        <button onClick={addbranch} disabled={isBranchdisabled}>+</button>
        <p>add Branch</p>
        </div>
        </div>
      </FormControl>

      <FormControl className={classes.formControl}>
        <h5>Semester</h5>
        <div className="upload_select">
        <select onChange={handleSemChange} disabled={isSemdisabled}>
          <option>--select--</option>
          {semester.map((item, index) => {
            return (
              <option key={index} value={item.data.id}>
                {item.data.sem}
              </option>
            );
          })}
        </select>
        <div className="add_button">
        <button onClick={addsemester} disabled={isSemdisabled}>+</button>
        <p>add Semester</p>
        </div>
        </div>
      </FormControl>

      <FormControl className={classes.formControl}>
        <h5>Subject</h5>
        <div className="upload_select">
        <select onChange={handlesubjectChange} disabled={isSubdisabled}>
          <option>--select--</option>
          {subject.map((item, index) => {
            return (
              <option key={index} value={item.data.id}>
                {item.data.sname}
              </option>
            );
          })}
        </select>
        <div className="add_button">
        <button onClick={addsubject} disabled={isSubdisabled}>+</button>
        <p>add Subject</p>
        </div>
        </div>
      </FormControl>

      <FormControl className={classes.formControl}>
        <h5>Exam Year</h5>
        <div className="upload_select">
        <select onChange={handleyearChange} disabled={isYeardisabled}>
          <option>--select--</option>
          {year.map((item, index) => {
            return (
              <option key={index} value={item.data.id}>
                {item.data.year}
              </option>
            );
          })}
        </select>
        <div className="add_button">
        <button onClick={addyear} disabled={isYeardisabled}>+</button>
        <p>add Year</p>
        </div>
        </div>
      </FormControl>

      <FormControl className={classes.formControl}>
        <h5 style={{marginBottom:5}}>Upload</h5>
        <div className="upload_button">
        <input type="file" onChange={handleFileChange} style={{}} />
        <button onClick={handleupload} disabled={isUplaoddisabled}>Uplaod</button>
        {isShow?
          (uploadprogress === 100 ? (
          <div>
            <DoneIcon />
            <a href={url} rel="noopener noreferrer" target="_blank">
              <button>view file</button>
            </a>
          </div>
        ) : (<div><p>{uploadprogress}% completed</p>
          <CircularProgress variant="determinate" value={uploadprogress} />
        </div>  
        )):null
      }
      </div>
      </FormControl>

      <FormControl className={classes.formControl}>
        <Link to="/qp">
          <Button
            variant="contained"
            color="secondary"
            style={{
              display: "flex",
              paddingRight: "auto",
              paddingLeft: "auto",
              width: "100%",
            }}
          >
            Send to verify
          </Button>
        </Link>{" "}
      </FormControl>
    </Container>
  );
}

export default Uplaod;
