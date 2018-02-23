import React from 'react';

export default function Title(props){
	const fontSize = props.size ? props.size : '16' + 'px';
	const style = {
		fontSize,
		color: '#111',
		cursor: 'pointer',
		fontWeight: 600,
	}
	return (
		<div style={style}>{props.children}</div>
	);
}