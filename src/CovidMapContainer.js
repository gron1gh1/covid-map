import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import CovidMap from './CovidMap';
import {setData, fetchData} from './CovidMapReducer';
import { useEffect } from 'react';


export default function CovidMapContainer(props){
    const dispatch = useDispatch();
    const map_data = useSelector((state)=>state.covidmap.map_data);

    useEffect(()=>{
      
        dispatch(fetchData());
        console.log(map_data);
    },[])
    return (
      <CovidMap map_data={map_data}/>
    )
}
