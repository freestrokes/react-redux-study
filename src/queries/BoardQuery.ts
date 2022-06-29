import {useQueryClient, useQuery, useMutation, UseQueryResult, UseMutationResult} from 'react-query';
import {BoardService} from '@services/BoardService';
import {boardKeys} from '@queries/QueryKeys';
import {useGetRecoilValueInfo_UNSTABLE, useRecoilState, useRecoilValue} from 'recoil';
import {
	boardDetailParamAtom,
	boardListParamAtom,
	createBoardParamAtom, deleteBoardParamAtom,
	updateBoardParamAtom
} from '@states/atom/BoardAtom';
import {boardListParamSelector} from '@states/selector/BoardSelector';

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
		const boardListParamValue = useRecoilValue(boardListParamAtom);

		// 아래와 같이 selector의 getter를 사용하는 방법도 있음.
		// const boardListParamValueWithSelector = useRecoilValue(boardListParamSelector);

		return useQuery(
			boardKeys.list(),
			() => {
				// queryFn 내부에서는 recoil state 호출할 수 없음 (Invalid hook call 발생)
				console.log('useGetBoardListQueryWithRecoil > queryFn > boardListParamValue', boardListParamValue);
				return BoardService.getBoardList(boardListParamValue);
			},
			{
				enabled: false,
			}
		)
	},

	useGetBoardDetailQueryWithRecoil: (): UseQueryResult => {
		const queryClient = useQueryClient();
		const boardDetailParamValue = useRecoilValue(boardDetailParamAtom);

		return useQuery(
			boardKeys.detail(),
			() => {
				return BoardService.getBoardDetail(boardDetailParamValue);
			},
			{
				enabled: false,
			}
		)
	},

	useCreateBoardMutationWithRecoil: (): UseMutationResult => {
		const queryClient = useQueryClient();
		const createBoardParamValue = useRecoilValue(createBoardParamAtom);

		return useMutation(
			boardKeys.create(),
			() => {
				return BoardService.createBoard(createBoardParamValue);
			},
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
		const updateBoardParamValue = useRecoilValue(updateBoardParamAtom);

		return useMutation(
			boardKeys.update(),
			() => {
				return BoardService.updateBoard(updateBoardParamValue);
			},
			{
				retry: 0,
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
		const deleteBoardParamValue = useRecoilValue(deleteBoardParamAtom);

		return useMutation(
			boardKeys.delete(),
			() => {
				return BoardService.deleteBoard(deleteBoardParamValue);
			},
			{
				retry: 0,
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
