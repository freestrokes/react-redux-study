import {selector, selectorFamily} from 'recoil';
import {v4} from 'uuid';
import {boardListParamAtom} from '@states/atom/BoardAtom';

export const boardListParamSelector = selector({
	key: `boardListParamSelector/${v4()}`,
	get: ({get}) => {
		return get(boardListParamAtom);
	},
});

// export const boardListSelector = selector({
// 	key: `updateMpProductReviewSelector/${v4()}`,
// 	get: async ({get}) => {
// 		const triggerStateValue = get(triggerState('updateMpProductReviewSelector'));
// 		const mpProductReviewStateParam = get(updateMpProductReviewState);
// 		if (!triggerStateValue) {
// 			return false;
// 		}
// 		const response = await MpProductService.updateMpProductReview(mpProductReviewStateParam);
// 		return response;
// 	},
// 	set: ({set}, setValue) => {
// 		if (setValue) {
// 			set(triggerState('updateMpProductReviewSelector'), (prevValue) => prevValue + 1);
// 		} else {
// 			set(triggerState('updateMpProductReviewSelector'), 0);
// 		}
// 	},
// 	cachePolicy_UNSTABLE: {
// 		eviction: 'most-recent',
// 	}
// });
