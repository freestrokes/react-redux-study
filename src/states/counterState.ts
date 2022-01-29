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
