import React,{useState,useEffect,useRef} from 'react';
import logo from './logo.svg';
import MapSVG from './data/korea_map.svg';
import './App.css';
import {ReactSVG} from 'react-svg';
import axios from 'axios';

function Map()
{
  var [data,SetData] = useState(null);

  useEffect(() => {
   // axios.get('http://localhost:3001/city')
	  axios.get("http://covidapi.run.goorm.io/city")
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
        svg => svg_data_load(svg)
  }/>
    </div>
  )
  function svg_data_load(svg)
	{
         var all_city = [];
          all_city = Array.from(svg.querySelectorAll('polyline'));
		  all_city = all_city.concat(Array.from(svg.querySelectorAll('path')));


       if(data){
          var EntireCount = data[data.length - 1]['death_count'];
		   
          data.forEach(function(elem,i){
			  
			  var find_elem;
				  all_city.some((v)=>{
                   if(v.id.includes(elem.city))
					{
                         find_elem=v;
						return true;
                    }
              });

            if(find_elem)
              {
                var color = parseInt(((data.count-1) / EntireCount) * 100);
                var percent = (17*50/i);
                find_elem.setAttribute('style',`fill:hsl(0,100%,${percent+'%'});stroke:lightgray`);
                find_elem.onclick = () => alert(find_elem.id);
                find_elem.onmouseenter = () => find_elem.setAttribute('style',`fill:hsl(0,100%,${(percent + 10)+'%'});stroke:lightgray`);
                find_elem.onmouseleave = () =>  find_elem.setAttribute('style',`fill:hsl(0,100%,${percent+'%'});stroke:lightgray`);
              
              }
            });
    }
 
}
}
function App() {
  
  return (
    <Map/>
  );
}

export default App;
