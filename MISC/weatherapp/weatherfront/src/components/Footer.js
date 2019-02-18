import React from 'react';

const Footer = () => {
	return(
		<div id="footerWrap">
			<footer id="footer">
				&copy; {new Date().getFullYear()} Developped by Nik
			</footer>
		</div>
	)
}

export default Footer;