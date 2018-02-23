import * as types from '../actions/ActionTypes';

export default function(state = false, action){
	switch(action.type){
	    case types.LOGIN:
	        return Object.assign({}, state, action.userRelated, {upList: new Set()});

	    case types.LOGOUT:
	        return false;

	    case types.SET_UP_LIST:
	    	var upList = new Set([...state.upList, ...action.upList]);
	    	return Object.assign({}, state, {upList});

	    case types.THUMBUP_LOCAL: 		//点赞，改变状态，并存本地
	    	// 存localStorage
	    	var thumbupData = localStorage.getItem('thumbup_data');
	    	thumbupData = thumbupData ? JSON.parse(thumbupData) : {};
	    	var data = action.data;
	    	thumbupData[data.uid] = Object.assign({}, thumbupData[data.uid], {
    			[data.aid]: data.thumbup
    		});
	    	localStorage.setItem('thumbup_data', JSON.stringify(thumbupData));
	    	// 改state.upList
	    	var upList = new Set([...state.upList]);
	    	if(data.thumbup)
	    		upList.add(data.aid);
	    	else
	    		upList.delete(data.aid);
	        return Object.assign({}, state, {upList});

	    case types.THUMBUP_SUCC: 		// 点赞, 远程数据库更改成功
	    	var thumbupData = localStorage.getItem('thumbup_data');
	    	thumbupData = thumbupData ? JSON.parse(thumbupData) : {};
	    	var data = action.data;
	    	delete thumbupData[data.uid][data.aid];
	    	localStorage.setItem('thumbup_data', JSON.stringify(thumbupData));
	        return state;

	    case types.COLLECT_LOCAL:
	    	// 存localStorage
	    	var collectionData = localStorage.getItem('collection_data');
	    	collectionData = collectionData ? JSON.parse(collectionData) : {};
	    	var data = action.data;
	    	collectionData[data.uid] = Object.assign({}, collectionData[data.uid], {
    			[data.aid]: data.isCollect
    		});
	    	localStorage.setItem('collection_data', JSON.stringify(collectionData));
	    	// 改state.collection
	    	var collection = new Set([...state.collection]);
	    	if(data.isCollect)
	    		collection.add(data.aid);
	    	else
	    		collection.delete(data.aid);
	        return Object.assign({}, state, {collection});

	    case types.COLLECT_SUCC:
		    var collectionData = localStorage.getItem('collection_data');
		    collectionData = collectionData ? JSON.parse(collectionData) : {};
		    var data = action.data;
		    delete collectionData[data.uid][data.aid];
		    localStorage.setItem('collection_data', JSON.stringify(collectionData));
	        return Object.assign({}, state, {userInfo: false});

	    default:
	        return state;
	}
}