import React, {useEffect} from 'react';
import {MenuType} from '@typings/Test';
import useTab from '@hooks/useTab';
import {PostService} from '@services/PostService';
import TablePagination from '@components/pagination/TablePagination';
import UserTable from '@pages/user/table/UserTable';
import {useQuery} from 'react-query';
import {UserService} from '@services/UserService';
import {BoardService} from '@services/BoardService';
import {BoardQuery} from '../../../queries/BoardQuery';

function BoardList() {

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| States & Variables
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Hooks
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	// async/await 비동기 로직 예시
	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			const result = await PostService.getUser();
	// 			console.log('getUser() >>>> ', result);
	// 		} catch (e) {
	// 			console.log('Error!');
	// 		}
	// 	})();
	// }, []);

	const param = {
		keyword: '',
		page: 1,
		size: 10
	};

	const boardsQuery = BoardQuery.useGetBoardsQuery(param);

	console.log(boardsQuery);
	console.log('query status', boardsQuery.status);

	if (boardsQuery.isLoading) {
		console.log('loading...');
		// return <span>Loading...</span>;
	}

	if (boardsQuery.isError) {
		console.log('error');
		console.log(boardsQuery.error);
		// return <span>Error: {error}</span>;
	}

	if (boardsQuery.isSuccess) {
		console.log('success');
		console.log(boardsQuery.data);
	}

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Functions
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	/**
	 * Get User
	 */
	// const getUser = () => {
	// 	setUserId(userId + 1);
	// };

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

export default BoardList;