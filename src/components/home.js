import React from "react";
import { Container, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
// import Grow from "@material-ui/core/Grow";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     height: 180,
//   },
//   container: {
//     display: "flex",
//   },
//   paper: {
//     margin: theme.spacing(1),
//   },
//   svg: {
//     width: 100,
//     height: 100,
//   },
//   polygon: {
//     fill: theme.palette.common.white,
//     stroke: theme.palette.divider,
//     strokeWidth: 1,
//   },
// }));





const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(question, answer
  // , calories, fat, carbs, protein, price
  ) {
  return {
    question,
    answer,
    // calories,
    // fat,
    // carbs,
    // protein,
    // price,
    // history: [
    //   { date: '2020-01-05', customerId: '11091700', amount: 3 },
    //   { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    // ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
      <TableCell component="th" scope="row">
        {row.question}
      </TableCell>
      <TableCell>
          <IconButton style={{display:'flex',marginLeft:'auto',marginRight:'auto'}} aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Answer
              </Typography>
              <Table size="small" aria-label="purchases">
                
                <TableBody>
                  
                    <TableRow key={row.answer}>
                      <TableCell component="th" scope="row">
                        {row.answer}
                      </TableCell>
                     
                    </TableRow>
              
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

const rows = [
  createData('What is Recursion?',`The process in which a function calls itself directly or
  indirectly is called recursion and the corresponding
  function is called as recursive function. Using recursive
  algorithm, certain problems can be solved quite easily.`),
  createData('What is Inheritance?','fewfweafwafwaevwavw'),
  createData('What is Recfeursion?','fewfweafwafwjfgaevwavw'),
  createData('What is rsion?','fewfhjweafwafwaevwavw'),
  
];






function Home() {
  const [{ user }] = useStateValue();
  // const classes = useStyles();
  // const [checked, setChecked] = React.useState(false);

  // const handleChange = () => {
  //   setChecked((prev) => !prev);
  // };

  return (
    <Container maxWidth="md">
      <h1
        style={{
          textAlign: "center",
          padding: 10,
          marginTop: 60,
          marginBottom: 30,
        }}
      >
        Hii {user.displayName} Get Your Subject Question Paper In Few Clicks
      </h1>
      <Grid container spacing={10} style={{ flex: 1 }}>
        <Grid item lg={6} md={6} xs={12} sm={12}>
          <Link to="/search">
            {" "}
            <Button
              className="bgcolor btn"
              style={{
                padding: 60,
                borderRadius: 10,
                fontSize: 20,
                color: "white",
              }}
              variant="outlined"
            >
              Search Question Papers
            </Button>
          </Link>
        </Grid>
        <Grid item lg={6} md={6} xs={12} sm={12}>
          <Link to="/upload">
            <Button
              className="bgcolor btn"
              style={{
                padding: 60,
                borderRadius: 10,
                fontSize: 20,
                color: "white",
              }}
              variant="outlined"
            >
              Upload Question Papers
            </Button>
          </Link>
        </Grid>

        <div className="question_container">
          <div>
            <h2>Imp Questions for you!!</h2>
          </div>
          <br />
         

          <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                
                <TableCell style={{width:"740px"}}>Questions you must prepare !!</TableCell>
                <TableCell>Click arrow to show answers</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.question} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      </Grid>
    </Container>
  );
}

export default Home;
