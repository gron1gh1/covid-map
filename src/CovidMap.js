import React, { useState, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import axios from 'axios';
import skmeans from 'skmeans';
import MapSVG from './data/korea_map.svg';
import { Toast } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

function CovidItem(props)
{
  const [getShow,setShow] = useState(true);
  const toggleShow = () => setShow(!getShow);
    const box_style={
        position: 'absolute',
        left: props.x,
        top: props.y,
        
    }
    if(props.city == null) return null;
    return (
      <Toast style={box_style} animation={true}>
      <Toast.Header>
        <strong className="mr-auto">{props.city}</strong>
      </Toast.Header>
      <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
    </Toast>
    )
}
function CovidMap() {
    var [data, SetData] = useState(null);
    var [render,SetRender] = useState({
      city: null,
      x: 0,
      y: 0
    });
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

    function ShowComponent()
    {
       return <CovidItem x={render.x} y={render.y} city ={render.city}color='black'/>
    }
    return (
      <div class='screen'>
        {ShowComponent()}
        <ReactSVG src={MapSVG} beforeInjection={
          svg => svg_data_load(svg)
        } />
      </div>
    )
    function show_item(elem)
    {
      var rect = elem.getBoundingClientRect();
      var render = {
        city: elem.id,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
     // console.log(dom_elem.getBoundingClientRect()
        SetRender(render)
    }
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

        data.map(function(v,i){
          v.cluster = cluster_data[i];
          return v;
        })
        
        data.forEach(function(data_elem){
          all_city.some((dom_elem) => {
            if (dom_elem.id.includes(data_elem.city)) {
        
                dom_elem.setAttribute('style', `fill:${red_palette[data_elem.cluster]};opacity:1`);
                //dom_elem.onclick = () => show_item(dom_elem);
                dom_elem.onmouseenter = () => 
                {
                  dom_elem.setAttribute('style',  `fill:${red_palette[data_elem.cluster]};opacity:0.5;transition:0.3s`);
                  show_item(dom_elem);
                };
                dom_elem.onmouseleave = () => dom_elem.setAttribute('style',  `fill:${red_palette[data_elem.cluster]};opacity:1;transition:0.3s`);
                return true;
            }
          });
          
        })
      }
  
    }
  }

  export default CovidMap;