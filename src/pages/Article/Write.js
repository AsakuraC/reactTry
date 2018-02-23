import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import {postUrl, htmlProcess} from '../../publicMethod';
import Card from '../../containers/Card';
import {leftWrap, writeClass} from '../../css/wrap.css';

export default class Write extends React.Component {
	constructor() {
		super();
		this.publish = this.publish.bind(this);
		this.editTitle = this.editTitle.bind(this);
		this.focus = this.focus.bind(this);
		this.blur = this.blur.bind(this);
		this.state = {
			title: '',
			showTips: true
		}
	}

	publish(e) {
		e.preventDefault();
		const nodeP = document.querySelector('div[name="content"]>p');
		if(!nodeP){
			// TODO:: 弹窗
			return console.log('请输入正文');
		}
		const content = nodeP.innerText;
		const abstract = content.slice(0, 100).match(/[a-zA-Z\u4e00-\u9fa5]/g).join('');
		// const content = htmlProcess.encode(nodeP.innerText);
		const title = this.state.title;

		/*postUrl('url', {
			content,
			title
		}).then(val => {
			if(val){
				// TODO:: 这里要清空文章刷新
			} else {
				// TODO:: 这里提示失败
			}
		})*/
		console.log(content, abstract);
	}

	editTitle(e) {
		this.setState({
			title: e.target.value
		});
	}

	focus() {
		this.setState({
			showTips: false
		}, () => {
			document.querySelector('div[name="content"]>p').focus();
		});
	}

	blur() {
		if(document.querySelector('div[name="content"]>p').innerText.length === 0){
			this.setState({
				showTips: true
			});
		}
	}

	render() {
		const state = this.state;
		return (
			<form className={leftWrap + ' ' + writeClass} onSubmit={this.publish}>
				<Card>
					<input type="text" name="title" value={state.title} placeholder="请输入标题" onChange={this.editTitle} />
					<hr/>
					<div name="content">
						{state.showTips ? (
							<div role="tips" contentEditable onFocus={this.focus}>请输入正文(支持markdown)</div>
						) : (
							<p contentEditable onBlur={this.blur} ></p>
						)}
					</div>
					<div name="submit"><Button type="submit" bsSize="small" bsStyle="primary">发表</Button></div>
				</Card>
			</form>
		);
	}
}