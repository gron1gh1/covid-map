import React, {Component} from 'react';
import {connect} from 'react-redux';
import CovidMap from './CovidMap';
import {load} from './CovidMapRedux';
import { useEffect } from 'react';

function CovidMapContainer(props){
    const handleLoad = () =>{
        props.map_load();
    };

    const {map_data} = props;
    return (
      <CovidMap map_data={map_data} map_load={handleLoad}/>
    )
}

const mapStateToProps = ({CovidMapRedux}) => ({
    map_data: CovidMapRedux.map_data,
});
const mapDispatchToProps = dispatch => {
    return {
        map_load: () => dispatch(load()),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CovidMapContainer);