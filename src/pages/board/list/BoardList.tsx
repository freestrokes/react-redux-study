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
import {BoardSearchParam, CreateBoardParam, UpdateBoardParam} from '@typings/Board';
import useQueryMutator from '@hooks/useQueryMutator';
import {boardKeys} from '@queries/QueryKeys';

function BoardList() {

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| States & Variables
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	// Get QueryClient from the context
	const queryClient = useQueryClient();
	const isMutating = useIsMutating();

	const [boardListParam, setBoardListParam] = useState<BoardSearchParam>({} as BoardSearchParam);
	const [boardDetailParam, setBoardDetailParam] = useState(0);
	const [createBoardParam, setCreateBoardParam] = useState<CreateBoardParam>({} as CreateBoardParam);

	// useQuery / useMutation with param
	const boardListQueryWithParam = BoardQuery.useGetBoardListQueryWithParam(boardListParam);
	const boardDetailQueryWithParam = BoardQuery.useGetBoardDetailQueryWithParam(boardDetailParam);
	const createBoardQueryWithParam = BoardQuery.useCreateBoardMutationWithParam(createBoardParam);

	// query custom fetcher
	const boardListQueryWithCustomFetcher = useQueryFetcher(
			['boardListQueryWithCustomFetcher', boardListParam],
			() => BoardService.getBoardList(boardListParam),
			{
				refetchOnWindowFocus: false,
				retry: 0,
				cacheTime: 0,
				enabled: false,
			}
		);
	const createBoardQueryWithCustomMutator = useQueryMutator(
			['createBoardQueryWithCustomMutator', createBoardParam],
			() => BoardService.createBoard(createBoardParam),
			{
				retry: 0,
				onMutate: (variables) => {
					// A mutation is about to happen!
					console.log('onMutate', variables);
					// Optionally return a context containing data to use when for example rolling back
					return { id: 1 };
				},
				onError: (error, variables, context) => {
					console.log('onError', context);
					// An error happened!
					console.log(`rolling back optimistic update with id ${context}`)
				},
				// 뮤테이션이 성공한다면, 쿼리의 데이터를 invalidate해 관련된 쿼리가 리패치되도록 만든다.
				onSuccess: (data, variables, context) => {
					queryClient.invalidateQueries('createBoardQueryWithCustomMutator');
				},
				onSettled: (data, error, variables, context) => {
					// Error or success... doesn't matter!
				},
			}
		);

	// recoil states
	const [boardListParamState, setBoardListParamState] = useRecoilState<BoardSearchParam>(boardListParamAtom);
	const [boardDetailParamState, setBoardDetailParamState] = useRecoilState(boardDetailParamAtom);
	const [createBoardParamState, setCreateBoardParamState] = useRecoilState<CreateBoardParam>(createBoardParamAtom);
	const [updateBoardParamState, setUpdateBoardParamState] = useRecoilState<UpdateBoardParam>(updateBoardParamAtom);
	const [deleteBoardParamState, setDeleteBoardParamState] = useRecoilState(deleteBoardParamAtom);

	// useQuery / useMutation with recoil
	const boardListQueryWithRecoil = BoardQuery.useGetBoardListQueryWithRecoil();
	const boardDetailQueryWithRecoil = BoardQuery.useGetBoardDetailQueryWithRecoil();
	const createBoardQueryWithRecoil = BoardQuery.useCreateBoardMutationWithRecoil();
	const updateBoardQueryWithRecoil = BoardQuery.useUpdateBoardMutationWithRecoil();
	const deleteBoardQueryWithRecoil = BoardQuery.useDeleteBoardMutationWithRecoil();

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Hooks
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	//////////////////////////////////////////////////
	// useQuery / useMutation with param
	//////////////////////////////////////////////////

	useEffect(() => {
		if (boardListParam && Object.keys(boardListParam).length) {
			boardListQueryWithParam.refetch();
		}
	}, [boardListParam]);

	useEffect(() => {
		if (boardDetailParam) {
			boardDetailQueryWithParam.refetch();
		}
	}, [boardDetailParam]);

	useEffect(() => {
		if (boardListParamState && Object.keys(boardListParamState).length) {
			// queryFn이나 mutationFn에 recoil state를 파라미터로 넘겨서 사용할 수 없음. (Invalid hook call 발생)
			// useQuery(), useMutation() 호출하는 함수 내부에서 recoil state를 호출하는 방법으로 사용.
			boardListQueryWithRecoil.refetch();
		}
	}, [boardListParamState]);

	useEffect(() => {
		if (createBoardParam && Object.keys(createBoardParam).length) {
			createBoardQueryWithParam.mutate(createBoardParam);
		}
	}, [createBoardParam]);

	//////////////////////////////////////////////////
	// useQuery / useMutation with recoil action
	//////////////////////////////////////////////////

	useEffect(() => {
		if (boardDetailParamState) {
			// queryFn이나 mutationFn에 recoil state를 파라미터로 넘겨서 사용할 수 없음. (Invalid hook call 발생)
			// useQuery(), useMutation() 호출하는 함수 내부에서 recoil state를 호출하는 방법으로 사용.
			boardDetailQueryWithRecoil.refetch();
		}
	}, [boardDetailParamState]);

	useEffect(() => {
		// TODO: atom snapshot 이용하여 상태 비교가 가능한지 확인 필요
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

	//////////////////////////////////////////////////
	// useQuery / useMutation with recoil status
	//////////////////////////////////////////////////

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

	/**
	 * Get Board List With Param
	 */
	const getBoardListWithParam = () => {
		setBoardListParam({
			...boardListParam,
			keyword: '',
			page: boardListParam.page ? boardListParam.page + 1 : 1,
			size: 10
		});
	};

	/**
	 * Get Board Detail With Param
	 */
	const getBoardDetailWithParam = () => {
		setBoardDetailParam((prev) => prev + 1);
	};

	/**
	 * Create Board With Param
	 */
	const createBoardWithParam = () => {
		setCreateBoardParam({
			...createBoardParam,
			title: `title${createBoardParam.userId ? createBoardParam.userId + 1 : 1}`,
			body: `body${createBoardParam.userId ? createBoardParam.userId + 1 : 1}`,
			userId: createBoardParam.userId ? createBoardParam.userId + 1 : 1,
		});
	};

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
			...updateBoardParamState,
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

	/**
	 * Get Board List With Custom Fetcher
	 */
	const getBoardListWithCustomFetcher = () => {
		if (boardListParam && Object.keys(boardListParam).length) {
			boardListQueryWithCustomFetcher.refetch();
		}
	};

	/**
	 * Create Board List With Custom Fetcher
	 */
	const createBoardWithCustomMutator = () => {
		if (createBoardParam && Object.keys(createBoardParam).length) {
			createBoardQueryWithCustomMutator.mutate(createBoardParam);
		}
	};

	/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	| Mark Up
	|-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

	return (
		<>
			<button onClick={getBoardListWithParam}>[ GET BOARD LIST WITH PARAM ]</button>
			<br/>
			<button onClick={getBoardDetailWithParam}>[ GET BOARD DETAIL WITH PARAM ]</button>
			<br/>
			<button onClick={createBoardWithParam} disabled={isMutating ? true : false}>[ CREATE BOARD WITH PARAM ]</button>
			<hr/>
			<button onClick={getBoardListWithRecoil}>[ GET BOARD LIST WITH RECOIL ]</button>
			<br/>
			<button onClick={getBoardDetailWithRecoil}>[ GET BOARD DETAIL WITH RECOIL ]</button>
			<br/>
			<button onClick={createBoardWithRecoil} disabled={isMutating ? true : false}>[ CREATE BOARD WITH RECOIL ]</button>
			<br/>
			<button onClick={updateBoardWithRecoil} disabled={isMutating ? true : false}>[ UPDATE BOARD WITH RECOIL ]</button>
			<br/>
			<button onClick={deleteBoardWithRecoil} disabled={isMutating ? true : false}>[ DELETE BOARD WITH RECOIL ]</button>
			<hr/>
			<button onClick={getBoardListWithCustomFetcher}>[ GET BOARD LIST WITH CUSTOM FETCHER ]</button>
			<br/>
			<button onClick={createBoardWithCustomMutator} disabled={isMutating ? true : false}>[ GET BOARD LIST WITH CUSTOM MUTATOR ]</button>
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
