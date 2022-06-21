import {atom} from 'recoil';
import {Post} from '@typings/Post';
import {v4} from 'uuid';

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
| States
|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

// const initialPostState: Post = {
// 	title: '',
// 	body: '',
// 	userId: 0,
// };

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
| Atoms
|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

export const postState = atom({
	key: `postState/${v4}`,
	default: {}
});
