import { selector } from 'recoil';
import {todoState} from '@states/atom/TodoAtom';
import {CommonState} from '@pages/recoil/Todo';

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
| Selectors
|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

export const todoListSelector = selector({
	key: 'todoListSelector',
	get: ({ get }) => {
		console.log('todoListSelector > get');
		return get(todoState);
	},
	set: ({ set }, setValue: any) => {
		console.log('todoListSelector > set');
		set(todoListSelector, setValue);
	}
});
