const request = require('request');
const express = require('express');
const cors = require('cors')
const cheerio = require('cheerio');

request('http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13', function (error, response, body) {
      const $ = cheerio.load(body);
      const $data = $("div.container div.content div.maparea div#maplayout");
      var info = $data.text().replace(/[\n\t]/g,'');
      var info = info.split('명');
      var map = info.map(function(elem)
        {
            let p ={
              city: elem.substr(0,2),
              count: parseInt(elem.substring(2))
            };
            return p;
        }
      );
      console.log(info);
      console.log(map);
});

var app = express();

app.use(cors());

app.get('/city', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
});

var server = app.listen(3000, function(){
  console.log("API Server Port 3000 on.")
})