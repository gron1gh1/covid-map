import axios from 'axios';

const LOAD = 'covidmap/LOAD';

export const load = () => ({type:LOAD});

const initState = {
    map_data: []
}
export default function CovidMapRedux(state = initState,action)
{
    switch(action.type){
        case LOAD:
            axios.get('http://localhost:3001/city')
                .then(function (response) {
                    console.log(response.data);

                    return{
                        ...state,
                        map_data: state.map_data.concat(response.data),
                    }
                  //SetData(response.data);
                })
                .catch(function (error) {
                  return state;
                })
        default:
            return state;
    }
}