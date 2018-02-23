import React from 'react';
import {leftWrap} from '../css/wrap.css';
import Card from '../containers/Card';
import Essay from '../containers/Essay';
import Title from '../components/Title';
import { connect } from 'react-redux';
import { getHomeArticles } from '../actions';

function Hello(props){
	return (
		<Card>
			<Title>Hello World!</Title>
			<p>这只是一句随便写写的话，这只是一句随便写写的话这只是一句随便写写的话这只是一句随便写写的话这只是一句随便写写的话这只是一句随便写写的话这只是一句随便写写的话</p>
		</Card>
	);
}

class Home extends React.Component {
	componentDidMount(){
		// TODO:: post请求内容
		this.props.dispatch(getHomeArticles('hhh'));
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
				<Hello />
				<div role="column">精选文章</div>
				{articles}

			</div>
		);
	}
}

function mapStateToProps(state){
    return {
    	articles: state.articles.homeArts.items,
    	allContent: state.articles.allArticleTopicObj,
    	userRelated: state.userRelated,
    	commentListObj: state.commentListObj,
    };
}
function mapDispatchToProps(dispatch){
    return {
        dispatch: dispatch,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);