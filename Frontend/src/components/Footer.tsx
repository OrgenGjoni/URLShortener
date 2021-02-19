import React from 'react';
import {Grid,makeStyles} from '@material-ui/core';

const newStyle : any = makeStyles(()=>({
  container : {
    position : 'absolute',
    bottom : 0,
    right : 0,
    padding : 20,
    color : '#fff',
    fontWeight : 800
  }
}));

const Footer = ()=>{

  const style : any = newStyle();
  return(
      <Grid container
        direction = 'row'
        alignItems = 'center'
        justify = 'center'
        className = {style.container}
      >
        O.Gj 2021
      </Grid>
  );
}

export default Footer;
