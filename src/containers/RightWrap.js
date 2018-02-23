import React from 'react';
import {Link} from 'react-router-dom';
import Card from './Card';
import {rightWrap} from '../css/wrap.css';
import {CollectYet} from '../img/Svgs';


export default class RightWrap extends React.Component {
	render() {
		return (
			<div className={rightWrap}>
				<Card>
					<Link to="/user/myCollection">
						<CollectYet />
						<span>wait...</span>
						<span>45</span>
					</Link>
					<Link to="/user/myFocus">
						<CollectYet />
						<span>wait...</span>
						<span>3</span>
					</Link>
				</Card>
				<Card>
					<Link to="/article/write">写文章</Link>
					<Link to="/topics/submit">wait...</Link>
				</Card>
			</div>
		);
	}
}