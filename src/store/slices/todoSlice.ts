/* eslint-disable */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { createAction, handleActions } from 'redux-actions';
// import produce from 'immer';

////////////////////////////////////////
// States & Variables
////////////////////////////////////////

// const todoItem = {
// 	id: '',
// 	title: '',
// 	checked: false
// };
//
// const initialState = {
// 	inputTitle: '',
// 	todoList: []
// };
//
// let id = 0;

////////////////////////////////////////
// Action Types
////////////////////////////////////////

// const CHANGE_INPUT = 'todo/CHANGE_INPUT';
// const INSERT = 'todo/INSERT';
// const TOGGLE = 'todo/TOGGLE';
// const REMOVE = 'todo/REMOVE';

////////////////////////////////////////
// Action Creators
////////////////////////////////////////

// export const changeInput = createAction(CHANGE_INPUT, inputTitle => inputTitle);
// export const insert = createAction(INSERT, title => title);
// export const toggle = createAction(TOGGLE, id => id);
// export const remove = createAction(REMOVE, id => id);

////////////////////////////////////////
// Reducer
////////////////////////////////////////

// const todo = handleActions(
//   {
//     [CHANGE_INPUT]: (state, { payload: inputTitle }) =>
//       produce(state, draft => {
//         draft.inputTitle = inputTitle;
//       }),
//     [INSERT]: (state, { payload: title }) =>
//       produce(state, draft => {
//       	const insertItem = {...todoItem};
// 	      insertItem.id = ++id;
// 	      insertItem.title = title;
//         draft.todoList.push(insertItem);
//       }),
//     [TOGGLE]: (state, { payload: id }) =>
//       produce(state, draft => {
//         const toggleItem = draft.todoList.find(todo => todo.id === id);
// 	      toggleItem.checked = !toggleItem.checked;
//       }),
//     [REMOVE]: (state, { payload: id }) =>
//       produce(state, draft => {
//         const removeIndex = draft.todoList.findIndex(todo => todo.id === id);
//         draft.todoList.splice(removeIndex, 1);
//       }),
//   },
//   initialState,
// );

interface TodoItem {
	id: number,
	title: string,
	checked: boolean
}

export interface CommonState {
	todoList: TodoItem[]
}

const initialState: CommonState = {
	todoList: []
};

export const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		insert(state, action: PayloadAction<TodoItem>) {
			state.todoList.push(action.payload);
		},
		toggle(state, action: PayloadAction<number>) {
			state.todoList.map((item) => {
				item.checked = (item.id === action.payload) ? !item.checked : item.checked;
			});
		},
		remove(state, action: PayloadAction<number>) {
			state.todoList.splice(action.payload, 1);
		}
	}
});

export const { insert, toggle, remove } = todoSlice.actions;
export default todoSlice;
