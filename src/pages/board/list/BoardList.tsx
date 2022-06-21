import React, {useEffect} from 'react';
import {MenuType} from '@typings/Test';
import useTab from '@hooks/useTab';
import {PostService} from '@services/PostService';
import TablePagination from '@components/pagination/TablePagination';
import UserTable from '@pages/user/table/UserTable';
import {useMutation, useQuery} from 'react-query';
import {UserService} from '@services/UserService';
import {BoardService} from '@services/BoardService';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import {postState} from '@states/atom/BoardAtom';
import {BoardQuery} from '@queries/BoardQuery';

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

	const [createBoardParam, setCreateBoardParam] = useRecoilState(postState);

	const boardsQuery = BoardQuery.useGetBoardsQuery({
		keyword: '',
		page: 1,
		size: 10
	});
	const boardQuery = BoardQuery.useGetBoardQuery(1);
	const createBoardQuery = BoardQuery.useCreateBoardQuery(createBoardParam);

	console.log(boardsQuery);
	console.log('query status', boardsQuery.status);

	useEffect(() => {
		if (boardsQuery.isLoading) {
			console.log('loading...');
			// return <span>Loading...</span>;
		} else if (boardsQuery.isError) {
			console.log('error');
			console.log(boardsQuery.error);
			// return <span>Error: {error}</span>;
		} else if (boardsQuery.isSuccess) {
			console.log('success');
			console.log(boardsQuery.data);
		}
	}, [boardsQuery]);

	useEffect(() => {
		if (boardQuery.isLoading) {
			console.log('loading...');
			// return <span>Loading...</span>;
		} else if (boardQuery.isError) {
			console.log('error');
			console.log(boardQuery.error);
			// return <span>Error: {error}</span>;
		} else if (boardQuery.isSuccess) {
			console.log('success');
			console.log(boardQuery.data);
		}
	}, [boardQuery]);

	useEffect(() => {
		console.log('createBoardQuery', createBoardQuery);
	}, [createBoardQuery]);

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Functions
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	// /**
	//  * Get User
	//  */
	// const getUser = () => {
	// 	setUserId(userId + 1);
	// };

	/**
	 * Create User
	 */
	const createPost = () => {
		setCreateBoardParam({
			title: 'foo',
			body: 'bar',
			userId: 1,
		});

		createBoardQuery.mutate();
	};

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Mark Up
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	return (
		<>
			<button onClick={createPost}>[ CREATE POST ]</button>
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
