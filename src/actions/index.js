import * as types from './ActionTypes';
import {postUrl} from '../publicMethod';

export const login = (userRelated) => {
	userRelated.collection = new Set(userRelated.collection);
	userRelated.focusTopics = new Set(userRelated.focusTopics);
	return {
		type: types.LOGIN,
		userRelated
	}
}

export const logout = {
	type: types.LOGOUT
}

// 获取用户点赞列表 start
function setUpList(upList){
	return {
		type: types.SET_UP_LIST,
		upList
	}
}

export const getUplist = () => {
	return function(dispatch, getState){
		const state = getState();
		const len = state.waitCheckThumb.length;
		// 这里先假装是服务器返回的
		return Promise.resolve([2]).then(upList => {
			dispatch(clearWaitCheckList(len));
			dispatch(setUpList(upList));
		});
		// 检查state.waitCheckThumb中有没有该用户点赞过的
		// return postUrl('url', {
		// 	data: state.waitCheckThumb,
		// 	uid: state.userRelated.userInfo.id
		// }).then(upList => {
		// 	dispatch(setUpList(upList));
		// 	dispatch(clearWaitCheckList(len));
		// });
	}
}
// 获取用户点赞列表 end

// 设置及清除待获取点赞信息的文章列表 start
function clearWaitCheckList(len){
	return {
		type: types.CLEAR_ART_LIST,
		len
	}
}

function setWaitCheckList(art_qus_list){
	var idList = [];
	for(var item of art_qus_list){
		idList.push(item.id);
	}
	return {
		type: types.ART_QUS_LIST,
		idList
	}
}
// 设置及清除待获取点赞信息的文章列表 end

// 点赞 start
function thumbupSaveLocal(data) {
	return {
		type: types.THUMBUP_LOCAL,
		data
	}
}

function thumbupPostSucc(data) {
	return {
		type: types.THUMBUP_SUCC,
		data
	}
}
export const thumbup = (id, thumbup) => {
	return function(dispatch, getState){
		const state = getState();
		const uid = state.userRelated.userInfo.id;
		const data = {
			uid,
			aid: id,
			thumbup
		};
		dispatch(thumbupSaveLocal(data));
		return Promise.resolve(true).then(val => {
			if(val)
				dispatch(thumbupPostSucc(data));
		});
		// return postUrl('url', data).then(val => {
		// 	if(val)
		// 		dispatch(thumbupPostSucc(data.aid));
		// })
	}
}
// 点赞 end

// 收藏 start
function collectSaveLocal(data) {
	return {
		type: types.COLLECT_LOCAL,
		data
	}
}

function collectPostSucc(data) {
	return {
		type: types.COLLECT_SUCC,
		data
	}
}
export const collect = (id, isCollect) => {
	return function(dispatch, getState){
		const state = getState();
		const uid = state.userRelated.userInfo.id;
		const data = {
			uid,
			aid: id,
			isCollect
		};
		dispatch(collectSaveLocal(data));
		return Promise.resolve(true).then(val => {
			if(val)
				dispatch(collectPostSucc(data));
		});
		// return postUrl('url', data).then(val => {
		// 	if(val)
		// 		dispatch(collectPostSucc(data));
		// })
	}
}
// 收藏 end

// 首页的精选文章 start
function setHomeart(artList) {
	return {
		type: types.SET_HOMEART,
		artList
	}
}

const postHomeart = {
	type: types.POST_HOMEART
}

export const getHomeArticles = (url) => {
	return function(dispatch, getState){
		const state = getState();
		if(state.articles.homeArts.getYet)
			return;
		dispatch(postHomeart);


		const data = [{				//假装是服务器返回的数据
			id: 1,
			title: '这是一个文章的标题',
			abstract: '这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要',
			content: '这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容',
			commentNum: 36,
			likeNum: 247,
		}, {
			id: 2,
			title: '这是一个文章的标题',
			abstract: '这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要',
			content: '## title\nhhh\n```\n<script>;\n\tfhdsjkfasd;\n</script>;\n```\n<script>console.log("hhh")</script>',
			commentNum: 36,
			likeNum: 247,
		}];
		return Promise.resolve(data).then(data => {
			if(data){
				dispatch(setAllContent(data));
				var waitListData = setWaitCheckList(data);
				dispatch(setHomeart(waitListData.idList));
				dispatch(waitListData);
			}
		});

		// return postUrl(url).then(data => {
		// 	if(data){
		// 		dispatch(setHomeart(data));
		//		dispatch(setWaitCheckList(data));
		// 	}
		// });
	}
}
// 首页的精选文章 end


