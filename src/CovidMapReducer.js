import axios from 'axios'

const initialState = {
    map_data: []
};

const SET_DATA = 'CovidMap/SET_DATA';

export const setData = (data) => {
    return {
        type: SET_DATA,
        data
    }
  }
  

export const fetchData = () => {
    return (dispatch) =>{
        return axios.get('http://localhost:3001/city')
        .then(function (response) {
            console.log(response.data);
            dispatch(setData(response.data));
          //SetData(response.data);
        })
        .catch(error =>{
            throw(error);
        });
    }
}
export default function covidmap(state = initialState,action)
{
    switch(action.type){
        case SET_DATA:
            return{
                ...state,
                map_data: state.map_data.concat(action.data)
            }

        default:
            return state;
    }
}
