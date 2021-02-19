import React,{useRef} from 'react';
import {Grid,InputBase,InputAdornment,makeStyles} from '@material-ui/core';
import {MdContentCopy} from 'react-icons/md';

type Url = {
  full_url : string,
  short_url : string
}

interface PropInterface{
  url : Url
}

const newStyle = makeStyles(()=>({
  container : {
    padding : 1,
    borderBottom : '1px solid #29bdc1'
  },
  fullUrl : {
    width : '60%',
    fontSize : 14,
    fontWeight : 900,
    color : '#353535'
  },
  shortUrl : {
    width : '40%',
    color : '#457b9d',
    fontSize : 14,
    fontWeight : 800
  },
  endAdornment : {
    cursor : 'pointer',
    '&:active' : {
      color : 'red'
    }
  }
}))

const HistoryElement = ({url} : PropInterface)=>{

  const style : any = newStyle();
  const elRef : any = useRef<HTMLInputElement>(null);

  const copyText = (ref : any) : void =>{
    try{
      ref.current.select();
      document.execCommand("copy");
    }catch(err){
      console.log(err);
    }
  }

  const CopyAdornment = ()=>(
    <InputAdornment position = 'end' className = {style.endAdornment}>
        <MdContentCopy onClick = {()=>{copyText(elRef)}} size = {25}/>
    </InputAdornment>
  )


  return(
    <Grid container
      direction = 'row'
      className = {style.container}
    >
      <InputBase value = {url.full_url} className = {style.fullUrl} readOnly />
      <InputBase
        value = {url.short_url}
        inputRef = {elRef}
        endAdornment = {<CopyAdornment />}
        className = {style.shortUrl}
        readOnly />
    </Grid>

  );
}

export default HistoryElement;
