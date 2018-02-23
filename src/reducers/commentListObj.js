import {SHOW_COMMENT_LIST} from '../actions/ActionTypes';

export default function commentListObj(state = {}, action){
	switch(action.type) {
		case SHOW_COMMENT_LIST:
			var aid = action.data.aid;
			var commentList = state[aid] || [];
			commentList = commentList.concat(action.data.commentList);;
			return Object.assign({}, state, {[aid]: commentList});
			
		default:
			return state;
	}
}