import React from 'react';
import {CardClass,comListClass} from '../css/wrap.css';
import Comment from '../components/Comment';

export default class CommentList extends React.Component {
	componentDidMount() {
		
	}

	render() {
		const {commentList, aid} = this.props;
		const commentListShow = commentList.map((val) => {
			return <Comment key={val.id} {...val} />;
		});
		return (
			<div className={CardClass + ' ' + comListClass}>
				{commentListShow}
			</div>
		);
	}
}