 /******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/

//basic required import for NodeJs
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose')
const Bing = require('node-bing-api')({
  accKey: 'db63791f74064c3ca3a65570902162f5 ',
                                      });
//db63791f74064c3ca3a65570902162f5
const searchTerm = require('./models/searchTerm');

const app = express();
app.use(bodyParser.json());
app.use(cors());
//get call to return JSON that format natural and unix data

var url = 'mongodb://jzsplk:123@ds153752.mlab.com:53752/xc';
mongoose.connect(url);

app.get('/api/imagesearch/:searchVal*', (req, res, next) => {
  var {searchVal} = req.params
  var  {offset}  = req.query
  
  var data = new searchTerm({
    searchVal,
    searchDate: new Date()
  });
  
  data.save(err => {
    if(err){
      res.send('Error saving to database')
    }
    //res.json(data);
    

  });
  
  Bing.images(searchVal, {
    top:10
  }, function(err, rez, body){
    var bingData = [];
    
    for(var i = 0; i < 10; i++){
      bingData.push({
        url: body.value[i].webSearchUrl,
        snippet: body.value[i].name,
        thumbnail: body.value[i].thumbnailUrl,
        context: body.value[i].hostPageDisplayUrl
      });
    }
    res.json(bingData);
    
  })
  
//  res.json({
//    searchVal,
//    offset
//  });  
 
  
    
    
});



app.listen(process.env.PORT || 3000, function(){
    console.log("this server is  working on " + process.env.PORT);
});
