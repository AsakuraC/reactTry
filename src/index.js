import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import Route from './Route';
import configureStore from './configStore';
import {getUplist} from './actions';

const store = configureStore();
store.subscribe((...args) => {
	var state = store.getState();
	if(state.waitCheckThumb.length > 0 && state.userRelated){
		store.dispatch(getUplist());
	}
})

render(
	<Provider store={store}>
		<Route />
	</Provider>,
	document.getElementById('root')
);
