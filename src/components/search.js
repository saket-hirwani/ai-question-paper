import React , {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { Container, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from 'react-select';
import db from '../firebase'; 

function Search() {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      // minWidth: 120,
      textAlign: "center",
      display: "flex",
      marginLeft: "auto",
      marginRight: "auto",
      width: "80%",
      backgroundColor: "white",
      borderRadius: 5,
      padding: 10,
    },
  }));

  const University = [
    { value: 'csvtu', label: 'CSVTU' },
    { value: 'DurgUniversity', label: 'Durg University' },
    { value: 'PRSU', label: 'PRSU' },
  ];
  const Branch = {
    "csvtu":[
    { value: 'CSE', label: 'CSE' },
    { value: 'IT', label: 'IT' },
    { value: 'CIVIL', label: 'CIVIL' },
    { value: 'MECH', label: 'MECH' },
    { value: 'ETC', label: 'ETC' },
    { value: 'EEE', label: 'EEE' },
  ],
  "DurgUniversity":[
    { value: 'bsc', label: 'B.Sc.' },
    { value: 'ba', label: 'B.A.' },
    { value: 'bcom', label: 'B.Com.' },
  ],
  "PRSU":[
    { value: 'bsc', label: 'B.Sc.' },
    { value: 'ba', label: 'B.A.' },
    { value: 'bcom', label: 'B.Com.' },
  ]
}
  const Semester = 
  {
    "csvtu":[
    { value: '1', label: '1st' },
    { value: '2', label: '2nd' },
    { value: '3', label: '3rd' },
    { value: '4', label: '4th' },
    { value: '5', label: '5th' },
    { value: '6', label: '6th' },
    { value: '7', label: '7th' },
    { value: '8', label: '8th' },
  ],
  "DurgUniversity":[
    { value: '1', label: '1st year' },
    { value: '2', label: '2nd year' },
    { value: '3', label: '3rd year' },
  ],
  "PRSU":[
    { value: '1', label: '1st year' },
    { value: '2', label: '2nd year' },
    { value: '3', label: '3rd year' },
  ]
}

  const Subject =[
    { value: 'Data Sturcture', label: 'Data Sturcture' },
    { value: 'C++', label: 'C++' },
    { value: 'C', label: 'C' },
    { value: 'Java', label: 'Java' },
  ];

  // const Year =[
  //   { value: '2020-June', label: '2020-June' },
  //   { value: '2019-Dec', label: '2019-Dec' },
  //   { value: '2019-June', label: '2019-June' },
  //   { value: '2018-June', label: '2018-June' },
  //   { value: '2018-June', label: '2018-June' },
  //   { value: '2018-Dec', label: '2018-Dec' },
  //   { value: '2017-June', label: '2017-June' },
  //   { value: '2017-Dec', label: '2017-Dec' },
  //   { value: '2016-Dec', label: '2016-Dec' },
  // ];
  const [datastore, setdatastore] = useState([]);
  useEffect(() => {
    const unsubscribe = db.collection('university').onSnapshot(snapshot=>(
      setdatastore(snapshot.docs.map(doc=>(
            {
                id: doc.id,
                data: doc.data(),
              }
              )))
              ))

        //       db.collection('names').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot((snapshot)=>
        // setmessages(
        //     snapshot.docs.map((doc)=>doc.data())
        // ));
console.log("datastore",datastore)
    
    return () => {
        unsubscribe();
    }
}, [])
console.log("datastore",datastore)
  const classes = useStyles();
  const [university, setuniversity] = useState([])
  const [branch, setbranch] = useState([])
  const [semester, setsemester] = useState([])
  const [subject, setsubject] = useState([])
  
 
  // const [fname, setfname] = useState("saket")
  function customTheme(theme){
    return{
      ...theme,
      colors : {
        ...theme.colors,
        primary25: "#3f51b5",
        primary:'#3f51b5',
      }
    }
  }
  const handleUniversityChange = selected => {
    var data = selected.value
    setuniversity(data);
    // console.log(university)
  };
  const handleBranchChange = selected => {
    var data = selected.value
    setbranch(data);
    // console.log(university)
  };
  const handleSemChange = selected => {
    var data = selected.value
    setsemester(data);
    // console.log(university)
  };
  const handlesubjectChange = selected => {
    var data = selected.value
    setsubject(data);
    // console.log(university)
  };
 
  const InsideBranch = Branch[university];
  const InsideSemester = Semester[university]
  const InsideSubject = Subject
  return (
    <Container
      maxWidth="md"
      style={{ backgroundColor: "lightgray", height: '90vh' ,paddingTop:100}}
    >
    <h1 style={{textAlign:'center'}}>Select your university details</h1>
      <FormControl className={classes.formControl}>
        <h5>University</h5>
        <Select
        theme={customTheme}
        // value={university}
        onChange={handleUniversityChange}
        // cacheOptions
        options={University }
        autoFocus
        isSearchable
      />
 
      </FormControl>
      <FormControl className={classes.formControl}>
        <h5>Branch</h5>
        <Select
        theme={customTheme}
       //value={selected}
        onChange={handleBranchChange}
        options={InsideBranch}
      />
 
      </FormControl>
      <FormControl className={classes.formControl}>
        <h5>Semester</h5>
        <Select
        theme={customTheme}
        //value={selected}
        onChange={handleSemChange}
        options={InsideSemester}
      />
    
      </FormControl>
      <FormControl className={classes.formControl}>
        <h5>Subject</h5>
        <Select
        theme={customTheme}
        //value={selected}
        onChange={handlesubjectChange}
        options={InsideSubject}
      />
 
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

      <Link to = {{pathname:"/qp",state: {university, branch, semester,subject}}}>
      <Button variant="contained" color="primary" style={{display:'flex',paddingRight:'auto',paddingLeft:'auto', width:'100%'}}>
        Search
      </Button>
      </Link>

      </FormControl>
      <div>
      {datastore.map(item=>(
       <p> {item.data.name}</p>
    ))}
    </div>
    </Container>
  );
}

export default Search;
