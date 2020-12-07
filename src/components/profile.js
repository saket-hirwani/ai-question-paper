import React, {useState} from 'react'
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
    const classes = useStyles();
    const [values, setValues] = useState({
    firstName: 'Katarina',
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
  });

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
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            12:12 PM
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Change picture
        </Button>
      </CardActions>
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
                // value={values.firstName}
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
                // value={values.lastName}
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
                // value={values.email}
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
                name="sub"
                onChange={handleChange}
                required
                // value={values.email}
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
                name="sub"
                onChange={handleChange}
                required
                // value={values.email}
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
                name="sub"
                onChange={handleChange}
                required
                // value={values.email}
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
