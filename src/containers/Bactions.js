import React from 'react';
import {bActions} from '../css/wrap.css';
import * as Svgs from '../img/Svgs.js';
import { connect } from 'react-redux';
import { thumbup, collect, showCommentList } from '../actions';

class Bactions extends React.Component {
	constructor() {
		super();
		this.switchCollect = this.switchCollect.bind(this);
		this.switchLike = this.switchLike.bind(this);
		this.switchShowComment = this.switchShowComment.bind(this);
		this.state = {};
	}

	switchCollect() {
		const props = this.props;
		props.dispatch(collect(props.id, !props.collected));
	}

	switchLike() {
		const props = this.props;
		props.dispatch(thumbup(props.id, !props.doLike));
	}

	switchShowComment() {
		const props = this.props;
		if(!props.showComment){
			props.dispatch(showCommentList(props.id, 1));
		}
		props.switchShowComment();
	}

	render() {
		const props = this.props;
		return (
			<div className={bActions}>
				<div role="leftArea">
					<button onClick={this.switchLike}>
						{props.doLike ? <Svgs.LikeDone /> : <Svgs.Like />}
						{props.likeNum}
					</button>
					<button onClick={this.switchShowComment}>
						<Svgs.Comment />
						{props.showComment ? '收起' : (props.commentNum + ' 条')}评论
					</button>
					<button onClick={this.switchCollect}>
						{props.collected ? <Svgs.CollectYet /> : <Svgs.Collect />}
						收藏
					</button>
				</div>
				<div role="rightArea">
					<button>
						<Svgs.EditComment />评论
					</button>
					{props.open && <button onClick={props.setOpen}><Svgs.Retract />收起</button>}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state){
    return {};
}

function mapDispatchToProps(dispatch){
    return {
        dispatch: dispatch,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bactions);