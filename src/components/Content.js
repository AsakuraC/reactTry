import React from 'react';

var style = {
	marginTop: '10px',
	lineHeight: '1.6em',
};

export default function Content(props){
	return (
		<div style={style}>{props.children}</div>
	);
}