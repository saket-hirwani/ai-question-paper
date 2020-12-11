import React, {useState, useEffect } from "react";
import PDFViewer from "pdf-viewer-reactjs";
import { Link, useLocation } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
});



function Qpaper() {
  const classes = useStyles();
  let location = useLocation();
  var universityId = location.state.universityId;
  var branchId = location.state.branchId;
  var semId = location.state.semId;
  var subId = location.state.subId;
  useEffect(() => {
    console.log(location);
  }, []);
  return (
    <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
      {/*  <PDFViewer
        document={{
            url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf',
        }}
    />*/}
      <div className="table-qp">
        <h3>Your Results</h3>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>University</TableCell>
                <TableCell align="right">Branch</TableCell>
                <TableCell align="right">Semester</TableCell>
                <TableCell align="right">Subject</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

             <TableRow>
        <TableCell component="th" scope="row">
          {location.state.universityname}
        </TableCell>
        <TableCell align="right">{location.state.branchname}</TableCell>
        <TableCell align="right">{location.state.semname}</TableCell>
        <TableCell align="right">{location.state.subname}</TableCell>
      </TableRow>

            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Exam Year</TableCell>
              <TableCell align="right">Download link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {location.state.year.map((item, index) => {
              if(item.data.year){
             return(<TableRow key={index}>
                <TableCell align="right"> {item.data.year}</TableCell>
                <TableCell align="right">
                  <Link
                    to={{
                      pathname: "/download",
                      state: { universityId, branchId, semId, subId, yearId: item.id},
                    }}
                  >
                   Click Here
                  </Link>
                </TableCell>
              </TableRow>
            )}
           }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Qpaper;
