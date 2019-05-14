import { 
	WEATHER_INFO_FAILURE,
	WEATHER_INFO_SUCCESS,
	WEATHER_INFO_START,
	AUTO_INFO_START,
	AUTO_INFO_SUCCESS,
	AUTO_INFO_FAILURE,
	IP_ADDRESS_LOOKUP,
	GET_FORECAST_BEGIN,
	GET_FORECAST_SUCCESS,
	GET_FORECAST_FAILED,
	SET_WEATHER_GRAPH_DATA
} from '../actions/actions';

const initialState = {
	geoData: null,
	weatherData: null,
	error: null,
	is_Loading: false,
	autodetect: false,
	latlng: null,
	geoResults: null,
	weatherForecast: null,
	timeWeatherObject: null
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
				autodetect: false,
				latlng: null,
				geoResults: null,
				weatherForecast: null,
				timeWeatherObject: null
			};
		case WEATHER_INFO_SUCCESS:
			return{
				...state,
				geoData: action.payload.data.geoData,
				weatherData: action.payload.data.weatherData,
				is_Loading: false,
				error: null,
				autodetect: false,
				latlng: null,
				geoResults: action.payload.data.geoResults
			};
		case WEATHER_INFO_FAILURE:
			return{
				...state,
				error: action.payload,
				geoData: null,
				weatherData: null,
				is_Loading: false,
				autodetect: false,
				latlng: null,
				geoResults: null,
				timeWeatherObject: null
			};
		case AUTO_INFO_START:
			return{
				...state,
				geoData: null,
				weatherData:null,
				is_Loading: true,
				error: null,
				autodetect: true,
				latlng: null,
				geoResults: null,
				weatherForecast: null,
				timeWeatherObject: null
			};
		case AUTO_INFO_SUCCESS:
			return{
				...state,
				geoData: action.payload.data.geoData,
				weatherData: action.payload.data.weatherData,
				is_Loading: false,
				error: null,
				autodetect: false,
				latlng: null,
				geoResults: action.payload.data.geoResults
			};
		case AUTO_INFO_FAILURE:
			return{
				...state,
				error: action.payload,
				geoData: null,
				weatherData: null,
				is_Loading: false,
				autodetect: false,
				latlng: null,
				geoResults: null,
				timeWeatherObject: null
			};
		case IP_ADDRESS_LOOKUP:
			return{
				...state,
				latlng: action.payload
			}
		case GET_FORECAST_BEGIN:
			return{
				...state,
				weatherData:null,
				is_Loading: true,
				error: null,
				autodetect: false,
				latlng: null,
				weatherForecast: null
			}
		case GET_FORECAST_SUCCESS:
			return{
				...state,
				is_Loading: false,
				weatherForecast: action.payload
			}
		case GET_FORECAST_FAILED:
			return{
				...state,
				weatherData: null,
				is_Loading: false,
				autodetect: false,
				weatherForecast: null,
				latlng: null,
				error: action.payload,
				timeWeatherObject: null
			}
		case SET_WEATHER_GRAPH_DATA:
			return{
				...state,
				is_Loading:false,
				timeWeatherObject: action.payload
			}
		default:
			return state;
	}
}