import React,{useState,useEffect,useRef} from 'react';
import logo from './logo.svg';
import MapSVG from './data/korea_map.svg';
import './App.css';
import {ReactSVG} from 'react-svg';
import request from 'request';

function Map()
{
  useEffect(() => {

  },[]);
  return (
    <div>
      <ReactSVG src={MapSVG} beforeInjection={svg => {
    console.log(svg.querySelectorAll('polyline'))
    svg.querySelectorAll('polyline').forEach(function(item,index){
    
      item.setAttribute('style','fill:#000000');
    });
    svg.querySelector('path').setAttribute('style','fill:skyblue');
  //  svg.setAttribute('style', 'width: 200px')
  
  }} onClick={rq} />
    </div>
  )

  function rq()
  {
    request('http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13', function (error, response, body) {
      console.error('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
    });
  }
}
function App() {
  
  return (
    <Map/>
  );
}

export default App;
