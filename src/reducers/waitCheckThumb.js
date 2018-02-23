import {ART_QUS_LIST, CLEAR_ART_LIST} from '../actions/ActionTypes';

export default function topics(state = [], action){
	switch(action.type){
	    case ART_QUS_LIST:
	    	return state.concat(action.idList);

	    case CLEAR_ART_LIST:
	    	return state.slice(action.len);

	    default:
	        return state;
	}
}