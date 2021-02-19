import React,{useEffect,useState,useRef} from 'react';
import {Grid,Paper,InputBase,makeStyles} from '@material-ui/core';
import { motion } from "framer-motion";
import HistoryElement from './HistoryElement';



const newStyle : any = makeStyles(()=>({
  container : {
    padding : 0
  },
  paper : {
    width : '55%',
    minWidth : 380,
    padding : 10,
    color : '#646464',
    fontSize : '1.1em',
    fontWeight : 700,
  },
  url : {
    '&::selection' : {
      backgroundColor : '#4cc9f0',
      color : '#f72585'
    }
  },
  copyIcon : {
    '&:hover' : {
      color : 'rgb(242,4,242)'
    },
    color :'#bbbbbb'
  }
}));
type Url = {
  full_url : string,
  short_url : string
}

interface PropsInterface{
  hist : Url[] | null,
  showHistory : boolean
}



const History = ({hist,showHistory} : PropsInterface)=>{


  const style : any = newStyle();
  const resRef : any = useRef<HTMLSpanElement>(null);


  const selectText = (ref : any) : void =>{
    console.log(ref.current.focus());
  }

  const variants : any = {
    open : {
      opacity: 1,
      y: 0 ,
      scale: 1,
      transition: { duration: 0.7 }
    },
    close : {
      opacity: 0,
      transition: { duration: 0.7 }
    },
    start : {
      opacity : 0
    }
  }


  return(
    <motion.div
            animate = {showHistory ? 'open' : 'close'}
            initial = 'start'
            variants = {variants}
    >
      <Grid container
        direction = 'row'
        alignItems = 'center'
        justify = 'center'
        className = {style.container}
      >
          <Paper elevation = {0} className = {style.paper}>

          {hist !== null && hist.map((el)=>(<HistoryElement url = {el}/>))}

          </Paper>

      </Grid>
    </motion.div>
  );
}

export default History;
