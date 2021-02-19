const express = require('express');
const btoa = require('btoa');
const atob = require('atob');
const Url = require('../models/url_model');
const Counter = require('../models/counter_model');

const router = express.Router();


const insertUrl = async (req,res)=>{

  let url
  const regex = /^(?=.*\bhttp\b)|(?=.*\bhttps\b).*$/
  regex.test(req.body.url) ? url = req.body.url : url = 'https://' + req.body.url;


  try{
    const findTheUrl = await Url.findOne({url : url}).exec();
    if( findTheUrl != null){
      res.json({full_url : req.body.url,
                short_url : req.protocol + '://' + req.get('host') + '/' +btoa(findTheUrl.id)
              });
    }else{

      let counter = await Counter.findOneAndUpdate({},{$inc : {id : 1}},{new : true}).exec();
      counter == null ? counter = await new Counter({}).save() : null ;



      const doc = await new Url({url : url, id : counter.id}).save();

      res.send({full_url : req.body.url,
                short_url : req.protocol + '://' + req.get('host') + '/' + btoa(doc.id)
              });

    }

  }catch(err){
      res.send(err);
    }
}




const findUrl = (req,res)=>{


  Url.findOne({id : atob(req.params.parameter)},(err,result)=>{

    if(result == null){
      res.send('Not found');
    }else{

    res.redirect(301,result.url);
    }

  });
}


module.exports = {findUrl,insertUrl};
