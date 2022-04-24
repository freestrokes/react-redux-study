import {selector, selectorFamily, SerializableParam, waitForAll, waitForNone} from 'recoil';
import {PostService} from '@services/PostService';

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
| Selectors
|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

// selector
export const postSelector = selector({
	key: 'postSelector',
	get: async () => {
		const response = await PostService.getPost('1');
		return response;
	}
});

// selectorFamily
export const postSelectorFamily = selectorFamily({
	key: 'postSelectorFamily',
	get: (id: string) => async () => {
		if (!id) {
			return;
		}
		const response = await PostService.getPost(id);
		return response;
	}
});

// selectorFamily
export const postsSelectorFamily = selectorFamily({
	key: 'postsSelectorFamily',
	get: (param: SerializableParam) => async () => {
		const response = await PostService.getPosts(param);
		return response;
	}
});

// waitForAll
export const postsSelectorWaitForAll = selector({
	key: 'postsSelectorWaitForAll',
	get: ({get}) => {
		const postIdList: string[] = ['1','2','3','4','5'];
		const posts = waitForAll(
			postIdList.map((id: string) => postSelectorFamily(id))
			// postIdList.map((id: number) => {
			// 	return postSelectorFamily(id);
			// })
		);
		return posts;
	}
});

// waitForNone
export const postsSelectorWaitForNone = selector({
	key: 'postsSelectorWaitForNone',
	get: ({get}) => {
		const postIdList: any[] = ['a','b','c','d',5];
		const postLoadables = get(waitForNone(
			postIdList.map((id: string) => postSelectorFamily(id))
		));
		return postLoadables
			.filter(({state}) => state === 'hasValue')
			.map(({contents}) => contents);
	}
});
