import axios from 'axios';

const LOAD = 'covidmap/SET_DATA';

export const set_data = (data) => ({type:LOAD,data});

const initState = {
    map_data: []
}

export default function CovidMapRedux(state = initState,action)
{
    switch(action.type){
        case LOAD:
            // axios.get('http://localhost:3001/city')
            // .then(function (response) {
            //     console.log(response.data);

            //     return{
            //         ...state,
            //         map_data: state.map_data.concat(response.data),
            //     }
            //   //SetData(response.data);
            // })
            // .catch(function (error) {
            //   return state;
            // })
           return {
               ...state,
               map_data: state.map_data.concat(action.data)
           }
        default:
            return state;
    }
}