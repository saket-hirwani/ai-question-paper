import React, {useState, useEffect} from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  makeStyles,
  Container,
  Grid,
  TextField,
} from '@material-ui/core';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
import {Link} from "react-router-dom";
import db from "../firebase";
// const user = {
//   avatar: '/static/images/avatars/avatar_6.png',
//   city: 'Los Angeles',
//   country: 'USA',
//   jobTitle: 'Senior Developer',
//   name: 'Katarina Smith',
//   timezone: 'GTM-7'
// };

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));
function Profile() {
    const [{user}] = useStateValue();
    const [{}, dispatch] = useStateValue();
    const [datastore, setdatastore] = useState([]);
    const classes = useStyles();
    const [values, setValues] = useState({
    name: user.displayName,
    University: '',
    Branch : '',
    sem : '',
    sub1 : '',
    sub2 : '',
    sub3 : '',

  });

  useEffect(() => {
    // ocrFunction();
    const unsubscribe = db.collection("users").onSnapshot((snapshot) =>
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


  const changefirst = () =>{
        dispatch({
            type: actionTypes.SET_USER_FIRST,
            userfirst: false,
        })
}
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
    return (
        <div style={{margin:100, backgroundColor:'#f0f0f0'}}>
        <Container maxWidth="lg" >
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
          <div>
        <Card
      
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={user.photoURL}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.displayName}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {user.email}
          </Typography>
          
        </Box>
      </CardContent>
      <Divider />
    
    </Card>
        </div>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
          <form
      autoComplete="off"
      noValidate
     
    >
    <Card>
    <CardHeader
      subheader="The information can be edited"
      title="Profile"
    />
    <Divider />
    <CardContent>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            fullWidth
            helperText="Please specify the University"
            label="University"
            name="University"
            onChange={handleChange}
            required
            value={values.University}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            fullWidth
            label="Branch"
            name="Branch"
            onChange={handleChange}
            required
            value={values.Branch}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            fullWidth
            label="Semester/Year"
            name="sem"
            onChange={handleChange}
            required
            value={values.sem}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            fullWidth
            label="Favourite Subject 1"
            name="sub1"
            onChange={handleChange}
            required
            value={values.sub1}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            fullWidth
            label="Favourite Subject 2"
            name="sub2"
            onChange={handleChange}
            required
            value={values.sub2}
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <TextField
            fullWidth
            label="Favourite Subject 3"
            name="sub3"
            onChange={handleChange}
            required
            value={values.sub3}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
        <Link to = "/">
          <Button
            color="primary"
            variant="contained"
            onClick={changefirst}
          >
            Save details
          </Button>
          </Link>
        </Box>
      </Card>
    </form>
          </Grid>
        </Grid>
      </Container>
      </div>



 
    )
}

export default Profile
