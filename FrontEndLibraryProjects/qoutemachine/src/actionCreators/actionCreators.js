import { GET_A_TWEET, GET_NEW_QUOTE } from '../actions/actions';
import axios from 'axios';

export function getTweet(){
	return{
		type: GET_A_TWEET

	}
}

export function getQuote(){
	return{
		type: GET_NEW_QUOTE
	}
}

//axios call
// axios.get("some route", { some params } )
// .then(response => { 
//     dispatch({
//       type: UPDATE_TWO_THINGS,
//       payload: some_value
//     })
// }) .... catch, etc

// export function getTweet(){
//   return (dispatch) => {
//     dispatch(onGetCompanyStarted());
//     Instance.axiosInstance().get(`/${companyType}/${id}`)
//       .then((response) => {
//         dispatch(onGetCompanySucceeded(response));
//       })
//       .catch((error) => {
//         dispatch(onGetCompanyFailed(error));
//       });
//   };
// } 


// export function deleteCountry(value) {
//     return {
//         type: 'DELETE_COUNTRY',
//         payload: value
//     };
// }