// 文章页的列表 start
function setArticle(artList) {
	return {
		type: types.SET_ARTICLE,
		artList
	}
}

const postArticle = {
	type: types.POST_ARTICLE
}

export const getArticles = (url, mount) => {
	return function(dispatch, getState){
		const articles = getState().articles.articles;
		if(mount && articles.getYet || articles.over)
			return;
		dispatch(postArticle);

		const data = [{				//假装是服务器返回的数据
			id: 1,
			title: '这是一个文章的标题',
			abstract: '这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要',
			content: '这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容',
			commentNum: 36,
			likeNum: 247,
		}, {
			id: 2,
			title: '这是一个文章的标题',
			abstract: '这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要',
			content: '## title\nhhh\n```\n<script>;\n\tfhdsjkfasd;\n</script>;\n```\n<script>console.log("hhh")</script>',
			commentNum: 36,
			likeNum: 247,
		}, {
			id: 5,
			title: '这是一个文章的标题',
			abstract: '这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要',
			content: '这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容',
			commentNum: 36,
			likeNum: 247,
		}, {
			id: 8,
			title: '这是一个文章的标题',
			abstract: '这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要',
			content: '这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容',
			commentNum: 36,
			likeNum: 247,
		}];
		return Promise.resolve(data).then(data => {
			if(data){
				dispatch(setAllContent(data));
				var waitListData = setWaitCheckList(data);
				dispatch(setArticle(waitListData.idList));
				dispatch(waitListData);
			}
		});
		// return postUrl(url).then(data => {
		// 	if(data){
		// 		dispatch(setArticle(data));
		//		dispatch(setWaitCheckList(data));
		// 	}
		// });
	}
}
// 文章页的列表 end

// 问答页的列表 start
function setTopics(topicList) {
	return {
		type: types.SET_TOPICS,
		topicList
	}
}

const postTopics = {
	type: types.POST_TOPICS
}

export const getTopics = (url, mount) => {
	return function(dispatch, getState){
		const topics = getState().articles.topics;
		if(mount && topics.getYet || topics.over)
			return;
		dispatch(postTopics);


		const data = [{				//假装是服务器返回的数据
			id: 3,
			title: '这是一个文章的标题',
			abstract: '这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要',
			content: '这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容',
			commentNum: 36,
			likeNum: 247,
		}, {
			id: 4,
			title: '这是一个文章的标题',
			abstract: '这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要',
			content: '这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容',
			commentNum: 36,
			likeNum: 247,
		}, {
			id: 6,
			title: '这是一个文章的标题',
			abstract: '这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要',
			content: '这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容',
			commentNum: 36,
			likeNum: 247,
		}, {
			id: 7,
			title: '这是一个文章的标题',
			abstract: '这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要这是一个文章的摘要',
			content: '这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容这是整片文章的内容',
			commentNum: 36,
			likeNum: 247,
		}];
		return Promise.resolve(data).then(data => {
			if(data){
				dispatch(setAllContent(data));
				var waitListData = setWaitCheckList(data);
				dispatch(setTopics(waitListData.idList));
				dispatch(waitListData);
			}
		});
		// return postUrl(url).then(data => {
		// 	if(data){
		// 		dispatch(setTopics(data));
		//		dispatch(setWaitCheckList(data));
		// 	}
		// });
	}
}
// 问答页的列表 end

function setAllContent(list){
	return {
		type: types.SET_ALLCONTENT,
		list
	}
}

// 评论列表 start
function setCommentList(data){
	return {
		type: types.SHOW_COMMENT_LIST,
		data
	}
}
export const showCommentList = (aid, page) => {
	return function(dispatch, getState){
		const state = getState();
		if(page === 1 && state.commentListObj[aid])
			return;

		const data = [{
			id: 1,
			content: '这是一个评论这是一个评论这是一个评论评论',
			time: 1518488031,
			user: {
				id: 1,
				name: 'fsdf'
			},
		}, {
			id: 2,
			content: '这是一个评论这是一个评论这是一个评论评论',
			time: 1518488031,
			user: {
				id: 1,
				name: 'fsdf'
			},
		}];
		return Promise.resolve(data).then(commentList => {
			dispatch(setCommentList({aid, commentList}));
		});
		// return postUrl('url', {aid, page}).then(commentList => {
		// 	dispatch(setCommentList({aid, commentList}));
		// });
	}

}
// 评论列表 end
