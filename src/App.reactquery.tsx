import React, {useState} from 'react';
import { userSelectorFamily, usersSelectorWaitForAll, usersSelectorWaitForNone } from '@states/selector/UserSelector';
import {useRecoilState, useRecoilValue, useRecoilValueLoadable} from 'recoil';
import Counter from './pages/recoil/Counter';
import Todo from './pages/recoil/Todo';
import {useQuery} from 'react-query';
import {instance} from '@hooks/useAxiosLoader';
import axios, { AxiosInstance } from 'axios';
import {Result} from '@typings/Common';

function AppReactQuery() {

	const {
		isSuccess,
		isError,
		isLoading,
		isFetching,
		data,
		error

	} = useQuery(
		'getUsers',
		() => axios.get(`https://jsonplaceholder.typicode.com/users`),
		{
			refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
			retry: 0, // 실패시 재호출 몇번 할지
			enabled: true,
			onSuccess: data => {
				// 성공시 호출
				console.log(data);
			},
			onError: e => {
				// 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
				// 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
				console.log(e);
			}
		}
	);

	if (isLoading) {
		console.log('loading...');
	}

	if (isError) {
		console.log('error');
		console.log(error);
	}

	if (isSuccess) {
		console.log('success');
		console.log(data);
	}

	// /**
	//  * Get User
	//  */
	// const getUser = () => {
	// 	setUserId(userId + 1);
	// };

	return (
		<>
			{/*<Counter />*/}
			{/*<hr />*/}
			{/*<Todo />*/}
			{/*<hr />*/}
			{/*<button onClick={getUser}>[ GET USER ]</button>*/}
			{/*<br/>*/}
			{/*<div>*/}
			{/*	userInfo:*/}
			{/*	<div>{user}</div>*/}
			{/*</div>*/}
			{/*<br/>*/}
			{/*<div>*/}
			{/*	users (waitForAll):*/}
			{/*	<div>{usersWaitForAll}</div>*/}
			{/*</div>*/}
			{/*<br/>*/}
			{/*<div>*/}
			{/*	users (waitForNone):*/}
			{/*	<div>{usersWaitForNone}</div>*/}
			{/*</div>*/}
		</>
	);
}

export default AppReactQuery;
