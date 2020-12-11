import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "react-select";
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
  const classes = useStyles();
  const [universityId, setuniversityId] = useState(null);
  const [branchId, setbranchId] = useState(null);
  const [semId, setsemId] = useState(null);
  const [subId, setsubId] = useState(null);

  const [university, setuniversity] = useState([]);
  const [branch, setbranch] = useState([]);
  const [semester, setsemester] = useState([]);
  const [subject, setsubject] = useState([]);
  const [year, setyear] = useState([])


  const [universityname, setuniversityname] = useState(null);
  const [branchname, setbranchname] = useState(null);
  const [semname, setsemname] = useState(null);
  const [subname, setsubname] = useState(null);
  // const [yearname, setyearname] = useState(null);
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
    setuniversityname(event.target.value)
    var val = datastore.filter((item) => {
      return item.data.name == event.target.value;
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
        )
      );
    console.log("val", event.target.value);
  };
  const handleBranchChange = (event) => {
    setbranchname(event.target.value)
    var val = branch.filter((item) => {
      return item.data.bname == event.target.value;
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
    setsemname(event.target.value)
    var val = semester.filter((item) => {
      return item.data.sem == event.target.value;
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
    setsubname(event.target.value)
    var val = subject.filter((item) => {
      return item.data.sname == event.target.value;
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
        ),
        
      );
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
        </div>
      </FormControl>
      <FormControl className={classes.formControl}>
        <h5>Branch</h5>
        <div className="upload_select">
        <select onChange={handleBranchChange}>
        <option>--select--</option>
          {branch.map((item, index) => {
            return (
              <option key={index} value={item.data.id}>
                {item.data.bname}
              </option>
            );
          })}
        </select>
        </div>
      </FormControl>
      <FormControl className={classes.formControl}>
        <h5>Semester</h5>
        <div className="upload_select">
        <select onChange={handleSemChange}>
        <option>--select--</option>
          {semester.map((item, index) => {
            return (
              <option key={index} value={item.data.id}>
                {item.data.sem}
              </option>
            );
          })}
        </select>
        </div>
      </FormControl>
      <FormControl className={classes.formControl}>
        <h5>Subject</h5>
        <div className="upload_select">
        <select onChange={handlesubjectChange}>
        <option>--select--</option>
          {subject.map((item, index) => {
            return (
              <option key={index} value={item.data.id}>
                {item.data.sname}
              </option>
            );
          })}
        </select>
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
        <Link
          to={{
            pathname: "/qp",
            state: { universityname, branchname, subname, semname, year, universityId, branchId, semId, subId },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{
              display: "flex",
              paddingRight: "auto",
              paddingLeft: "auto",
              width: "100%",
            }}
          >
            Search
          </Button>
        </Link>
      </FormControl>
    </Container>
  );
}

export default Search;
