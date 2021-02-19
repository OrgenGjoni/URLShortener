import React from 'react';
import {Grid,Typography,makeStyles} from '@material-ui/core';
import { AiOutlineScissor } from 'react-icons/ai';


const font : string = "'Fjalla One',sans-serif";
const fontCurly : string = "'Pacifico', cursive";
const newStyle  : any = makeStyles(()=>({
  container : {
    padding : '1em'
  },
  titleFirst : {
    fontFamily : font,
    fontSize : '4em'
  },
  titleCurly : {
    fontFamily : fontCurly,
    fontSize : '3em'
  }
}))

const Title = ()=>{

  const style : any = newStyle();

  return(
    <Grid container
      direction = 'row'
      alignItems = 'center'
      justify = 'center'
      className = {style.container}
    >

      <AiOutlineScissor size = {'8em'} color = {'#fcbf49'} />
      <span className = {style.titleFirst}>
        URL
      </span>
      <span className = {style.titleCurly}>
        Shortener
      </span>

    </Grid>
  );
}

export default Title;
