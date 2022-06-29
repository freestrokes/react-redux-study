import {atom} from 'recoil';
import {v4} from 'uuid';
import {boardSearchParam, createBoardParam, updateBoardParam} from '@typings/Board';

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
| States
|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
| Atoms
|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

export const boardListParamAtom = atom({
	key: `boardListParamAtom/${v4}`,
	default: {} as boardSearchParam
});

export const boardDetailParamAtom = atom({
	key: `boardDetailParamAtom/${v4}`,
	default: 0
});

export const createBoardParamAtom = atom({
	key: `createBoardParamAtom/${v4}`,
	default: {} as createBoardParam
});

export const updateBoardParamAtom = atom({
	key: `updateBoardParamAtom/${v4}`,
	default: {} as updateBoardParam
});

export const deleteBoardParamAtom = atom({
	key: `deleteBoardParamAtom/${v4}`,
	default: 0
});
