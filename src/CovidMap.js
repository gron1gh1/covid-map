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
        fontWeight: 'bold'
    }
    if(props.show == false) return null;
    return (
      <Toast style={box_style} animation={true}>
      <Toast.Header>
        <strong className="mr-auto">{props.city}</strong>
      </Toast.Header>
      <Toast.Body>확진자 수 : {props.count}<br/>
      사망자 수 : {props.death_count}<br/>
      전날 대비 증감 : +{props.prev}
      
      </Toast.Body>
    </Toast>
    )
}
function CovidMap() {
    var [data, SetData] = useState(null);
    var [render,SetRender] = useState({
      show: false,
        city: null,
        count: 0,
        death_count: 0,
        prev: 0,
        x: 0,
        y: 0
    });
    useEffect(() => {
      axios.get('http://localhost:3001/city')
        .then(function (response) {
          SetData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }, []);

    function ShowComponent()
    {
      if(render.show == true)
        return <CovidItem {...render}/>
    }
    return (
      
      <div class='screen'>

        {data && <CovidItem {...data[data.length -1]} x={10} y={10}/>}
        {ShowComponent()}
        <ReactSVG src={MapSVG} beforeInjection={
          svg => svg_data_load(svg)
        } />
      </div>
    )
    function show_item(e,dom_elem,data_elem,showing)
    {
      var render = {
        show: showing,
        city: dom_elem.id.substring(0,2),
        count: data_elem.count,
        death_count: data_elem.death_count,
        prev: data_elem.prev_day,
        x: e.clientX - 40 ,
        y: e.clientY + 30
      };
     // console.log(dom_elem.getBoundingClientRect()
        SetRender(render)
    }
    function svg_data_load(svg) {
      var all_city = [];
      all_city = Array.from(svg.querySelectorAll('polyline'));
      all_city = all_city.concat(Array.from(svg.querySelectorAll('path')));
  
     // svg.setAttribute('style','height:700px');
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
        
                dom_elem.setAttribute('style', `fill:${red_palette[data_elem.cluster]};opacity:1;stroke:gray`);
                //dom_elem.onclick = (e) => show_item(e,dom_elem);
                dom_elem.onmouseenter = (e) => show_item(e,dom_elem,data_elem,true);
                dom_elem.onmouseleave = (e) => show_item(e,dom_elem,data_elem,false);
                return true;
            }
          });
          
        })
      }
  
    }
  }

  export default CovidMap;