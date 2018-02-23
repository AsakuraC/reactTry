import React from 'react';
import {Link} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import {navTitle} from '../css/Navbar.css';
import MsgItem from '../containers/MsgItem';

export default class Mynavbar extends React.Component {
	constructor() {
		super();
		this.hoverUser = this.hoverUser.bind(this);
	}

	hoverUser(e) {
		console.log(e, "user is Hover");
	}

	render() {
		if(this.props.userRelated){
			var userShow = (
    			<Nav pullRight>
					<MsgItem />
					<LinkContainer to="/user">
						<NavItem eventKey={2}>用户</NavItem>
					</LinkContainer>
      			</Nav>
		    );
		}else{
			var userShow = (
    			<Nav pullRight>
					<LinkContainer to="/login">
						<NavItem eventKey={1}>登录</NavItem>
					</LinkContainer>
      			</Nav>
			);
		}

		return (
			<Navbar fixedTop collapseOnSelect style={{backgroundColor: '#fff'}}>
    			<Navbar.Header className={navTitle}>
      				<Navbar.Brand>
        				<Link to="/">Essay</Link>
      				</Navbar.Brand>
      				<Navbar.Toggle />
    			</Navbar.Header>
    			<Navbar.Collapse>
	    			<Nav>
	    				<LinkContainer to="/article">
	      					<NavItem eventKey={1}>文章</NavItem>
	    				</LinkContainer>
	    				<LinkContainer to="/topics">
	      					<NavItem eventKey={2}>wait..</NavItem>
	    				</LinkContainer>
	      				<NavDropdown eventKey={3} title="wait..." id="nav-dropdown">
	    					<LinkContainer to="/">
	        					<MenuItem eventKey={3.1}>wait...</MenuItem>
	    					</LinkContainer>
	        				<MenuItem divider />
	        				<MenuItem eventKey={3.2}>wait...</MenuItem>
	      				</NavDropdown>
	    			</Nav>
    				{userShow}
    			</Navbar.Collapse>
  			</Navbar>
		);
	}
}