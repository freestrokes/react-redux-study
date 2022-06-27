import {QueryClient, useMutation, useQuery} from 'react-query';
import {BoardService} from '@services/BoardService';

export const BoardQuery = {

	useGetBoardListQuery: (param) => useQuery(
		'getBoardList',
		() => BoardService.getBoardList(param),
		{
			refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
			retry: 0, // 실패시 재호출 몇번 할지
			cacheTime: 0,
			enabled: false,
		}
	),

	useGetBoardDetailQuery: (param) => useQuery(
		'getBoardDetail',
		() => BoardService.getBoardDetail(param),
		{
			refetchOnWindowFocus: false,
			retry: 0,
			cacheTime: 0,
			enabled: false,
		}
	),

	useCreateBoardMutation: (queryClient) => useMutation(
		'createBoard',
		(param: any) => BoardService.createBoard(param),
		{
			retry: 0, // 실패시 재호출 몇번 할지
			onMutate: (variables) => {
				// A mutation is about to happen!

				console.log(variables);
				// Optionally return a context containing data to use when for example rolling back
				return {id: 1};
			},
			onError: (error, variables, context) => {
				// An error happened!
				console.log(context);
				// console.log(`rolling back optimistic update with id ${context.id}`)
			},
			// 뮤테이션이 성공한다면, 쿼리의 데이터를 invalidate해 관련된 쿼리가 리패치되도록 만든다.
			onSuccess: (data, variables, context) => {
				queryClient.invalidateQueries('getBoardList');
			},
			onSettled: (data, error, variables, context) => {
				// Error or success... doesn't matter!
			},
		}
	),

	useCreateBoardMutationWithRecoil: (queryClient) => useMutation(
		'createBoardWithRecoil',
		(state: any) => BoardService.createBoard(state),
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
				queryClient.invalidateQueries('createBoardWithRecoil');
			},
			onSettled: (data, error, variables, context) => {
				// Error or success... doesn't matter!
			},
		}
	),

	useUpdateBoardMutationWithRecoil: (queryClient) => useMutation(
		'updateBoardWithRecoil',
		(state: any) => BoardService.updateBoard(state),
		{
			retry: 0, // 실패시 재호출 몇번 할지
			onMutate: (variables) => {
				// A mutation is about to happen!

				console.log(variables);
				// Optionally return a context containing data to use when for example rolling back
				return {id: 1};
			},
			onError: (error, variables, context) => {
				// An error happened!
				console.log(context);
				// console.log(`rolling back optimistic update with id ${context.id}`)
			},
			// 뮤테이션이 성공한다면, 쿼리의 데이터를 invalidate해 관련된 쿼리가 리패치되도록 만든다.
			onSuccess: (data, variables, context) => {
				queryClient.invalidateQueries('updateBoardWithRecoil');
			},
			onSettled: (data, error, variables, context) => {
				// Error or success... doesn't matter!
			},
		}
	),

	useDeleteBoardMutationWithRecoil: (queryClient) => useMutation(
		'deleteBoardWithRecoil',
		(state: any) => BoardService.deleteBoard(state),
		{
			retry: 0, // 실패시 재호출 몇번 할지
			onMutate: (variables) => {
				// A mutation is about to happen!

				console.log(variables);
				// Optionally return a context containing data to use when for example rolling back
				return {id: 1};
			},
			onError: (error, variables, context) => {
				// An error happened!
				console.log(context);
				// console.log(`rolling back optimistic update with id ${context.id}`)
			},
			// 뮤테이션이 성공한다면, 쿼리의 데이터를 invalidate해 관련된 쿼리가 리패치되도록 만든다.
			onSuccess: (data, variables, context) => {
				queryClient.invalidateQueries('deleteBoardWithRecoil');
			},
			onSettled: (data, error, variables, context) => {
				// Error or success... doesn't matter!
			},
		}
	),

}
