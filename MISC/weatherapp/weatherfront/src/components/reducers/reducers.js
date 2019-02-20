import { 
	WEATHER_INFO_FAILURE,
	WEATHER_INFO_SUCCESS,
	WEATHER_INFO_START
} from '../actions/actions';

const initialState = {
	geoData: null,
	weatherData: null,
	error: null,
	expecting: false
}

export default (state=initialState, action) => {
	//console.warn('from reducer', state, action);
	switch(action.type){
		case WEATHER_INFO_START:
			return{
				...state,
				geoData: null,
				weatherData: null,
				expecting: true,
				error: null,
			}
		case WEATHER_INFO_SUCCESS:
			return{
				...state,
				geoData: action.payload.data.geoData,
				weatherData: action.payload.data.weatherData,
				expecting: false
			};
		case WEATHER_INFO_FAILURE:
			return{
				...state,
				error: action.payload,
				expecting: false
			}
		default:
			return state;
	}
}