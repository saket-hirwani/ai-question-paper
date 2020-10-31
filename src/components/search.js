import React from "react";
import {Link} from "react-router-dom";
import { Container, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
      padding: 5,
    },
  }));

  const classes = useStyles();
  return (
    <Container
      maxWidth="md"
      style={{ backgroundColor: "lightgray", height: '90vh' ,paddingTop:100}}
    >
    <h1 style={{textAlign:'center'}}>Select your university details</h1>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">University</InputLabel>
        <Select defaultValue="" id="grouped-select">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <ListSubheader>Select your university</ListSubheader>
          <MenuItem value={1}>Csvtu</MenuItem>
          <MenuItem value={2}>Durg University</MenuItem>
          <MenuItem value={3}>PRSU</MenuItem>
          <MenuItem value={4}>Durg University</MenuItem>
          <MenuItem value={5}>Durg University</MenuItem>
          <MenuItem value={6}>Durg University</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">Branch</InputLabel>
        <Select defaultValue="" id="grouped-select">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <ListSubheader>Select your Branch</ListSubheader>
          <MenuItem value={1}>CSE</MenuItem>
          <MenuItem value={2}>ME</MenuItem>
          <MenuItem value={3}>CIVIL</MenuItem>
          <MenuItem value={4}>EEE</MenuItem>
          <MenuItem value={5}>ETC</MenuItem>
          <MenuItem value={6}>IT</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">Semester</InputLabel>
        <Select defaultValue="" id="grouped-select">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <ListSubheader>Select your Branch</ListSubheader>
          <MenuItem value={1}>1st</MenuItem>
          <MenuItem value={2}>2nd</MenuItem>
          <MenuItem value={3}>3rd</MenuItem>
          <MenuItem value={4}>4th</MenuItem>
          <MenuItem value={5}>5th</MenuItem>
          <MenuItem value={6}>6th</MenuItem>
          <MenuItem value={7}>7th</MenuItem>
          <MenuItem value={8}>8th</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">Year</InputLabel>
        <Select defaultValue="" id="grouped-select">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <ListSubheader>Select Year</ListSubheader>
          <MenuItem value={1}>2020-June</MenuItem>
          <MenuItem value={2}>2019-Dec</MenuItem>
          <MenuItem value={3}>2019-June</MenuItem>
          <MenuItem value={4}>2018-June</MenuItem>
          <MenuItem value={5}>2018-Dec</MenuItem>
          <MenuItem value={6}>2017-June</MenuItem>
          <MenuItem value={6}>2017-Dec</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
      <Link to="/qp"><Button variant="contained" color="primary" style={{display:'flex',paddingRight:'auto',paddingLeft:'auto', width:'100%'}}>
        Search
      </Button></Link>
      </FormControl>
    </Container>
  );
}

export default Search;
