// import {
// 	LocationSearchParam,
// 	QueryAnalysisParam,
// 	Result,
// 	StopKeywordParam
// } from '@typings/common';
// import {RoutingCreateDto} from '@typings/routing';
// import qs from 'qs';
// import {createAsyncThunk} from '@reduxjs/toolkit';
import {instance} from '../hooks/useAxiosLoader';
import {createAsyncThunk} from '@reduxjs/toolkit';

const API_URL = `/users`;
// let userProfileHistory: { param: string; result: unknown[] }[] = [];

export const UserService = {

	/**
	 * Get User (Redux Toolkit)
	 */
	getUserForRTK: createAsyncThunk(
		'user/getUser',
		async(userId: string, thunkApi) => {
			const {data} = await instance.get(
				`${API_URL}/${userId}`
			);
			return data;
		}
	),

	/**
	 * Get User
	 */
	getUser: async (userId: number) => {
		const {data} = await instance.get(
			`${API_URL}/${userId}`,
			{}
		);
		return data;
	},

	// /**
	//  * 통합 장소 검색 (TMAP POI 통합 검색)
	//  */
	// getLocationTotalSearch: async (searchText: string, page: number, count: number) => {
	// 	const param: LocationSearchParam = {
	// 		'version': 1,
	// 		'page': page,
	// 		'count': count,
	// 		'searchKeyword': searchText
	// 	};
	//
	// 	const {data} = await instance.get<Result<any[]>>(
	// 		`${API_URL}/proxy/tmap/total-search?${qs.stringify(param, { encode: false })}`,
	// 		{}
	// 	);
	//
	// 	return data;
	// },
	//
	// /**
	//  * 근처 장소 검색 (TMAP 좌표 기반 검색)
	//  */
	// getLocationReverseGeocodingSearch: async (latitude: number, longitude: number) => {
	// 	const param: LocationSearchParam = {
	// 		'version': 1,
	// 		'lat': latitude,
	// 		'lon': longitude
	// 	};
	//
	// 	const {data} = await instance.get<Result<any[]>>(
	// 		`${API_URL}/proxy/tmap/reverse-geocoding?${qs.stringify(param, { encode: false })}`,
	// 		{}
	// 	);
	//
	// 	return data;
	// },
	//
	// /**
	// * 질의분석기 조회 (NUGU 대표 위치 추출)
	// */
	// getQueryAnalysis: async (queryText: string) => {
	// 	const param: QueryAnalysisParam = {
	// 		'domainName': `${process.env.REACT_APP_DOMAIN_NAME}`,
	// 		'query': queryText
	// 	};
	//
	// 	const {data} = await instance.get<Result<any[]>>(
	// 		`${API_URL}/proxy/nugu?${qs.stringify(param, { encode: false })}`,
	// 		{}
	// 	);
	//
	// 	return data;
	// },
	//
	// /**
	//  * 금칙어 검사 (Safety Module)
	//  */
	// checkStopKeyword: async (utteranceText: string, maxLen = 100) => {
	// 	const param: StopKeywordParam = {
	// 		'utterance': utteranceText,
	// 		'min_len': 0,
	// 		'max_len': maxLen,
	// 		'early_stop': false,
	// 		'source': `${(process.env.REACT_APP_DOMAIN_NAME as string).toLowerCase()}`
	// 	};
	//
	// 	const {data} = await instance.get<Result<any[]>>(
	// 		`${API_URL}/proxy/safety?${qs.stringify(param, { encode: false })}`,
	// 		{}
	// 	);
	//
	// 	return data;
	// },
	//
	// /**
	//  * 사용자 프로필 조회 (User Profile)
	//  */
	// getUserProfile: async () => {
	// 	const {data} = await instance.get<Result<any[]>>(
	// 		`${API_URL}/proxy/user-profile`,
	// 		{}
	// 	);
	//
	// 	return data;
	// },
	//
	// /**
	//  * Tmap 지도 조회 (Tmap staticMap)
	//  */
	// getTmapStaticMap: async (latitude: number, longitude: number) => {
	// 	const param = {
	// 		zoom: 14,
	// 		latitude: latitude,
	// 		longitude: longitude
	// 	};
	//
	// 	const {data} = await instance.get<Result<any[]>>(
	// 		`${API_URL}/proxy/tmap/static-map?${qs.stringify(param, { encode: false })}`,
	// 		{}
	// 	);
	//
	// 	return data;
	// },
	//
	// /**
	//  * 라우팅 정보 업데이트(생성)
	//  * @param routingCreateDto
	//  */
	// createRouting: async (routingCreateDto: RoutingCreateDto) => {
	// 	const {data} = await instance.post<Result<any[]>>(
	// 		`${API_URL}/routing`,
	// 		routingCreateDto
	// 	);
	// 	return data;
	// },
	//
	// /**
	//  * 유저 프로필 이미지 반환
	//  * @param routingCreateDto
	//  */
	// getUserImage: async (userId: string) => {
	// 	const exceptionIdList = ['admin', 'laonlaon', 'psh0071', 'dmswo0223', 'hekim-007', 'dominic', 'ybyoo', 'test'];
	// 	if(exceptionIdList.includes(userId)){
	// 		return;
	// 	}
	// 	const historyItem = userProfileHistory.find(history => history.param === userId);
	// 	if (historyItem) {
	// 		return new Promise((resolve, reject) => {
	// 			setTimeout(() => {
	// 				resolve(historyItem.result);
	// 			}, 250);
	// 		});
	// 	} else {
	// 		const {data} = await instance.get<Result<any[]>>(
	// 			`${API_URL}/proxy/user-profile`,{
	// 				headers: {
	// 					'User-Id': userId
	// 				}
	// 			}
	// 		).then((result) => {
	// 			// @ts-ignore
	// 			userProfileHistory = userProfileHistory.filter(history => history.param !== userId);
	// 			// @ts-ignore
	// 			userProfileHistory.push({param: userId, result: result.data});
	// 			return result;
	// 		});
	//
	// 		return data;
	// 	}
	// }
}
