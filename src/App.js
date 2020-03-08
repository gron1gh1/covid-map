import React,{useState,useEffect,useRef} from 'react';
import logo from './logo.svg';
import MapSVG from './data/korea_map.svg';
import './App.css';
import {ReactSVG} from 'react-svg';
import axios from 'axios';

function Map()
{
  var [data,SetData] = useState();
  useEffect(() => {
    axios.get('http://localhost:3001/city')
    .then(function (response) {
      SetData(response.data)
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });  
  },[]);

  var data_render = <span>not</span>;
  if(data != null)
      data_render = <span>{data}</span>; 
  return (
    
    
    <div>
     <span>{JSON.stringify(data)}</span>
      <ReactSVG src={MapSVG} beforeInjection={
        svg => {
          var all_city = [];
          all_city = svg.querySelectorAll('polyline');
          console.log(all_city);
          all_city.forEach((v)=>console.log(v.id));
      // svg.getElementsById('daegu').setAttribute
       svg.querySelectorAll('polyline').forEach(function(item,index){
       // item.setAttribute('style','fill:gray');
        
       if(data != null){
          var EntireCount = data[data.length - 1]['death_count'];
          data.forEach(function(elem,i){
            if(item.id === elem.city)
              {
                var color = parseInt((elem.count / EntireCount) * 100);

                var percent = (17*50/i);
                item.setAttribute('style',`fill:hsl(0,100%,${percent+'%'});stroke:lightgray`);
                item.onclick = () => alert(item.id);
                item.onmouseenter = () => item.setAttribute('style',`fill:hsl(0,100%,${(percent + 10)+'%'});stroke:lightgray`);
                item.onmouseleave = () =>  item.setAttribute('style',`fill:hsl(0,100%,${percent+'%'});stroke:lightgray`);
              
              }
            });
         }
      });
        svg.querySelector('path').setAttribute('style','fill:skyblue');
  //  svg.setAttribute('style', 'width: 200px')
  
  }}/>
    </div>
  )

  function getData()
  {
    
      
  }
}
function App() {
  
  return (
    <Map/>
  );
}

export default App;
