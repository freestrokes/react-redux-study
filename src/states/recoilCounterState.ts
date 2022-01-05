/* eslint-disable */

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
		return get(recoilCounterState);
	},
	set: ({ set }, value: CommonState)=> {
		set(recoilCounterState, value);
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
