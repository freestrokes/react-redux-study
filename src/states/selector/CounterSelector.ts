import { selector } from 'recoil';
import {counterState} from '@states/atom/CounterAtom';

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
| Selectors
|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

export const counterSelector = selector({
	key: 'counterSelector',
	get: ({ get }) => {
		console.log('counterSelector > get');
		return get(counterState);
	},
	set: ({ set }, setValue) => {
		console.log('counterSelector > set');
		set(counterSelector, setValue);
	}
});
