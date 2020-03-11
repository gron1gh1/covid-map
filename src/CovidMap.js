import React, { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import axios from 'axios';
import skmeans from 'skmeans';
import MapSVG from './data/korea_map.svg';

function CovidMap() {
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
       
    }, []);
  
    return (
      <div class='screen'>
        <ReactSVG src={MapSVG} beforeInjection={
          svg => svg_data_load(svg)
        } />
      </div>
    )
    
    function svg_data_load(svg) {
      var all_city = [];
      all_city = Array.from(svg.querySelectorAll('polyline'));
      all_city = all_city.concat(Array.from(svg.querySelectorAll('path')));
  
      svg.setAttribute('style','height:700px');
      if (data) {
        var red_palette = ['#fce1e1','#fad2d3','#f2999a','#ee5b59','#cb2828'];
        var cluster_data = data.map(v => parseInt(v.count));
        cluster_data.pop();
        cluster_data = skmeans(cluster_data,5,[0,1,2,3,4]).idxs;
        console.log(cluster_data);
        data.map(function(v,i){
          v.cluster = cluster_data[i];
          return v;
        })
        
        data.forEach(function(data_elem){
          all_city.some((dom_elem) => {
            if (dom_elem.id.includes(data_elem.city)) {
        
                dom_elem.setAttribute('style', `fill:${red_palette[data_elem.cluster]};opacity:1`);
                dom_elem.onclick = () => alert(dom_elem.id);
                dom_elem.onmouseenter = () => dom_elem.setAttribute('style',  `fill:${red_palette[data_elem.cluster]};opacity:0.5;transition:0.3s`);
                dom_elem.onmouseleave = () => dom_elem.setAttribute('style',  `fill:${red_palette[data_elem.cluster]};opacity:1;transition:0.3s`);
     
              return true;
            }
          });
          
        })
      }
  
    }
  }

  export default CovidMap;