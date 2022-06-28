import React, {useEffect} from 'react';
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
import {useQueryClient} from 'react-query';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
	createBoardAtom,
	updateBoardAtom,
	deleteBoardAtom,
	boardListAtom,
	boardDetailAtom
} from '@states/atom/BoardAtom';
import {BoardQuery} from '@queries/BoardQuery';
import useQueryFetcher from '@hooks/useQueryFetcher';

function BoardList() {

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| States & Variables
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Hooks
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	// async/await 비동기 예시
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
	const [boardListState, setBoardListState] = useRecoilState(boardListAtom);
	const [boardDetailState, setBoardDetailState] = useRecoilState(boardDetailAtom);
	const [createBoardState, setCreateBoardState] = useRecoilState(createBoardAtom);
	const [updateBoardState, setUpdateBoardState] = useRecoilState(updateBoardAtom);
	const [deleteBoardState, setDeleteBoardState] = useRecoilState(deleteBoardAtom);

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

	// useEffect(() => {
	// 	console.log('boardListQueryWithFetcher', boardListQueryWithFetcher);
	// }, [boardListQueryWithFetcher]);

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
		setBoardListState({
			...boardListState,
			keyword: 'a',
			page: 2,
			size: 10
		});

		// TODO
		// queryFn이나 mutationFn에 recoil state를 파라미터로 넘겨서 사용할 수 있는 방법은 아직 확인 안 됨.
		// useQuery(), useMutation() 내부에서 recoil state를 호출하는 방법으로 동작하는 것은 확인 됨.

		boardListQueryWithRecoil.refetch();
	};

	/**
	 * Get Board Detail With Recoil
	 */
	const getBoardDetailWithRecoil = () => {
		setBoardDetailState({
			id: 1
		});

		boardDetailQueryWithRecoil.refetch(boardDetailState as any);
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

		createBoardQueryWithRecoil.mutate(createBoardState as any);
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

		updateBoardQueryWithRecoil.mutate(updateBoardState as any);
	};

	/**
	 * Delete Board With Recoil
	 */
	const deleteBoardWithRecoil = () => {
		setDeleteBoardState(1);

		deleteBoardQueryWithRecoil.mutate(deleteBoardState as any);
	};

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Mark Up
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	return (
		<>
			{/*<button onClick={() => boardListQueryWithFetcher.refetch()}>[ GET BOARD LIST WITH FETCHER ]</button>*/}
			{/*<br/>*/}
			{/*<button onClick={createBoard}>[ CREATE BOARD ]</button>*/}
			{/*<br/>*/}
			<button onClick={getBoardListWithRecoil}>[ GET BOARD LIST WITH RECOIL ]</button>
			<br/>
			<button onClick={getBoardDetailWithRecoil}>[ GET BOARD DETAIL WITH RECOIL ]</button>
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
