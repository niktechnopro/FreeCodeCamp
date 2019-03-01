import { 
	WEATHER_INFO_FAILURE,
	WEATHER_INFO_SUCCESS,
	WEATHER_INFO_START,
	AUTO_INFO_START,
	AUTO_INFO_SUCCESS,
	AUTO_INFO_FAILURE
} from '../actions/actions';

const initialState = {
	geoData: null,
	weatherData: null,
	error: null,
	is_Loading: false
}

export default (state=initialState, action) => {
	//console.warn('from reducer', state, action);
	switch(action.type){
		case WEATHER_INFO_START:
			return{
				...state,
				geoData: null,
				weatherData: null,
				is_Loading: true,
				error: null,
			};
		case WEATHER_INFO_SUCCESS:
			return{
				...state,
				geoData: action.payload.data.geoData,
				weatherData: action.payload.data.weatherData,
				is_Loading: false,
				error: null
			};
		case WEATHER_INFO_FAILURE:
			return{
				...state,
				error: action.payload,
				geoData: null,
				weatherData: null,
				is_Loading: false
			};
		case AUTO_INFO_START:
			return{
				...state,
				geoData: null,
				weatherData:null,
				is_Loading: true,
				error: null,
			};
		case AUTO_INFO_SUCCESS:
			return{
				...state,
				geoData: action.payload.data.geoData,
				weatherData: action.payload.data.weatherData,
				is_Loading: false,
				error: null
			};
		case AUTO_INFO_FAILURE:
			return{
				...state,
				error: action.payload,
				geoData: null,
				weatherData: null,
				is_Loading: false
			}
		default:
			return state;
	}
}