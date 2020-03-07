import React,{useState,useEffect,useRef} from 'react';
import logo from './logo.svg';
import MapSVG from './data/korea_map.svg';
import './App.css';
import {ReactSVG} from 'react-svg';


function Map()
{
  const mapRef = useRef();
  useEffect(() => {
     console.log(mapRef.current);
  },[]);
  return (
    <div>
      <ReactSVG src={MapSVG} beforeInjection={svg => {
    console.log(svg.querySelectorAll('polyline'))
    svg.querySelectorAll('polyline').forEach(function(item,index){
    
      item.setAttribute('style','fill:#white');
    })
  //  svg.setAttribute('style', 'width: 200px')
  
  }} />
    </div>
  )
}
function App() {
  
  return (
    <Map />
  );
}

export default App;
