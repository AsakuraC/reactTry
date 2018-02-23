import React from 'react';
import MarkDown from 'markdown-react-js';
import Title from '../components/Title';
import Content from '../components/Content';
import Bactions from './Bactions';
import CommentList from './CommentList';
import {readAll} from '../css/wrap.css';

export default class Essay extends React.Component {
	constructor() {
		super();
		this.setOpen = this.setOpen.bind(this);
		this.switchShowComment = this.switchShowComment.bind(this);
		this.state = {
			open: false,
			showComment: false
		}
	}

	setOpen() {
		const open = !this.state.open;
		this.setState({open});
	}

	switchShowComment() {
		const showComment = !this.state.showComment;
		this.setState({showComment});
	}

	render() {
		const props = this.props;
		const state = this.state;
		const content = (<MarkDown text={props.content} />);
		return (
			<React.Fragment>
				<Title>{props.title}</Title>
				<Content>
					{state.open ? content : (props.abstract + '...')}
					&nbsp;
					{!state.open && <button className={readAll} onClick={this.setOpen}>阅读全文</button>}
				</Content>
				<Bactions showComment={state.showComment} switchShowComment={this.switchShowComment} open={state.open} setOpen={this.setOpen} {...props} />
				{state.showComment && <CommentList aid={props.id} commentList={props.commentList} />}
			</React.Fragment>
		);
	}
}