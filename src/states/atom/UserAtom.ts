import {atom} from 'recoil';
import {User} from '@typings/User';
import {v4} from 'uuid';

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
| States
|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

const initialUserState: User = {
	id: 0,
	name: '',
	username: '',
	email: '',
	address: {
		street: '',
		suite: '',
		city: '',
		zipcode: '',
		geo: {
			lat: '',
			long: ''
		}
	},
	phone: '',
	website: '',
	company: {
		name: '',
		catchPhrase: '',
		bs: ''
	}
};

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
| Atoms
|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

export const userState = atom({
	key: `userState/${v4()}`,
	default: initialUserState
});
