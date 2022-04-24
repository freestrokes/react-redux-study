import {atom} from 'recoil';
import {User} from '@typings/User';

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
| States
|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

const initialUserState: User = {
	id: 0,
	email: '',
	username: '',
	password: '',
	name: {
		firstname: '',
		lastname: ''
	},
	address: {
		city: '',
		street: '',
		number: 0,
		zipcode: '',
		geolocation:{
			lat: '',
			long: ''
		}
	},
	phone: ''
};

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
| Atoms
|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

export const userState = atom({
	key: 'userState',
	default: initialUserState
});
