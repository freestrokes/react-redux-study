import { atom } from 'recoil';
import {Todo} from '@typings/Todo';

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
| States
|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

const initialTodoState: Todo[] = [];

export const todoState = atom({
	key: 'todoState',
	default: initialTodoState
});
