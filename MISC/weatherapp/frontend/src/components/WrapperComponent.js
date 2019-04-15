import React from 'react';
import Header from './Header';
import Footer from './Footer';
import InputField from './InputField';
import WeatherField from './WeatherField';


const WrapperComponent = () => {
	return(
		<div id="wrapper">
			<Header />
			<main id="mainSection">
				<InputField />
				<WeatherField />
			</main>
			<Footer />
		</div>
	)
}

export default WrapperComponent;