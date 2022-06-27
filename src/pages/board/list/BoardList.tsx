import React, {useEffect} from 'react';
import {MenuType} from '@typings/Test';
import useTab from '@hooks/useTab';
import {PostService} from '@services/PostService';
import TablePagination from '@components/pagination/TablePagination';
import UserTable from '@pages/user/table/UserTable';
import {UserService} from '@services/UserService';
import {BoardService} from '@services/BoardService';
import axios from 'axios';
import {useQueryClient} from 'react-query';
import {useRecoilState} from 'recoil';
import {createBoardAtom, updateBoardAtom, deleteBoardAtom} from '@states/atom/BoardAtom';
import {BoardQuery} from '@queries/BoardQuery';
import useQueryFetcher from '@hooks/useQueryFetcher';
import {instance} from '@hooks/useAxiosLoader';
import {Result} from '@typings/Common';

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

	// Get QueryClient from the context
	const queryClient = useQueryClient();

	// recoil states
	const [createBoardState, setCreateBoardState] = useRecoilState(createBoardAtom);
	const [updateBoardState, setUpdateBoardState] = useRecoilState(updateBoardAtom);
	const [deleteBoardState, setDeleteBoardState] = useRecoilState(deleteBoardAtom);

	// get board list
	const boardListQuery = BoardQuery.useGetBoardListQuery({
		keyword: '',
		page: 1,
		size: 10
	});

	// custom query fetcher가 필요한 경우에 사용.
	const boardListQueryWithFetcher = useQueryFetcher(
		'getBoardListWithFetcher',
		() => BoardService.getBoardList({
			keyword: '',
			page: 1,
			size: 10
		}),
		{
			refetchOnWindowFocus: false,
			retry: 0,
			cacheTime: 0,
			enabled: false,
		}
	);

	// get board detail
	const boardDetailQuery = BoardQuery.useGetBoardDetailQuery(1);

	// create board
	const createBoardQuery = BoardQuery.useCreateBoardMutation(queryClient);
	const createBoardQueryWithRecoil = BoardQuery.useCreateBoardMutationWithRecoil(queryClient);

	// update board
	const updateBoardQueryWithRecoil = BoardQuery.useUpdateBoardMutationWithRecoil(queryClient);

	// delete board
	const deleteBoardQueryWithRecoil = BoardQuery.useDeleteBoardMutationWithRecoil(queryClient);

	useEffect(() => {
		console.log('boardListQueryWithFetcher', boardListQueryWithFetcher);
	}, [boardListQueryWithFetcher]);

	useEffect(() => {
		if (boardListQuery.isLoading) {
			console.log('Get Board List Loading...');
		} else if (boardListQuery.isError) {
			console.log('Get Board List Error', boardListQuery.error);
			boardListQuery.remove();
		} else if (boardListQuery.isSuccess) {
			console.log('Get Board List Success', boardListQuery.data);
			boardListQuery.remove();
		}
	}, [boardListQuery]);

	useEffect(() => {
		if (boardDetailQuery.isLoading) {
			console.log('Get Board Detail Loading...');
		} else if (boardDetailQuery.isError) {
			console.log('Get Board Detail Error', boardDetailQuery.error);
			boardDetailQuery.remove();
		} else if (boardDetailQuery.isSuccess) {
			console.log('Get Board Detail Success', boardDetailQuery.data);
			boardDetailQuery.remove();
		}
	}, [boardDetailQuery]);

	useEffect(() => {
		if (createBoardQuery.isLoading) {
			console.log('Create Board Loading...');
		} else if (createBoardQuery.isError) {
			console.log('Create Board Error', createBoardQuery.error);
			createBoardQuery.reset();
		} else if (createBoardQuery.isSuccess) {
			console.log('Create Board Success', createBoardQuery.data);
			createBoardQuery.reset();
		}
	}, [createBoardQuery]);

	useEffect(() => {
		if (createBoardQueryWithRecoil.isLoading) {
			console.log('Create Board With Recoil Loading...');
		} else if (createBoardQueryWithRecoil.isError) {
			console.log('Create Board With Recoil Error', createBoardQueryWithRecoil.error);
			createBoardQueryWithRecoil.reset();
		} else if (createBoardQueryWithRecoil.isSuccess) {
			console.log('Create Board With Recoil Success', createBoardQueryWithRecoil.data);
			createBoardQueryWithRecoil.reset();
		}
	}, [createBoardQueryWithRecoil]);

	useEffect(() => {
		if (updateBoardQueryWithRecoil.isLoading) {
			console.log('Update Board With Recoil Loading...');
		} else if (updateBoardQueryWithRecoil.isError) {
			console.log('Update Board With Recoil Error', updateBoardQueryWithRecoil.error);
			updateBoardQueryWithRecoil.reset();
		} else if (updateBoardQueryWithRecoil.isSuccess) {
			console.log('Update Board With Recoil Success', updateBoardQueryWithRecoil.data);
			updateBoardQueryWithRecoil.reset();
		}
	}, [updateBoardQueryWithRecoil]);

	useEffect(() => {
		if (deleteBoardQueryWithRecoil.isLoading) {
			console.log('Delete Board With Recoil Loading...');
		} else if (deleteBoardQueryWithRecoil.isError) {
			console.log('Delete Board With Recoil Error', deleteBoardQueryWithRecoil.error);
			deleteBoardQueryWithRecoil.reset();
		} else if (deleteBoardQueryWithRecoil.isSuccess) {
			console.log('Delete Board With Recoil Success', deleteBoardQueryWithRecoil.data);
			deleteBoardQueryWithRecoil.reset();
		}
	}, [deleteBoardQueryWithRecoil]);

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Functions
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	/**
	 * Create Board
	 */
	const createBoard = () => {
		const createBoardParam = {
			title: 'foo',
			body: 'bar',
			userId: 1,
		};

		createBoardQuery.mutate(createBoardParam);
	};

	/**
	 * Create Board With Recoil
	 */
	const createBoardWithRecoil = () => {
		setCreateBoardState({
			title: 'foo',
			body: 'bar',
			userId: 1,
		});

		createBoardQueryWithRecoil.mutate(createBoardState);
	};

	/**
	 * Update Board With Recoil
	 */
	const updateBoardWithRecoil = () => {
		setUpdateBoardState({
			id: 1,
			title: 'foo',
			body: 'bar',
			userId: 1,
		});

		updateBoardQueryWithRecoil.mutate(updateBoardState);
	};

	/**
	 * Delete Board With Recoil
	 */
	const deleteBoardWithRecoil = () => {
		setDeleteBoardState(1);

		deleteBoardQueryWithRecoil.mutate(deleteBoardState);
	};

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Mark Up
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	return (
		<>
			<button onClick={() => boardListQueryWithFetcher.refetch()}>[ GET BOARD LIST WITH FETCHER ]</button>
			<br/>
			<button onClick={() => boardListQuery.refetch()}>[ GET BOARD LIST ]</button>
			<br/>
			<button onClick={() => boardDetailQuery.refetch()}>[ GET BOARD DETAIL ]</button>
			<br/>
			<button onClick={createBoard}>[ CREATE BOARD ]</button>
			<br/>
			<button onClick={createBoardWithRecoil}>[ CREATE BOARD WITH RECOIL ]</button>
			<br/>
			<button onClick={updateBoardWithRecoil}>[ UPDATE BOARD WITH RECOIL ]</button>
			<br/>
			<button onClick={deleteBoardWithRecoil}>[ DELETE BOARD WITH RECOIL ]</button>
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
