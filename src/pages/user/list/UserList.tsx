import React, {useEffect} from 'react';
import {MenuType} from '@typings/Test';
import useTab from '@hooks/useTab';
import {PostService} from '@services/PostService';
import TablePagination from '@components/pagination/TablePagination';
import UserTable from '@pages/user/table/UserTable';
import {useQuery} from 'react-query';

function UserList() {

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| States & Variables
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Hooks
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	// TODO
	useEffect(() => {
		// (async () => {
		// 	try {
		// 		const result = await PostService.getUser();
		// 		console.log('getUser() >>>> ', result);
		// 	} catch (e) {
		// 		console.log('Error!');
		// 	}
		// })();
	}, []);

	const param = {
		keyword: '',
		page: 1,
		size: 10
	};

	const { isLoading, isError, data, error } = useQuery(
			'getUsers',
		() => PostService.getPosts(param),
			{
				refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
				retry: 0, // 실패시 재호출 몇번 할지
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
		// return <span>Loading...</span>;
	}

	if (isError) {
		console.log('error');
		// return <span>Error: {error}</span>;
	}

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Functions
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Mark Up
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	return (
		<>
			{/*{*/}
			{/*	mpProductServerListLoadable?.contents?.data?.content?.length ? (*/}
			{/*		<>*/}
			{/*			<UserTable*/}
			{/*				columns={columns}*/}
			{/*				data={mpProductServerListLoadable.contents?.data?.content}*/}
			{/*				columnsSize={['29%', '130px', '*', '110px', '100px', '140px', '160px']}*/}
			{/*				currentTab={mpProductType.SERVER}*/}
			{/*				sorting={sortingRule}*/}
			{/*				onChangeSort={handleChangeSort}*/}
			{/*			/>*/}
			{/*			<TablePagination*/}
			{/*				total={mpProductServerListLoadable.contents?.data?.size}*/}
			{/*				listSize={size}*/}
			{/*				pageSize={10}*/}
			{/*				page={page}*/}
			{/*				onChangePage={handleChangePage}*/}
			{/*			/>*/}
			{/*		</>*/}
			{/*	) : (*/}
			{/*		'TODO'*/}
			{/*		// !mpProductServerListLoadable?.contents?.data?.size ? (*/}
			{/*		// 	<div className="area-nodata type-nodata">*/}
			{/*		// 		<em className="icon-notice-empty"/>*/}
			{/*		// 		<span className="txt-nodata">등록된 서버 기반 상품이 없습니다.</span>*/}
			{/*		// 	</div>*/}
			{/*		// ) : (*/}
			{/*		// 	<div className="area-nodata type-nodata">*/}
			{/*		// 		<em className="icon-search-empty"/>*/}
			{/*		// 		<span className="txt-nodata">검색결과가 없습니다.</span>*/}
			{/*		// 	</div>*/}
			{/*		// )*/}
			{/*	)*/}
			{/*}*/}
		</>
	);
};

export default UserList;
