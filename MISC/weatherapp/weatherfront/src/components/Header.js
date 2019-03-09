import React from 'react';


const Header = () => {
	return(
		<header id="headerWrap">
			<p id="header">Simple Weather App</p>
			<p className="belowHeader">Built with React.js + Redux, Node.js + Express.js,</p>
			<p className="belowHeader">Google Maps API + Open Weather Map API</p>
		</header>
	)
}


export default Header;