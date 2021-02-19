import React,{useState,useEffect} from 'react';
import {Container,Grid,makeStyles} from '@material-ui/core';
import Title from './components/Title';
import Input from './components/Input';
import History from './components/History';
import Footer from './components/Footer';



const newStyle : any = makeStyles(()=>({
  mainContainer : {
    backgroundColor : '#29bdc1',
    height : '100vh',
    width : '100vw'
  }
}))

const AppContainer = () =>{

  const style : any = newStyle();
  type Url = {
    full_url : string,
    short_url : string
  }

  const [result,setResult] = useState<string>('');
  const [showHistory,setShowHistory] = useState<boolean>(false);
  const [histExist,setHistExist] = useState<boolean>(false);
  const [hist,setHist] = useState<Url[] | null >(null);

  const toggleShowHist = () : void => {
    setShowHistory(!showHistory);
  }

  useEffect(()=>{
    const locStorage : null | string = localStorage.getItem('prev_url');

    if(locStorage !== null){
      setHist(JSON.parse(locStorage));
      setHistExist(true)
    }
  },[]);



  return(
    <Container component  = 'div' maxWidth = 'xl' className = {style.mainContainer}>
      <Grid container
        direction = 'column'
      >

        <Title />
        <Input setHist = {setHist}  histExist = {histExist} setHistExist = {setHistExist} toggleShowHist = {toggleShowHist} />
        <History hist = {hist} showHistory = {showHistory}/>
        <Footer />
      </Grid>
    </Container>
  );
};


export default AppContainer;
