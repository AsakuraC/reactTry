import { combineReducers } from 'redux';
import articles from './articles';
import userRelated from './userRelated';
import waitCheckThumb from './waitCheckThumb';
import commentListObj from './commentListObj';

export default combineReducers({
    userRelated,
    articles,
    waitCheckThumb,
    commentListObj
});