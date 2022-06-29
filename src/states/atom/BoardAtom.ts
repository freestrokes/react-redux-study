import {atom} from 'recoil';
import {v4} from 'uuid';
import {BoardSearchParam, CreateBoardParam, UpdateBoardParam} from '@typings/Board';

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
| States
|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
| Atoms
|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

export const boardListParamAtom = atom({
	key: `boardListParamAtom/${v4}`,
	default: {} as BoardSearchParam
});

export const boardDetailParamAtom = atom({
	key: `boardDetailParamAtom/${v4}`,
	default: 0
});

export const createBoardParamAtom = atom({
	key: `createBoardParamAtom/${v4}`,
	default: {} as CreateBoardParam
});

export const updateBoardParamAtom = atom({
	key: `updateBoardParamAtom/${v4}`,
	default: {} as UpdateBoardParam
});

export const deleteBoardParamAtom = atom({
	key: `deleteBoardParamAtom/${v4}`,
	default: 0
});
