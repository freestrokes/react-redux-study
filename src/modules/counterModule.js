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

// Reducer (handleActions)
const counter = handleActions(
	{
		[INCREASE]: (state) =>
			produce(state, draft => {
				draft.number = draft.number + 1;
			}),
		[DECREASE]: (state) =>
			produce(state, draft => {
				draft.number = draft.number - 1;
			})
	},
	initialState
);

// const counter = handleActions(
//   {
//     [INCREASE]: (state, action) => ({
// 	    number: state.number + 1
//     }),
//     [DECREASE]: (state, action) => ({
// 	    number: state.number - 1
//     })
//   },
//   initialState
// );
//
// Reducer (switch-case)
// const counterReducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case INCREASE:
// 			return {
// 				...state,
// 				number: state.number + 1
// 			};
// 		case DECREASE:
// 			return {
// 				...state,
// 				number: state.number - 1
// 			};
// 		default:
// 			return state;
// 	}
// };

export default counter;
