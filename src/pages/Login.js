import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, Button, HelpBlock, Checkbox} from 'react-bootstrap';
import {Link, withRouter} from 'react-router-dom';
import md5 from 'js-md5';
import {loginFrom} from '../css/Navbar.css';
import {postUrl, setCookie} from '../publicMethod';

// 检测输入是否合法
function checkContent(content){
	var regexp = /[^.\w]/g;
	return !regexp.test(content);
}

class Login extends Component {
	constructor() {
		super();
		this.login = this.login.bind(this);
		this.setValidateUser = this.setValidateUser.bind(this);
		this.setValidatePassword = this.setValidatePassword.bind(this);
		this.setValidateEmail = this.setValidateEmail.bind(this);
		this.useWx = this.useWx.bind(this);
		this.switchLog = this.switchLog.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.signUp = this.signUp.bind(this);
		this.state = {
			isLoading: false,
			isLog: true,
			user: '',
			password: '',
			email: '',
			checkAuto: false
		}
	}

	switchLog() {
		var isLog = !this.state.isLog;
		this.setState({isLog});
	}

	useWx() {
		// TODO:: 使用微信登录
		console.log('useWx');
	}

	login(e) {
		e.preventDefault();
		var state = this.state;
		if(state.isLoading || state.user.length < 2 || state.password < 6)
			return;
		this.setState({isLoading: true});
		const USERLOGINFO = md5(state.user + '_' + state.password);
		const time = ((+new Date()) / 1000) >> 0;
		postUrl('user/login', {
			info: USERLOGINFO,
			time
		}).then(val => {
			this.setState({isLoading: false});
			if(val === false)
				return;
			if(state.checkAuto){
				setCookie('USERLOGINFO', USERLOGINFO);
			}
			this.props.dispatchLogin(val);
			this.props.history.push('/');
		});
	}

	signUp(e) {
		e.preventDefault();
		var state = this.state;
		if(!state.isLoading && this.setValidateUser() === 'success' && this.setValidatePassword() === 'success' && this.setValidateEmail() === 'success'){
			if(checkContent(state.user) && checkContent(state.password)){
				this.setState({isLoading: true});
				postUrl('user/signup', {
					username: state.user,
					password: state.password,
					email: state.email
				}).then(data => {
					this.setState({isLoading: false});
					if(data){
						this.props.dispatchLogin(data);
						this.props.history.push('/');
					}
				});
			}
			// TODO:: 弹窗提示
		}
		// TODO:: 这里需要弹个窗
		return ;
	}

	setValidateUser() {
		const len = this.state.user.length;
		if(len == 0)
			return null;
		else if(len > 1 && len < 13)
			return 'success';
		return 'warning';
	}

	setValidatePassword() {
		const len = this.state.password.length;
		if(len == 0)
			return null;
		else if(len < 6)
			return 'warning';
		return 'success';
	}

	setValidateEmail() {
		const email = this.state.email;
		if(email.length === 0)
			return null;
		if(email.search(/^[\w]+[-.]*[\w]*@[\w]+\.[\w]+$/g) > -1){
			return 'success';
		}
		return 'warning';
	}

	handleChange(e) {
		var target = e.target;
		var value = target.type === 'checkbox' ? target.checked : target.value;
		this.setState({[target.name]: value});
	}

	renderForm() {
		var state = this.state;
		if(state.isLog)
			// TODO:: 邮箱登录- -
			return (
				<form onSubmit={this.login}>
					<FormGroup controlId="user" validationState={null}>
				      	<ControlLabel>账号</ControlLabel>
					    <FormControl type="text" name="user" placeholder="用户名" value={state.user} onChange={this.handleChange} />
				    </FormGroup>
					<FormGroup controlId="password" validationState={null}>
				      	<ControlLabel>密码</ControlLabel>
					    <FormControl type="password" name="password" placeholder="密码" maxLength="16" value={state.password} onChange={this.handleChange} />
				    </FormGroup>
				    <FormGroup style={{display:"flex", justifyContent: 'space-between', marginBottom: '25px'}}>
						<Checkbox inline name="checkAuto" checked={state.checkAuto} onChange={this.handleChange}>自动登录</Checkbox>
						<Link to="/password_reset">忘记密码?</Link>
				    </FormGroup>
				    <Button type="submit" bsStyle="primary" block>
				        {state.isLoading ? '登录中...' : '登录'}
			        </Button>
				</form>
			);
		return (
			<form onSubmit={this.signUp}>
				<FormGroup controlId="user" validationState={this.setValidateUser()}>
			      	<ControlLabel>账号</ControlLabel>
				    <FormControl type="text" name="user" placeholder="请输入用户名" value={state.user} onChange={this.handleChange} />
				    <FormControl.Feedback />
			    </FormGroup>
				<FormGroup controlId="email" validationState={this.setValidateEmail()}>
			      	<ControlLabel>邮箱</ControlLabel>
				    <FormControl type="text" name="email" placeholder="请输入邮箱" value={state.email} onChange={this.handleChange} />
				    <FormControl.Feedback />
			    </FormGroup>
				<FormGroup controlId="password" validationState={this.setValidatePassword()} style={{marginBottom: '25px'}}>
			      	<ControlLabel>密码</ControlLabel>
				    <FormControl type="password" name="password" placeholder="请输入密码" maxLength="16" value={state.password} onChange={this.handleChange} />
				    <FormControl.Feedback />
			    </FormGroup>
			    <Button type="submit" bsStyle="primary" block>
			        {state.isLoading ? '注册中...' : '注册'}
		        </Button>
			</form>
		);
	}

	render() {
		var isLog = this.state.isLog;
		return (
			<div role="formWrap" className={loginFrom}>
				{this.renderForm()}
				<div >
					<span onClick={this.useWx}>使用微信登录</span>
					<div style={{float: 'right'}}>{isLog ? '没' : '已'}有账号?<span style={{color: '#337ab7'}} onClick={this.switchLog}>{isLog ? '注册' : '登录'}</span></div>
				</div>
			</div>
		);
	}
}

export default withRouter(Login);