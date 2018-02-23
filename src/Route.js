import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import Mynavbar from './pages/Mynavbar';
import {postUrl, autoLogin} from './publicMethod';
import Logo from './containers/Logo';
import RightWrap from './containers/RightWrap';
import * as Actions from './actions';

import Home from './pages/Home';
import Topics from './pages/Topics';
import ArticleList from './pages/Article/List';
import ArticleWrite from './pages/Article/Write';
import MsgCenter from './pages/MsgCenter';
import Login from './pages/Login';

const mainStyle = {
	paddingTop: '60px',
	position: 'relative'
};

class MyRoute extends React.Component {
	constructor() {
		super();
		this.loginRender = this.loginRender.bind(this);
	}

	componentDidMount() {
		autoLogin(this.props.login).then(ok => {
			if(ok){

			}
		});
	}

	loginRender(props) {
		return (
			<Login {...props} dispatchLogin={this.props.login}  />
		);
	}

  	render() {
  		return (
  		  	<Router>
  		    	<React.Fragment>
  			  		<header>
  			  			<Switch>
			      			<Route path="/login" component={Logo}/>
  			  				<Mynavbar userRelated={this.props.userRelated} />
  			  			</Switch>
  			  		</header>
  			  		<main role="main" className="container" style={mainStyle}>
	      				<Route path="/" component={RightWrap} />
  		      			<Switch>
	  		      			<Route exact path="/" component={Home} />
	  		      			<Route exact path="/article" component={ArticleList}/>
	  		      			<Route path="/article/write" component={ArticleWrite}/>
	  		      			<Route path="/article/:id" component={ArticleList}/>
	  		      			<Route exact path="/topics" component={Topics}/>
	  		      			<Route path="/msgs" component={MsgCenter}/>
			      			<Route path="/login" render={this.loginRender}/>
			      			<Redirect to="/" />
	  		      		</Switch>
  		      		</main>
  		    	</React.Fragment>
  		  	</Router>	
  		);
  	}
}


function mapStateToProps(state){
    return state;
}
function mapDispatchToProps(dispatch){
    return {
        login: bindActionCreators(Actions.login, dispatch),
        logout: () => {
            dispatch(Actions.logout);
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyRoute);
