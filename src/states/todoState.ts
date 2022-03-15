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

export const todoState = atom({
	key: 'todoState',
	default: initialState
});

// @ts-ignore
export const todoSelector = selector({
	key: 'todoSelector',
	get: ({ get }) => {
		console.log('todoSelector > get');
		return get(todoState);
	},
	set: ({ set }, value: CommonState) => {
		console.log('todoSelector > set');
		set(todoState, value);
	}
});

// export const recoilTodoSelector = selector({
// 	key: 'recoilTodoSelector',
// 	// 비동기는 아래와 같이 사용
// 	// get: async ({ get }) => {
// 	// 	try {
// 	// 		const { data } = await client.get('/todos');
// 	// 		return data.data;
// 	// 	} catch (err) {
// 	// 		throw err;
// 	// 	}
// 	// }
// });
