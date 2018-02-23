import React from 'react';
import {leftWrap} from '../css/wrap.css';
import Card from '../containers/Card';
import Essay from '../containers/Essay';
import Title from '../components/Title';
import { connect } from 'react-redux';
import { getTopics } from '../actions';
import { bindActionCreators } from 'redux';

class Topics extends React.Component {
	componentDidMount(){
		// TODO:: post请求内容
		console.log(this.props);
		this.props.getTopics('hhh', true);
	}

	render() {
		const props = this.props;
		var userRelated = props.userRelated || {collection: new Set(), upList: new Set()};
		const topics = props.topics.map((id) => {
			var val = props.allContent[id];
			var commentList = props.commentListObj[id] || [];
			return (
				<Card key={id}>
					<Essay {...val} collected={userRelated.collection.has(id)} doLike={userRelated.upList.has(id)} commentList={commentList} />
				</Card>
			);
		});
		return (
			<div className={leftWrap}>
				{topics}
				{topics}
				{topics}
			</div>
		);
	}
}

function mapStateToProps(state){
    return {
    	topics: state.articles.topics.items,
    	allContent: state.articles.allArticleTopicObj,
    	userRelated: state.userRelated,
    	commentListObj: state.commentListObj,
    };
}
function mapDispatchToProps(dispatch){
    return {
        getTopics: bindActionCreators(getTopics, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Topics);