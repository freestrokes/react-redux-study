import {atom} from 'recoil';
import {v4} from 'uuid';

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
| States
|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
| Atoms
|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

export const boardListAtom = atom({
	key: `boardListAtom/${v4}`,
	default: {}
});

export const boardDetailAtom = atom({
	key: `boardDetailAtom/${v4}`,
	default: {}
});

export const createBoardAtom = atom({
	key: `createBoardAtom/${v4}`,
	default: {}
});

export const updateBoardAtom = atom({
	key: `updateBoardAtom/${v4}`,
	default: {}
});

export const deleteBoardAtom = atom({
	key: `deleteBoardAtom/${v4}`,
	default: 0
});
