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
app.get('/city', function (req, res, next) {
  request('http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13', function (error, response, body) {
    const $ = cheerio.load(body);

    var res_arr = [];
    const $data = $('div.content div.data_table tbody');
    for (var idx = 1; idx <= 18; idx++) {
      var $info = $data.children(`tr:nth-child(${idx})`);
      var city_name = $info.children('th').text();
     
      var city_info = {
        city: city_name,
        prev_day: $info.children('td:nth-child(2)').text(),
        count: $info.children('td:nth-child(3)').text(),
        death_count: $info.children('td:nth-child(5)').text()
      }
      res_arr.push(city_info);
    }
    res_arr.sort((a,b) => a.count - b.count);
    console.log(res_arr);
    
    res.json(res_arr)

  });

});

var server = app.listen(3001, function () {
  console.log("API Server Port 3001 on.")
})