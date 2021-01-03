import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
// import Select from "react-select";
import db from "../firebase";

function Search() {
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
      padding: 10,
    },
  }));

  const [datastore, setdatastore] = useState([]);
  useEffect(() => {
    const unsubscribe = db.collection("university")
    .get()
    .then((snapshot) =>
    setdatastore(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    )
    .catch(function(error) {
      alert("Error, Try again: ", error);
  })
  .finally(()=>{
    setisUnivesrityloaded(true);
  })
 
    return () => {
    
    };
  }, []);
  const classes = useStyles();
  const [universityId, setuniversityId] = useState(null);
  const [branchId, setbranchId] = useState(null);
  const [semId, setsemId] = useState(null);
  const [subId, setsubId] = useState(null);

  // const [university, setuniversity] = useState([]);
  const [branch, setbranch] = useState([]);
  const [semester, setsemester] = useState([]);
  const [subject, setsubject] = useState([]);
  const [year, setyear] = useState([])


  const [universityname, setuniversityname] = useState(null);
  const [branchname, setbranchname] = useState(null);
  const [semname, setsemname] = useState(null);
  const [subname, setsubname] = useState(null);
  // const [yearname, setyearname] = useState(null);

  const [isUnivesrityloaded, setisUnivesrityloaded] = useState(false)
  const [isBranchloaded, setisBranchloaded] = useState(false)
  const [isSemloaded, setisSemloaded] = useState(false) 
  const [isSubloaded, setisSubloaded] = useState(false)


  const [isSearchDisable, setisSearchDisable] = useState(true)


  function customTheme(theme) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "#3f51b5",
        primary: "#3f51b5",
      },
    };
  }
  const handleUniversityChange = (event) => {
    if(event.target.value){
      setisSearchDisable(true)
      setisBranchloaded(true)
    setuniversityname(event.target.value)
    var val = datastore.filter((item) => {
      return item.data.name === event.target.value;
    });
    setuniversityId(val[0].id);
    db.collection("university")
      .doc(val[0].id)
      .collection("branch")
      .get()
      .then((snapshot) =>
        setbranch(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      )
      .catch(function(error) {
        alert("Error, Try again: ", error);
    })
    .finally(()=>{
      setisBranchloaded(false)
    })
    // console.log("val", event.target.value);
  }
  };
  const handleBranchChange = (event) => {
    if(event.target.value){
      setisSearchDisable(true)
      setisSemloaded(true)
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
      .get()
      .then((snapshot) =>
        setsemester(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      )
      .catch(function(error) {
        alert("Error, Try again: ", error);
    })
    .finally(()=>{
      setisSemloaded(false);
    })
        }
  };
  const handleSemChange = (event) => {
    if(event.target.value){
      setisSearchDisable(true)
      setisSubloaded(true)
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
      .get()
      .then((snapshot) =>
        setsubject(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      )
      .catch(function(error) {
        alert("Error, Try again: ", error);
    })
    .finally(()=>{
      setisSubloaded(false)
    })
        }
  };
  const handlesubjectChange = (event) => {
    if(event.target.value){
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
      .get()
      .then((snapshot) =>
        setyear(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        ),
      )
      .catch(function(error) {
        alert("Error, Try again: ", error);
    })
    .finally(()=>{
      setisSearchDisable(false)
    })
        }
  };
  return (
    <Container
      maxWidth="md"
      style={{ backgroundColor: "lightgray", height: "90vh", paddingTop: 100 }}
    >
      <h1 style={{ textAlign: "center" }}>Select your university details</h1>
      <FormControl className={classes.formControl}>
        <h5>University</h5>
        <div className="upload_select">
        {!isUnivesrityloaded?
          <select>
          <option>Loading...</option>
          </select>
          :
        <select onChange={handleUniversityChange}>
        <option value="">--select--</option>
          {datastore.map((item, index) => {
            return (
              <option key={index} value={item.data.id}>
                {item.data.name}
              </option>
            );
          })}
        </select>}
        </div>
      </FormControl>
      <FormControl className={classes.formControl}>
        <h5>Branch</h5>
        <div className="upload_select">
        {isBranchloaded?
          <select>
          <option>Loading...</option>
          </select>
          :
        <select onChange={handleBranchChange}>
        <option value="">--select--</option>
          {branch.map((item, index) => {
            return (
              <option key={index} value={item.data.id}>
                {item.data.bname}
              </option>
            );
          })}
          {branch == ""?
          <option value="">Select Previous data or No data present currenty</option>
        : null}
        </select>

      }
        </div>
      </FormControl>
      <FormControl className={classes.formControl}>
        <h5>Year/Semester</h5>
        <div className="upload_select">

        {isSemloaded?
          <select>
          <option>Loading...</option>
          </select>
          :
        <select onChange={handleSemChange}>
        <option value="">--select--</option>
        {semester.map((item, index) => {
          return (
            <option key={index} value={item.data.id}>
              {item.data.sem}
            </option>
          );
        })}
          {semester == ""?
          <option value="">Select Previous data or No data present currenty</option>
        : null}
        </select>

      }
        </div>
      </FormControl>
      <FormControl className={classes.formControl}>
        <h5>Subject</h5>
        <div className="upload_select">
        {isSubloaded?
          <select>
          <option>Loading...</option>
          </select>
          :
        <select onChange={handlesubjectChange}>
        <option value="">--select--</option>
        {subject.map((item, index) => {
          return (
            <option key={index} value={item.data.id}>
              {item.data.sname}
            </option>
          );
        })}
          {subject == ""?
          <option value="">Select Previous data or No data present currenty</option>
        : null}
        </select>
      }

        </div>
      </FormControl>
      {/*<FormControl className={classes.formControl}>
      <h5>Year</h5>
      <Select
theme={customTheme}
      //value={selected}
      onChange={handleChange}
      options={Year}
  />
 
      </FormControl>*/}

      <FormControl className={classes.formControl}>
    
          <Button
            variant="contained"
            color="primary"
            disabled={isSearchDisable}
            component={Link}  to={{
              pathname: "/qp",
              state: { universityname, branchname, subname, semname, year, universityId, branchId, semId, subId },
            }}
            style={{
              display: "flex",
              paddingRight: "auto",
              paddingLeft: "auto",
              width: "100%",
            }}
          >
            Search
          </Button>
   
      </FormControl>
    </Container>
  );
}

export default Search;
