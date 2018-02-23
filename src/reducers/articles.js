import * as types from '../actions/ActionTypes';
import { combineReducers } from 'redux';

const initState = {
	homeArts: {
		getYet: false,
		items: []
	},
	articles: {
		getYet: false,
		page: 0,
		over: false,
		items: []
	},
	topics: {
		getYet: false,
		page: 0,
		over: false,
		items: []
	}
}

function homeArts(state = initState.homeArts, action){
	switch(action.type){
	    case types.POST_HOMEART:
	    	return Object.assign({}, state, {getYet: true});

	    case types.SET_HOMEART:
	    	let items = state.items.concat(action.artList);
	        return Object.assign({}, state, {items});

	    default:
	        return state;
	}
}

function articles(state = initState.articles, action){
	switch(action.type){
	    case types.POST_ARTICLE:
	    	if(state.getYet)
	    		return state;
	    	else
	    		return Object.assign({}, state, {getYet: true});

	    case types.SET_ARTICLE:
	    	const items = state.items.concat(action.artList);
	    	const page = state.page + 1;
	    	const over = action.artList.length < 10 ? true : false;
	    	// TODO:: 暂定一页十个
	        return Object.assign({}, state, {items, page, over});

	    default:
	        return state;
	}
}

function topics(state = initState.topics, action){
	switch(action.type){
	    case types.POST_TOPICS:
	    	if(state.getYet)
	    		return state;
	    	else
	    		return Object.assign({}, state, {getYet: true});

	    case types.SET_TOPICS:
	    	const items = state.items.concat(action.topicList);
	    	const page = state.page + 1;
	    	const over = action.topicList.length < 10 ? true : false;
	    	// TODO:: 暂定一页十个
	        return Object.assign({}, state, {items, page, over});

	    default:
	        return state;
	}
}

function allArticleTopicObj(state = {}, action){
	switch(action.type){
		case types.SET_ALLCONTENT:
			var newState = Object.assign({}, state);
			for(var val of action.list){
				newState[val.id] = val;
			}
			return newState;

		case types.THUMBUP_LOCAL:  			// 点赞的时候这里也要改
			var newState = Object.assign({}, state);
			var {aid, thumbup} = action.data;
			if(thumbup)
				newState[aid].likeNum++;
			else
				newState[aid].likeNum--;
			return newState;

		default: 
			return state;
	}
}

export default combineReducers({
	homeArts,
	articles,
	topics,
	allArticleTopicObj
})