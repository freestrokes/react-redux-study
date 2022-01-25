import { atom, selector } from 'recoil';

export interface CommonState {
	value: number
};

const initialState: CommonState = {
	value: 0
};

export const recoilCounterState = atom({
	key: 'recoilCounterState',
	default: initialState
});

export const recoilCounterSelector = selector({
	key: 'recoilCounterSelector',
	get: ({ get }) => {
		console.log('recoilCounterSelector > get');
		return get(recoilCounterState);
	},
	set: ({ set }, value: CommonState) => {
		console.log('recoilCounterSelector > set');
		set(recoilCounterState, value);
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
