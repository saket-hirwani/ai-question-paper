import React from 'react'
import {Container, Grid, Button } from "@material-ui/core";
import {Link} from "react-router-dom";
function Home() {
    return (
        <Container maxWidth="md"> 
<h1 style={{textAlign:'center', padding:10, marginTop:60, marginBottom:30}}>Get Your Subject Question Paper In Few Clicks</h1>
      <Grid container spacing={10} style={{flex:1,}}>
        <Grid item lg={6} md={6} xs={12} sm={12}>
         <Link to="/search"> <Button className="bgcolor btn" style={{padding:100, borderRadius:10, fontSize:20, color:'white'}} variant="outlined" >
            Search Question Papers
          </Button></Link>
        </Grid>
        <Grid item lg={6} md={6} xs={12} sm={12}>
        <Link to="/upload"><Button className="bgcolor btn" style={{padding:100, borderRadius:10, fontSize:20, color:'white'}} variant="outlined" >
          Upload Question Papers
        </Button></Link>
      </Grid>
      </Grid>
      </Container>
    )
}

export default Home
