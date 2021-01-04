import React, { useState, useEffect } from "react";
import db from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  table: {
    // minWidth: 650,
    width: "40%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
function Admin() {
  const classes = useStyles();
  const [datastore, setdatastore] = useState([]);
  useEffect(() => {
    const unsubscribe = db.collection("verify").onSnapshot((snapshot) =>
      setdatastore(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {};
  }, []);

  return (
    <div className="admin_container">
      <h3>Verify Question Papers</h3>
      {datastore != "" ? (
        <TableContainer component={Paper}>
          {datastore === "" ? (
            <p>No data..</p>
          ) : (
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">University</TableCell>
                  <TableCell align="center">Verify</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datastore.map((item, index) => {
                  if (datastore) {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center"> {item.data.name}</TableCell>
                        <TableCell align="center">
                          {item.data.isverified ? (
                            <p
                              style={{
                                backgroundColor: "green",
                                color: "#fff",
                                maxWidth: 50,
                                marginLeft: "auto",
                                marginRight: "auto",
                                padding: 5,
                                borderRadius: 5,
                              }}
                            >
                              Verified
                            </p>
                          ) : (
                            <p
                              style={{
                                backgroundColor: "red",
                                color: "#fff",
                                maxWidth: 80,
                                marginLeft: "auto",
                                marginRight: "auto",
                                padding: 5,
                                borderRadius: 5,
                              }}
                            >
                              <Link
                                to={{
                                  pathname: "/verify",
                                  state: {
                                    id: item.id,
                                    universityId: item.data.universityId,
                                    branchId: item.data.branchId,
                                    semId: item.data.semId,
                                    subId: item.data.subId,
                                    yearId: item.data.yearId,
                                    linkId: item.data.linkId,
                                  },
                                }}
                              >
                                Click Here
                              </Link>
                            </p>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  } else {
                    return null;
                  }
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Admin;
