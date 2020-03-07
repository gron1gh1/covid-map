const request = require('request');
const express = require('express');
const cors = require('cors')
const cheerio = require('cheerio');



var app = express();

app.use(cors());
app.use(express.json());
app.get('/city', function (req, res,next) {
  request('http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13', function (error, response, body) {
      const $ = cheerio.load(body);
      const $data = $("div.container div.content div.maparea div#maplayout");
      var info = $data.text().replace(/[\n\t]/g,'');
      var info = info.split('명');
      var map = info.map(function(elem)
        {
          var city_name = elem.substr(0,2);
          city_name = city_name.replace('충남','chungnam');
          city_name = city_name.replace('제주','jeju');
          city_name = city_name.replace('경남','gyeongnam');
          city_name = city_name.replace('경북','gyeongbuk');
          city_name = city_name.replace('전북','jeonbuk');
          city_name = city_name.replace('충북','chungbuk');
          city_name = city_name.replace('강원','gangwon');
          city_name = city_name.replace('경기','gyeonggi');
          city_name = city_name.replace('전남','jeonnam');
          city_name = city_name.replace('울산','ulsan');
          city_name = city_name.replace('부산','busan');
          city_name = city_name.replace('대구','daegu');
          city_name = city_name.replace('대전','daejeon');
          city_name = city_name.replace('인천','incheon');
          city_name = city_name.replace('서울','seoul');
          city_name = city_name.replace('광주','gwanju');
          city_name = city_name.replace('세종','sejong');
         
          let p ={
            city: city_name,
            count: parseInt(elem.substring(2))
          };
          return p;
        }
      );
      map.pop();
      res.json(map)

});
 
});

var server = app.listen(3001, function(){
  console.log("API Server Port 3001 on.")
})