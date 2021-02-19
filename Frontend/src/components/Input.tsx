import React,{useState,useEffect,useRef} from 'react';
import {Grid,InputBase,Button,InputAdornment,CircularProgress,Chip,makeStyles} from '@material-ui/core';
import axios from 'axios';
import {BiHistory} from 'react-icons/bi';

const SERVER : string | undefined = process.env.REACT_APP_SERVER_ADDRESS;

const newStyle : any = makeStyles(()=>({
  container : {
    padding : '1.5em'
  },

  inputBase: {
    width : '60%',
    minWidth : 400,
    height : '4em',
    backgroundColor : '#fff',
    border : '4px solid #29bdc1',
    padding : 10,
    borderRadius : 10,
    fontSize : 22,
    color : 'grey'
  },
  inputStyle : {

    '&::selection' : {
      backgroundColor : '#ef476f',
      color : 'white'
    }
  },
  searchButton : {
    backgroundColor : '#00A86B',
    height : '4em',
    fontWeight : 800

  },
  showHistory : {
    width : '60%',
    minWidth : 400,
    padding : 10
  },
  chip : {
    textAlign : 'center',
    fontSize : 10,
    fontWeight : 800,
    color : '#e0fbfc',
    backgroundColor : '#2d6a4f',
    '&:hover' : {
      backgroundColor : '#303f9f'
    },
    '&:focus' : {
      backgroundColor : '#2d6a4f'
    }
  }
}))

type Url = {
  full_url : string,
  short_url : string
}

interface PropInterface{
  setHist(arg : Url[] ) : void;
  histExist : boolean,
  setHistExist(arg : boolean) : void,
  toggleShowHist() : void
}

const Input = ({setHist,histExist,setHistExist,toggleShowHist} : PropInterface)=>{

  const style : any = newStyle();
  const [inputVal,setInputVal] = useState<string>('');
  const [loading,setLoading] = useState<boolean>(false);
  const [resultShown,setResultShown] = useState<boolean>(false);
  const resRef : any = useRef<HTMLInputElement>(null);



  const updateLocStorage = (newUrl : Url) : void =>{
    const locStorage : null | string = localStorage.getItem('prev_url');


    if(locStorage === null){
      localStorage.setItem('prev_url',JSON.stringify([newUrl]));
      setHistExist(true);
      setHist([newUrl]);
    }else{
        const prevUrl : Url[]  = JSON.parse(locStorage);

        if(prevUrl.length === 4){
          prevUrl.pop();
          prevUrl.unshift(newUrl);
        }else{
          prevUrl.unshift(newUrl);
        }

      localStorage.setItem('prev_url',JSON.stringify(prevUrl));
      setHist(prevUrl);
    }

  }

  const fetchReq = (url : string) : void =>{

        setLoading(true);

        axios({
          method : 'post',
          url : SERVER,
          data : {
            url : url
          }
        })
        .then((res)=>{
          setLoading(false);
          setInputVal(res.data.short_url);
          setResultShown(true);
          updateLocStorage(res.data);

        })
        .catch((err)=>{console.log(err)})
  }

  const onOkayPress = (e : any) : void =>{
    if(e.key === 'Enter'){
      fetchReq(inputVal);
    }
  }


  useEffect(()=>{

    if(typeof SERVER === 'undefined'){
      console.log('SERVER UNDEFINED!');
    }
  });

  const copyResult = (ref : any) : void =>{
    //  console.log(ref.current.firstElementChild.style.color = 'red');
      ref.current.select();
      document.execCommand("copy");
  }


  const SearchAdornment = () : any =>(
    <InputAdornment position = 'end'>
      <Button
          className = {style.searchButton}
          variant = "contained"
          color = "primary"
          onClick = {()=>{resultShown ? copyResult(resRef) :fetchReq(inputVal)}}>

        {loading ? <CircularProgress />  : resultShown ? 'COPY' : 'SHORTEN'}
      </Button>
    </InputAdornment>
  )

  return(
    <Grid container
      direction = 'row'
      alignItems = 'center'
      justify = 'center'
      className = {style.container}
    >

        <InputBase
          inputRef = {resRef}
          inputProps = {{
            className : style.inputStyle
          }}
          name = 'url'
          placeholder = 'Insert URL'
          className = {style.inputBase}
          value = {inputVal}
          endAdornment = {<SearchAdornment />}
          onChange = {(e)=>{setInputVal(e.target.value);setResultShown(false)}}
          onKeyPress = {(e)=>{onOkayPress(e)}}
         />

         <Grid container
          direction = 'row'
          justify = 'flex-end'
          className = {style.showHistory}
         >
          {histExist && <Chip  className = {style.chip} component = 'button' icon = {<BiHistory color = '#e0fbfc' />} label = 'Previous' size = 'small' onClick = {()=>{toggleShowHist()}}/>}
         </Grid>

    </Grid>
  );
}

export default Input;
