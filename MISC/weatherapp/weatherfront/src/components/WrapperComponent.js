import React from 'react';
import Header from './Header';
import Footer from './Footer';
import InputField from './InputField';


const WrapperComponent = () => {
	return(
		<div>
			<Header />
			<InputField />
			<Footer />
		</div>
	)
}

export default WrapperComponent;