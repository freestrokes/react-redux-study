import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

////////////////////////////////////////
// States & Variables
////////////////////////////////////////

const initialState = {
	number: 0
};

////////////////////////////////////////
// Action Types
////////////////////////////////////////

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

////////////////////////////////////////
// Action Creators
////////////////////////////////////////

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

////////////////////////////////////////
// Reducer
////////////////////////////////////////

const counter = handleActions(
	{
		[INCREASE]: (state, action) =>
			produce(state, draft => {
				draft.number = draft.number + 1;
			}),
		[DECREASE]: (state, action) =>
			produce(state, draft => {
				draft.number = draft.number - 1;
			})
	},
	initialState
);

export default counter;
