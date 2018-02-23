import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const logoStyle = {
	fontSize: '30px',
	padding: '10px 20px',
	fontFamily: 'serif',
	fontWeight: 'bold',
};

export default class Logo extends Component {
	render() {
		return (
			<div style={logoStyle}><Link to="/" style={{textDecoration:'none'}}>Essay</Link></div>
		);
	}
}