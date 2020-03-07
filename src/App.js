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
      // svg.getElementsById('daegu').setAttribute
       svg.querySelectorAll('polyline').forEach(function(item,index){
       // item.setAttribute('style','fill:gray');
 
       if(data != null){
          data.forEach(function(elem,i){
            if(item.id === elem.city)
              {
                var color = 255 - parseInt((elem.count / 6746) * 255);
                console.log(color);
                if(color < 250)
                  item.setAttribute('style',`fill:rgb(255,${color},${color})`)

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
