import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

////////////////////////////////////////
// States & Variables
////////////////////////////////////////

const todoItem = {
	id: 0,
	title: '',
	checked: false
};

const initialState = {
	inputTitle: '',
	todoList: []
};

let id = 0;

////////////////////////////////////////
// Action Types
////////////////////////////////////////

const CHANGE_INPUT = 'todo/CHANGE_INPUT';
const INSERT = 'todo/INSERT';
const TOGGLE = 'todo/TOGGLE';
const REMOVE = 'todo/REMOVE';

////////////////////////////////////////
// Action Creators
////////////////////////////////////////

export const changeInput = createAction(CHANGE_INPUT, inputTitle => inputTitle);
export const insert = createAction(INSERT, title => title);
export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);

////////////////////////////////////////
// Reducer
////////////////////////////////////////

const todo = handleActions(
	{
		[CHANGE_INPUT]: (state, { payload: inputTitle }) =>
			produce(state, draft => {
				draft.inputTitle = inputTitle;
			}),
		[INSERT]: (state, { payload: title }) =>
			produce(state, draft => {
				const insertItem = {...todoItem};
				insertItem.id = ++id;
				insertItem.title = title;
				draft.todoList.push(insertItem);
			}),
		[TOGGLE]: (state, { payload: id }) =>
			produce(state, draft => {
				const toggleItem = draft.todoList.find(item => item.id === id);
				toggleItem.checked = !toggleItem.checked;
			}),
		[REMOVE]: (state, { payload: id }) =>
			produce(state, draft => {
				const removeIndex = draft.todoList.findIndex(item => item.id === id);
				draft.todoList.splice(removeIndex, 1);
			}),
	},
	initialState
);

export default todo;
