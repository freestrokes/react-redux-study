import {selector, selectorFamily, waitForAll, waitForNone} from 'recoil';
import {UserService} from '@services/UserService';

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
| Selectors
|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

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
