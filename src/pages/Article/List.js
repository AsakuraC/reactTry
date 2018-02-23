import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getArticles } from '../../actions';
import Card from '../../containers/Card';
import Essay from '../../containers/Essay';
import Title from '../../components/Title';
import {leftWrap} from '../../css/wrap.css';

class List extends React.Component {
	componentDidMount() {
		// TODO:: post请求内容
		this.props.getArticles('hhh', true);
	}

	render() {
		const props = this.props;
		var userRelated = props.userRelated || {collection: new Set(), upList: new Set()};
		const articles = props.articles.map((id) => {
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
				{articles}
			</div>
		);
	}
}

function mapStateToProps(state){
    return {
    	articles: state.articles.articles.items,
    	allContent: state.articles.allArticleTopicObj,
    	userRelated: state.userRelated,
    	commentListObj: state.commentListObj,
    };
}
function mapDispatchToProps(dispatch){
    return {
        getArticles: bindActionCreators(getArticles, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);