/* eslint-disable */

import { atom, selector } from 'recoil';

interface TodoItem {
	id: number,
	title: string,
	checked: boolean
};

export interface CommonState {
	todoList: TodoItem[]
};

const initialState: CommonState = {
	todoList: []
};

export const recoilTodoState = atom({
	key: 'recoilTodoState',
	default: initialState
});

export const recoilTodoSelector = selector({
	key: 'recoilTodoSelector',
	get: ({ get }) => {
		return get(recoilTodoState);
	},
	set: ({ set }, value: CommonState)=> {
		set(recoilTodoState, value);
	}
});

// export const recoilCounterSelector = selector({
// 	key: 'recoilCounterSelector',
// 	// async는 아래와 같이 사용
// 	// get: async ({ get }) => {
// 	// 	try{
// 	// 		const { data } = await client.get('/cookies');
// 	// 		return data.data;
// 	// 	} catch (err) {
// 	// 		throw err;
// 	// 	}
// 	// },
// 	get: ({ get }) => {
// 		const counter = get(recoilCounterState);
// 		return `Counter: ${counter}`;
// 	}
// });
