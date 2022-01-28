import { atom, selector } from 'recoil';

export interface CommonState {
	value: number
};

const initialState: CommonState = {
	value: 0
};

export const counterState = atom({
	key: 'counterState',
	default: initialState
});

export const counterSelector = selector({
	key: 'counterSelector',
	get: ({ get }) => {
		console.log('counterSelector > get');
		return get(counterState);
	},
	set: ({ set }, value: CommonState) => {
		console.log('counterSelector > set');
		set(counterState, value);
	}
});

// export const recoilCounterSelector = selector({
// 	key: 'recoilCounterSelector',
// 	// 비동기는 아래와 같이 사용
// 	// get: async ({ get }) => {
// 	// 	try {
// 	// 		const { data } = await client.get('/counter');
// 	// 		return data.data;
// 	// 	} catch (err) {
// 	// 		throw err;
// 	// 	}
// 	// }
// });
