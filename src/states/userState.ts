import {atom, selector, selectorFamily, waitForAll, waitForNone} from 'recoil';
import {UserService} from '../services/userService';

export interface CommonState {
	id: number,
	email: string,
	username: string,
	password: string,
	name: {
		firstname: string,
		lastname: string
	},
	address: {
		city: string,
		street: string,
		number: number,
		zipcode: string,
		geolocation: {
			lat: string,
			long: string
		}
	},
	phone: string
};

const initialState: CommonState = {
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

// selector
export const userSelector = selector({
	key: 'userSelector',
	get: async () => {
		const response = await UserService.getUser(1);
		return response;
	}
});

// selectorFamily
export const userSelectorFamily = selectorFamily({
	key: 'userSelectorFamily',
	get: (userId: number) => async () => {
		if (!userId) {
			return;
		}
		const response = await UserService.getUser(userId);
		return response;
	}
});

// waitForAll
export const usersSelectorWaitForAll = selector({
	key: 'usersSelectorWaitForAll',
	get: ({get}) => {
		const userIdList: number[] = [1,2,3,4,5];
		const users = waitForAll(
			userIdList.map((userId: number) => userSelectorFamily(userId))
		);
		return users;
	}
});

// waitForNone
export const usersSelectorWaitForNone = selector({
	key: 'usersSelectorWaitForNone',
	get: ({get}) => {
		const userIdList: any[] = ['a','b','c','d',5];
		const userLoadables = get(waitForNone(
			userIdList.map((userId: number) => userSelectorFamily(userId))
		));
		return userLoadables
			.filter(({state}) => state === 'hasValue')
			.map(({contents}) => contents);
	}
});