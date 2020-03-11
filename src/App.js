import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import MapSVG from './data/korea_map.svg';
import './App.css';
import { ReactSVG } from 'react-svg';
import axios from 'axios';
import skmeans from 'skmeans';
function Map() {
  var [data, SetData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/city')
      //axios.get("http://covidapi.run.goorm.io/city")
      .then(function (response) {
        SetData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);


  var data_render = <span>not</span>;
  if (data != null)
    data_render = <span>{data}</span>;
  return (


    <div>
      <span>{JSON.stringify(data)}</span>
      <ReactSVG src={MapSVG} beforeInjection={
        svg => svg_data_load(svg)
      } />
    </div>
  )
  
  function svg_data_load(svg) {
    var all_city = [];
    all_city = Array.from(svg.querySelectorAll('polyline'));
    all_city = all_city.concat(Array.from(svg.querySelectorAll('path')));

   
    if (data) {
      var red_palette = ['#ff4c4c','#ff2626','#ff0000','#b30000','#660000'];
      var cluster_data = data.map(v => parseInt(v.count));
      cluster_data.pop();
      cluster_data = skmeans(cluster_data,5,'kmrand').idxs;
      console.log(cluster_data);
      data.map(function(v,i){
        v.cluster = red_palette[cluster_data[i]];
        return v;
      })
      console.log(data);




      var EntireCount = data[data.length - 1]['count'];
     // var avg = get_avg(data,data.length);
      // console.log(avg);
      //
      var mid_val = data[data.length / 2]['count'];

      var partial_up = data.filter(v => v.count > mid_val && v.count != EntireCount);
      var partial_up_count = partial_up.reduce((a,b)=>{
        if(a.count == undefined)
          return parseInt(a) + parseInt(b.count);
        return parseInt(a.count) + parseInt(b.count);
      });
      console.log(partial_up_count);
      var partial_down = data.filter(v => v.count <= mid_val);
      var partial_down_count = partial_down.reduce((a,b)=>{
        if(a.count == undefined)
          return parseInt(a) + parseInt(b.count);
        return parseInt(a.count) + parseInt(b.count);
      });
      console.log(partial_down_count);
       console.log(partial_up_count);
      data.forEach(function (elem, i) {

        var find_elem;
        all_city.some((v) => {
          if (v.id.includes(elem.city)) {
            find_elem = v;
            return true;
          }
        });

        if (find_elem) {
          var percent = elem.count * 100 / EntireCount;
          //hsl(0,100%,50%) ~ hsl(0,100%,100%) = red ~ white;
          console.log(elem.city + ':' + percent);
          find_elem.setAttribute('style', `fill:${elem.cluster};stroke:lightgray`);
          find_elem.onclick = () => alert(find_elem.id);
          find_elem.onmouseenter = () => find_elem.setAttribute('style',  `fill:${elem.cluster};stroke:lightgray`);
          find_elem.onmouseleave = () => find_elem.setAttribute('style',  `fill:${elem.cluster};stroke:lightgray`);

        }
      });
    }

  }
}
function App() {

  return (
    <Map />
  );
}

export default App;
