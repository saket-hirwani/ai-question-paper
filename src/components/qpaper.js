import React,{useEffect} from 'react'
import PDFViewer from 'pdf-viewer-reactjs'
import {Link, useLocation} from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
    
  },
});

function createData(branch, subject, year, Download_link) {
  return { branch, subject, year, Download_link };
}

const rows = [
  createData("CSE", "c++", "2020-June", 'Click here'),
  createData("CSE", "c++", "2020-June", 'Click here'),
  createData("CSE", "c++", "2020-June", 'Click here'),
  createData("CSE", "c++", "2020-June", 'Click here'),
];
const columns = [
  { field: 'id', headerName: 'S.No.', width: 70 },
  { field: 'branch', headerName: 'Branch', width: 200 },
  { field: 'subject', headerName: 'Subject', width: 400 },
  {
    field: 'year',
    headerName: 'Year',
    // type: 'number',
    width: 200,
  },
  {
    field: 'Download_link',
    headerName: 'Download link',
    description: 'Click here to Download.',
    sortable: false,
    width: 160,
    // valueGetter: (params) =>
    //   `${params.getValue('firstName') || ''} ${
    //     params.getValue('lastName') || ''
    //   }`,
  },
];

// const rows = [
//   { id: 1, branch: "CSE", subject: 'C++', year: '2020-June',Download_link:'Click here' },
//   { id: 2, branch: "CSE", subject: 'C++', year: '2020-Dec',Download_link:'Click here' },
//   { id: 3, branch: "CSE", subject: 'C++', year: '2019-June',Download_link:'Click here' },
//   { id: 4, branch: "CSE", subject: 'C++', year: '2019-Dec',Download_link:'Click here' },
//   { id: 5, branch: "CSE", subject: 'C++', year: '2018-June',Download_link:'Click here' },
//   { id: 6, branch: "CSE", subject: 'C++', year: '2018-Dec',Download_link:'Click here' },

// ];

function Qpaper() {
  const classes = useStyles();
    let location = useLocation();
    useEffect(() => {
        console.log(location)
    }, [])
    return (
        <div style={{width:"80%",marginLeft:'auto',marginRight:'auto'}}>
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
      <TableRow key={location.state.university}>
        <TableCell component="th" scope="row">
          {location.state.university}
        </TableCell>
        <TableCell align="right">{location.state.branch}</TableCell>
        <TableCell align="right">{location.state.semester}</TableCell>
        <TableCell align="right">{location.state.subject}</TableCell>
      </TableRow>

  </TableBody>
</Table>
</TableContainer>
</div>
 

  <TableContainer component={Paper}>
  <Table className={classes.table} aria-label="simple table">
    <TableHead>
      <TableRow>
        
        <TableCell >Branch</TableCell>
        <TableCell align="right">subject</TableCell>
        <TableCell align="right">Year</TableCell>
        <TableCell align="right">Download link</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.branch}>
          <TableCell component="th" scope="row">
            {row.branch}
          </TableCell>
          <TableCell align="right">{row.subject}</TableCell>
          <TableCell align="right">{row.year}</TableCell>
          <TableCell align="right"><Link to='/pdf'>{row.Download_link}</Link></TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
        </div>
    )
}

export default Qpaper
