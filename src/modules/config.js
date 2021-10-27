import { combineReducers } from 'redux';
import counter from './counterModule';
import todo from './todoModule';

const rootReducer = combineReducers({
	counter,
	todo
});

export default rootReducer;
