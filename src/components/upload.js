import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Button,
  Modal,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from "@material-ui/core/CircularProgress";
import DoneIcon from "@material-ui/icons/Done";
import Tesseract from "tesseract.js";

import db, { storage } from "../firebase";
const Uplaod = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
    width: '100%',
  },
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
  const [progress, setProgress] = React.useState(0);
  const src = "sample.png";

  const ocrFunction = () => {
    Tesseract.recognize(OcrImage, "eng", { logger: (m) =>  {(m.status == "recognizing text")? setProgress(m.progress*100):setProgress(0)} })
      .then(({ data: { text } }) => {
        // console.log(text);
        setResText(text);
      })
      .catch((e) => console.log(e));
  };

  function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

  useEffect(() => {
    // ocrFunction();


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
  const [linkId, setlinkId] = useState(null);

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

  const [isBranchLoaded, setisBranchLoaded] = useState(true);

  const [OcrImage, setOcrImage] = useState(null);
  const [resText, setResText] = useState();

  const [ShowScan, setShowScan] = useState(false);
  const [ShowUpload, setShowUpload] = useState(false);

  const handleUniversityChange = (event) => {
    setisBranchLoaded(false); ////
    setisBranchdisabled(false);
    setisSemdisabled(true);
    setisSubdisabled(true);
    setisYeardisabled(true);
    setisUplaoddisabled(true);
    setuniversityname(event.target.value);
    var val = datastore.filter((item) => {
      return item.data.name === event.target.value;
    });
    setuniversityId(val[0].id);
    db.collection("university")
      .doc(val[0].id)
      .collection("branch")
      .onSnapshot(
        (snapshot) =>
          setbranch(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          ),
        setisBranchLoaded(true)
      );
    // console.log("val", event.target.value);
  };
  const handleBranchChange = (event) => {
    setisSemdisabled(false);
    setisSubdisabled(true);
    setisYeardisabled(true);
    setisUplaoddisabled(true);
    setbranchname(event.target.value);
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
      );
  };
  const handleSemChange = (event) => {
    setisSubdisabled(false);
    setisYeardisabled(true);
    setisUplaoddisabled(true);
    setsemname(event.target.value);
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
    setisYeardisabled(false);
    setisUplaoddisabled(true);
    setsubname(event.target.value);
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
    setisUplaoddisabled(false);
    setyearname(event.target.value);
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
    if (universityId && branchId && semId && subId && yearId) {
      // console.log(universityId, branchId, semId, subId, yearId);
      setisShow(true);
      var today = new Date();
      var todaytime =
        today.getHours().toLocaleString() +
        today.getMinutes().toLocaleString() +
        today.getSeconds().toLocaleString();
      const upload = storage.ref(`Papers/${file.name}`).put(file);
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
            .ref("Papers")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              seturl(url);
              addFileLink(url);
            });
        }
      );
    } else {
      alert("Please Select all sections..");
    }
  };

  const verifybtn = () => {
    // const [universityId, setuniversityId] = useState(null);
    // const [branchId, setbranchId] = useState(null);
    // const [semId, setsemId] = useState(null);
    // const [subId, setsubId] = useState(null);
    // const [yearId, setyearId] = useState(null);

    if ((universityId, branchId, semId, subId, yearId, linkId)) {
      db.collection("verify")
        .add({
          name: universityname,
          universityId: universityId,
          branchId: branchId,
          semId: semId,
          subId: subId,
          yearId: yearId,
          linkId: linkId,
          isverified: false,
        })
        .then(() => {
          alert("Successfully send for verification.");
        });
    } else {
      alert("Please fill all details!!");
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
    // console.log("link", link);
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
          isverifed: false,
        })
        .then(function (docRef) {
          setlinkId(docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding link: ", error);
        });
    }
  };

  const Scan = () => {
    return (
      <FormControl className={classes.formControl}>
      <div style={{ width: "100%", height: "100%" }}>
        <h1 style={{ textAlign: "center" }}>Upload Question</h1>
        <h3 style={{ textAlign: "center" }}>
          Enter your question or scan an image
        </h3>
        <div
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
            backgroundColor: "white",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#dedede",
              width: "100%",
              height: "100%",
              alignContent: "center",
            }}
          >
            <div style={{ height: 10, width: "100%" }} />
            <div
              style={{
                display: "flex",
                flex: 4,
                height: "70%",
                borderWidth: 10,
                borderColor: "black",
                borderRadius: 10,
                backgroundColor: "white",
                marginInline: 10,
              }}
            >
              {/* =========================textArea=============================== */}

              <TextareaAutosize
                placeholder="enter your question here"
                rows={5}
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
                value={resText}
                onChange={(event) => setResText(event.target.value)}
              />
              {/* <input type="textarea" name="edited_text" value={resText} rowsMax={10} style={{width:'98%'}} /> */}
            </div>
            <div
              style={{
                flex: 1,
                marginInline: 10,
                marginTop: 10,
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p style={{}}> Scan an image for question </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setOcrImage(e.target.files[0]);
                  }
                }}
              />
              <button
                style={{ marginTop: "1.5%", fontSize: 18, width: "40%" }}
                onClick={() => ocrFunction()}
                disabled={OcrImage == null}
              >
                Scan
              </button>
              <div className={classes.root}>
              <LinearProgressWithLabel value={progress} />
              </div>
              <button
                style={{
                  marginTop: "1.5%",
                  fontSize: 18,
                  backgroundColor: "red",
                  color: "white",
                  width: "40%",
                }}
                onClick={() => console.log(resText)}
              >
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
      </FormControl>
    );
  };

  const Upload = () => {
    return (
      <FormControl className={classes.formControl}>
        <h5 style={{ marginBottom: 5 }}>Upload</h5>
        <div className="upload_button">
          <input type="file" onChange={handleFileChange} style={{}} />
          <button onClick={handleupload} disabled={isUplaoddisabled}>
            Uplaod
          </button>
          {isShow ? (
            uploadprogress === 100 ? (
              <div>
                <DoneIcon />
                <a href={url} rel="noopener noreferrer" target="_blank">
                  <button>view file</button>
                </a>
              </div>
            ) : (
              <div>
                <p>{uploadprogress}% completed</p>
                <CircularProgress
                  variant="determinate"
                  value={uploadprogress}
                />
              </div>
            )
          ) : null}
        </div>
      </FormControl>
    );
  };

  return (
    <Container maxWidth="lg" className="container-inside">
      <div style={{ width: "100%" }}>
        <h1 style={{ textAlign: "center" }}>Upload Question Paper</h1>
        <h3 style={{ textAlign: "center" }}>Select your university details</h3>
        <FormControl className={classes.formControl}>
          <h5>University</h5>
          <div className="upload_select">
            {datastore == "" ? (
              <select>
                <option>Loading...</option>
              </select>
            ) : (
              <select onChange={handleUniversityChange}>
                <option>--select--</option>
                {datastore.map((item, index) => {
                  return (
                    <option key={index} value={item.data.id}>
                      {item.data.name}
                    </option>
                  );
                })}
              </select>
            )}
            <div className="add_button">
              <button onClick={adduniversity}>+</button>
              <p>add university</p>
            </div>
          </div>
        </FormControl>

        <FormControl className={classes.formControl}>
          <h5>Branch</h5>
          <div className="upload_select">
            {!isBranchLoaded ? (
              <select disabled={isBranchdisabled}>
                <option>Loading...</option>
              </select>
            ) : (
              <select onChange={handleBranchChange} disabled={isBranchdisabled}>
                <option>--select--</option>
                {branch.map((item, index) => {
                  return (
                    <option key={index} value={item.data.id}>
                      {item.data.bname}
                    </option>
                  );
                })}
              </select>
            )}
            <div className="add_button">
              <button onClick={addbranch} disabled={isBranchdisabled}>
                +
              </button>
              <p>add Branch</p>
            </div>
          </div>
        </FormControl>

        <FormControl className={classes.formControl}>
          <h5>Year/Semester</h5>
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
              <button onClick={addsemester} disabled={isSemdisabled}>
                +
              </button>
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
              <button onClick={addsubject} disabled={isSubdisabled}>
                +
              </button>
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
              <button onClick={addyear} disabled={isYeardisabled}>
                +
              </button>
              <p>add Year</p>
            </div>
          </div>
        </FormControl>

        <FormControl className={classes.formControl}>
          <div className="btn-inline">
            <Button
              variant="contained"
              color="primary"
              onClick={() => [setShowScan(false), setShowUpload(true)]}
              style={{
                width: "40%",
              }}
            >
              PDF Mode
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => [setShowScan(true), setShowUpload(false)]}
              style={{
                width: "40%",
              }}
            >
              Scan Mode
            </Button>
          </div>
        </FormControl>
        {ShowScan ? <Scan /> : null}

        {ShowUpload ? <Upload /> : null}

        <FormControl className={classes.formControl}>
          <Button
            variant="contained"
            color="secondary"
            onClick={verifybtn}
            style={{
              display: "flex",
              paddingRight: "auto",
              paddingLeft: "auto",
              width: "100%",
            }}
          >
            Send to verify
          </Button>
        </FormControl>
      </div>
      <div style={{ marginTop: "10%", marginRight: 40, marginLeft: -20 }}>
        Or
      </div>
    </Container>
  );
};

export default Uplaod;
