import {useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult} from 'react-query';
import {BoardService} from '@services/BoardService';
import {boardKeys} from '@queries/QueryKeys';
import {useRecoilState, useRecoilValue} from 'recoil';
import {boardListAtom} from '@states/atom/BoardAtom';

export const BoardQuery = {

	// boardQueryClient: () => {
	// 	return useQueryClient();
	// },

	// useGetBoardListQuery: (param): UseQueryResult => useQuery(
	// 	boardKeys.list(),
	// 	() => BoardService.getBoardList(param),
	// 	{
	// 		enabled: false,
	// 	}
	// ),

	// useGetBoardDetailQuery: (param): UseQueryResult => useQuery(
	// 	boardKeys.detail(),
	// 	() => BoardService.getBoardDetail(param),
	// 	{
	// 		enabled: false,
	// 	}
	// ),

	// useCreateBoardMutation: (): UseMutationResult => useMutation(
	// 	'createBoard',
	// 	(param: any) => BoardService.createBoard(param),
	// 	{
	// 		onMutate: (variables) => {
	// 			// // mutate가 호출될 때 쿼리를 확실하게 취소
	// 			// await queryClient.cancelQueries(queryKeys.todos);
	// 			// // 쿼리 상태를 가져온다(이전 값 스냅샷)
	// 			// const previousTodos = queryClient.getQueryData<TodoType[]>(queryKeys.todos);
	// 			// if (previousTodos) {
	// 			// 	// previousTodos 가 있으면 setQueryData 를 이용하여 즉시 새 데이터로 업데이트 해준다.
	// 			// 	queryClient.setQueryData<TodoType[]>(queryKeys.todos, (old) => [
	// 			// 		...(old as TodoType[]),
	// 			// 		newTodo,
	// 			// 	]);
	// 			// }
	// 			// return { previousTodos }; // 이전 값을 리턴한다
	//
	// 			// A mutation is about to happen!
	// 			console.log('onMutate', variables);
	//
	// 			// Optionally return a context containing data to use when for example rolling back
	// 			return {id: 1};
	// 		},
	// 		onError: (error, variables, context) => {
	// 			// An error happened!
	// 			// if (context?.previousTodos) { // error 를 만났을 경우 onMutate에서 반환된 값으로 다시 롤백시켜준다.
	// 			// 	queryClient.setQueryData<TodoType[]>(queryKeys.todos, context.previousTodos);
	// 			// }
	// 			// console.log(`rolling back optimistic update with id ${context.id}`)
	// 		},
	// 		// 뮤테이션이 성공한다면, 쿼리의 데이터를 invalidate해 관련된 쿼리가 리패치되도록 만든다.
	// 		onSuccess: (data, variables, context) => {
	// 			useQueryClient().invalidateQueries('getBoardList');
	// 		},
	// 		onSettled: (data, error, variables, context) => {
	// 			// Error or success... doesn't matter!
	// 			// mutation이 끝나면 (성공유무 상관없이) 쿼리를 무효화 처리하고 새로 가져온다.
	// 			// queryClient.invalidateQueries(queryKeys.todos);
	// 		},
	// 	}
	// ),

	useGetBoardListQueryWithRecoil: (): UseQueryResult => {
		const queryClient = useQueryClient();
		const boardListValue = useRecoilValue(boardListAtom);
		console.log('useGetBoardListQueryWithRecoil', boardListValue);

		return useQuery(
			boardKeys.list(),
			() => {
				// TODO
				// 여기서는 recoil state 넘겨받을 수 없음.
				return BoardService.getBoardList(boardListValue)
			},
			{
				enabled: false,
			}
		)
	},

	useGetBoardDetailQueryWithRecoil: (): UseQueryResult => {
		const queryClient = useQueryClient();

		return useQuery(
			boardKeys.detail(),
			(state: any) => BoardService.getBoardDetail(state),
			{
				enabled: false,
			}
		)
	},

	useCreateBoardMutationWithRecoil: (): UseMutationResult => {
		const queryClient = useQueryClient();

		return useMutation(
			boardKeys.create(),
			(state: any) => BoardService.createBoard(state),
			{
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
		)
	},

	useUpdateBoardMutationWithRecoil: (): UseMutationResult => {
		const queryClient = useQueryClient();

		return useMutation(
			boardKeys.update(),
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
		)
	},

	useDeleteBoardMutationWithRecoil: (): UseMutationResult => {
		const queryClient = useQueryClient();

		return useMutation(
			boardKeys.delete(),
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
		)
	},

}
