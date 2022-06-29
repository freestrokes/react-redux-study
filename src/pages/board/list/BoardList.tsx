import React, {useEffect, useState} from 'react';
import {MenuType} from '@typings/Test';
import useTab from '@hooks/useTab';
import {PostService} from '@services/PostService';
import TablePagination from '@components/pagination/TablePagination';
import UserTable from '@pages/user/table/UserTable';
import {UserService} from '@services/UserService';
import axios from 'axios';
import {instance} from '@hooks/useAxiosLoader';
import {Result} from '@typings/Common';
import {BoardService} from '@services/BoardService';
import useQueryFetcher from '@hooks/useQueryFetcher';
import produce from 'immer';
import {useQueryClient, useIsMutating} from 'react-query';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
	createBoardParamAtom,
	updateBoardParamAtom,
	deleteBoardParamAtom,
	boardListParamAtom,
	boardDetailParamAtom
} from '@states/atom/BoardAtom';
import {BoardQuery} from '@queries/BoardQuery';
import {boardSearchParam} from '@typings/Board';

function BoardList() {

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| States & Variables
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	// Get QueryClient from the context
	const queryClient = useQueryClient();

	const isMutating = useIsMutating();

	// recoil states
	const [boardListParamState, setBoardListParamState] = useRecoilState<boardSearchParam>(boardListParamAtom);
	const [boardDetailParamState, setBoardDetailParamState] = useRecoilState(boardDetailParamAtom);
	const [createBoardParamState, setCreateBoardParamState] = useRecoilState(createBoardParamAtom);
	const [updateBoardParamState, setUpdateBoardParamState] = useRecoilState(updateBoardParamAtom);
	const [deleteBoardParamState, setDeleteBoardParamState] = useRecoilState(deleteBoardParamAtom);

	// get board list
	const boardListQueryWithRecoil = BoardQuery.useGetBoardListQueryWithRecoil();

	// get board detail
	const boardDetailQueryWithRecoil = BoardQuery.useGetBoardDetailQueryWithRecoil();

	// create board
	const createBoardQueryWithRecoil = BoardQuery.useCreateBoardMutationWithRecoil();

	// update board
	const updateBoardQueryWithRecoil = BoardQuery.useUpdateBoardMutationWithRecoil();

	// delete board
	const deleteBoardQueryWithRecoil = BoardQuery.useDeleteBoardMutationWithRecoil();

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Hooks
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	// get board list
	// const boardListQuery = BoardQuery.useGetBoardListQuery({
	// 	keyword: '',
	// 	page: 1,
	// 	size: 10
	// });

	// custom query fetcher가 필요한 경우에 사용.
	// const boardListQueryWithFetcher = useQueryFetcher(
	// 	'getBoardListWithFetcher',
	// 	() => BoardService.getBoardList({
	// 		keyword: '',
	// 		page: 1,
	// 		size: 10
	// 	}),
	// 	{
	// 		refetchOnWindowFocus: false,
	// 		retry: 0,
	// 		cacheTime: 0,
	// 		enabled: false,
	// 	}
	// );

	// const boardDetailQuery = BoardQuery.useGetBoardDetailQuery(1);
	// const createBoardQuery = BoardQuery.useCreateBoardMutation();

	// useEffect(() => {
	// 	console.log('boardListQueryWithFetcher', boardListQueryWithFetcher);
	// }, [boardListQueryWithFetcher]);

	useEffect(() => {
		if (boardListParamState && Object.keys(boardListParamState).length) {
			// queryFn이나 mutationFn에 recoil state를 파라미터로 넘겨서 사용할 수 없음. (Invalid hook call 발생)
			// useQuery(), useMutation() 호출하는 함수 내부에서 recoil state를 호출하는 방법으로 사용.
			boardListQueryWithRecoil.refetch();
		}
	}, [boardListParamState]);

	useEffect(() => {
		if (boardDetailParamState) {
			// queryFn이나 mutationFn에 recoil state를 파라미터로 넘겨서 사용할 수 없음. (Invalid hook call 발생)
			// useQuery(), useMutation() 호출하는 함수 내부에서 recoil state를 호출하는 방법으로 사용.
			boardDetailQueryWithRecoil.refetch();
		}
	}, [boardDetailParamState]);

	useEffect(() => {
		if (createBoardParamState && Object.keys(createBoardParamState).length) {
			// recoil state 사용시 mutate()에는 파라미터로 state를 넘겨줘야 함.
			// useMutation() options에서 쓰이는 onMutate()의 variables 파라미터로 사용 됨.
			createBoardQueryWithRecoil.mutate(createBoardParamState);
		}
	}, [createBoardParamState]);

	useEffect(() => {
		if (updateBoardParamState && Object.keys(updateBoardParamState).length) {
			// recoil state 사용시 mutate()에는 파라미터로 state를 넘겨줘야 함.
			// useMutation() options에서 쓰이는 onMutate()의 variables 파라미터로 사용 됨.
			updateBoardQueryWithRecoil.mutate(updateBoardParamState);
		}
	}, [updateBoardParamState]);

	useEffect(() => {
		if (deleteBoardParamState) {
			deleteBoardQueryWithRecoil.mutate(deleteBoardParamState);
		}
	}, [deleteBoardParamState]);

	useEffect(() => {
		if (boardListQueryWithRecoil.isLoading) {
			console.log('Get Board List Loading...');
		} else if (boardListQueryWithRecoil.isError) {
			console.log('Get Board List Error', boardListQueryWithRecoil.error);
			boardListQueryWithRecoil.remove();
		} else if (boardListQueryWithRecoil.isSuccess) {
			console.log('Get Board List Success', boardListQueryWithRecoil.data);
			boardListQueryWithRecoil.remove();
		}
	}, [boardListQueryWithRecoil]);

	useEffect(() => {
		if (boardDetailQueryWithRecoil.isLoading) {
			console.log('Get Board Detail Loading...');
		} else if (boardDetailQueryWithRecoil.isError) {
			console.log('Get Board Detail Error', boardDetailQueryWithRecoil.error);
			boardDetailQueryWithRecoil.remove();
		} else if (boardDetailQueryWithRecoil.isSuccess) {
			console.log('Get Board Detail Success', boardDetailQueryWithRecoil.data);
			boardDetailQueryWithRecoil.remove();
		}
	}, [boardDetailQueryWithRecoil]);

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

	// /**
	//  * Create Board
	//  */
	// const createBoard = () => {
	// 	const createBoardParam = {
	// 		title: 'foo',
	// 		body: 'bar',
	// 		userId: 1,
	// 	};
	//
	// 	createBoardQuery.mutate(createBoardParam);
	// };

	/**
	 * Get Board List With Recoil
	 */
	const getBoardListWithRecoil = () => {
		setBoardListParamState({
			...boardListParamState,
			keyword: '',
			page: boardListParamState.page ? boardListParamState.page + 1 : 1,
			size: 10,
		});
	};

	/**
	 * Get Board Detail With Recoil
	 */
	const getBoardDetailWithRecoil = () => {
		setBoardDetailParamState((prev) => prev + 1);
	};

	/**
	 * Create Board With Recoil
	 */
	const createBoardWithRecoil = () => {
		setCreateBoardParamState({
			...createBoardParamState,
			title: `title${createBoardParamState.userId ? createBoardParamState.userId + 1 : 1}`,
			body: `body${createBoardParamState.userId ? createBoardParamState.userId + 1 : 1}`,
			userId: createBoardParamState.userId ? createBoardParamState.userId + 1 : 1,
		});
	};

	/**
	 * Update Board With Recoil
	 */
	const updateBoardWithRecoil = () => {
		setUpdateBoardParamState({
			id: updateBoardParamState.id ? updateBoardParamState.id + 1 : 1,
			title: `title${updateBoardParamState.id ? updateBoardParamState.id + 1 : 1}`,
			body: `body${updateBoardParamState.id ? updateBoardParamState.id + 1 : 1}`,
			userId: updateBoardParamState.userId ? updateBoardParamState.userId + 1 : 1,
		});
	};

	/**
	 * Delete Board With Recoil
	 */
	const deleteBoardWithRecoil = () => {
		setDeleteBoardParamState((prev) => prev + 1);
	};

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Mark Up
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	return (
		<>
			{/*<button onClick={() => boardListQueryWithFetcher.refetch()}>[ GET BOARD LIST WITH FETCHER ]</button>*/}
			{/*<br/>*/}
			<button onClick={getBoardListWithRecoil}>[ GET BOARD LIST WITH RECOIL ]</button>
			<br/>
			<button onClick={getBoardDetailWithRecoil}>[ GET BOARD DETAIL WITH RECOIL ]</button>
			<br/>
			<button onClick={createBoardWithRecoil} disabled={isMutating ? true : false}>[ CREATE BOARD WITH RECOIL ]</button>
			<br/>
			<button onClick={updateBoardWithRecoil} disabled={isMutating ? true : false}>[ UPDATE BOARD WITH RECOIL ]</button>
			<br/>
			<button onClick={deleteBoardWithRecoil} disabled={isMutating ? true : false}>[ DELETE BOARD WITH RECOIL ]</button>
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
