const request = require('request');
const express = require('express');
const cors = require('cors')
const cheerio = require('cheerio');



var app = express();

app.use(cors());
app.use(express.json());

function normalize(min, max) {
  var delta = max - min;
  return function (val) {
      return (val - min) / delta;
  };
}

function normalizeArray(array) {
  var minValue = Math.min(...array);
  var maxValue = Math.max(...array);
  return array.map(normalize(minValue, maxValue));
}
app.get('/city', function (req, res,next) {
  request('http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13', function (error, response, body) {
      const $ = cheerio.load(body);
      
     

      const $data2 = $("div.container div.content div.maplist");
      var info = $data2.text().replace(/[\n\t]/g,'');
      var res_arr = [];
      info = info.split('명');
      info = info.map(v => v.replace('확진환자수',''));
      info.forEach((v,i) =>{
        if(i % 2 == 0){
        var city_name = v.substr(0,2);
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
          res_arr.push(
            {
              city: city_name,
              count: parseInt(v.substring(2)),
              death_count: 0
            }
          );
        }
        else{
          res_arr[res_arr.length - 1]['death_count'] = parseInt(v.substring(4));

        }
      })
      res_arr.pop();
      res_arr.sort((a,b) => a.count - b.count);

      console.log(res_arr);
      res.json(res_arr)

});
 
});

var server = app.listen(3001, function(){
  console.log("API Server Port 3001 on.")
})