import React, {Component} from 'react';
import Clearfix from 'react-bootstrap/lib/Clearfix';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavItem from 'react-bootstrap/lib/NavItem';
import {Link} from 'react-router-dom';
import {msgWrap} from '../css/Navbar.css';

export default class MsgItem extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<li role="presentation" className={msgWrap}>
				<Link to="/msgs">消息</Link>
				<Clearfix>
			    	<ul className="dropdown-menu open">
			      		<MenuItem header>收到的赞</MenuItem>
			      		<MenuItem>link</MenuItem>
			      		<MenuItem divider />
			      		<MenuItem header>回复我的</MenuItem>
			      		<MenuItem>link</MenuItem>
			      		<MenuItem eventKey={1} href="#">
			        		link that alerts
			      		</MenuItem>
			    	</ul>
		  		</Clearfix>
		  	</li>
		);
	}
}