import React from 'react';
import {CardClass} from '../css/wrap.css';

export default function Card(props) {
	return (
		<div className={CardClass}>
			{props.children}
		</div>
	);
}