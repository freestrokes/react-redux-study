import {useQueryClient, useQuery, useMutation, UseQueryResult, UseMutationResult} from 'react-query';
import {BoardService} from '@services/BoardService';
import {boardKeys} from '@queries/QueryKeys';
import {useRecoilValue} from 'recoil';
import {
	boardDetailParamAtom,
	boardListParamAtom,
	createBoardParamAtom, deleteBoardParamAtom,
	updateBoardParamAtom
} from '@states/atom/BoardAtom';
// import {boardListParamSelector} from '@states/selector/BoardSelector';

export const BoardQuery = {

	// boardQueryClient: () => {
	// 	return useQueryClient();
	// },

	useGetBoardListQueryWithParam: (param: any): UseQueryResult => {
		const queryClient = useQueryClient();

		return useQuery(
			boardKeys.listWithParam(),
			() => BoardService.getBoardList(param),
			{
				enabled: false,
			}
		)
	},

	useGetBoardDetailQueryWithParam: (param: any): UseQueryResult => {
		const queryClient = useQueryClient();

		return useQuery(
			boardKeys.detailWithParam(),
			() => BoardService.getBoardDetail(param),
			{
				enabled: false,
			}
		)
	},

	useCreateBoardMutationWithParam: (param: any): UseMutationResult => {
		const queryClient = useQueryClient();

		return useMutation(
			boardKeys.createWithParam(),
			() => BoardService.createBoard(param),
			{
				retry: 0,
				onMutate: (variables) => {
					// A mutation is about to happen!
					console.log('onMutate', variables);
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
					queryClient.invalidateQueries(boardKeys.createWithParam());
				},
				onSettled: (data, error, variables, context) => {
					// Error or success... doesn't matter!
				},
			}
		)
	},

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
					queryClient.invalidateQueries(boardKeys.create());
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
					console.log('onMutate', variables);
					// Optionally return a context containing data to use when for example rolling back
					return { id: 1 };
				},
				onError: (error, variables, context) => {
					// An error happened!
					console.log(context);
					// console.log(`rolling back optimistic update with id ${context.id}`)
				},
				// 뮤테이션이 성공한다면, 쿼리의 데이터를 invalidate해 관련된 쿼리가 리패치되도록 만든다.
				onSuccess: (data, variables, context) => {
					queryClient.invalidateQueries(boardKeys.update());
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
					console.log('onMutate', variables);
					// Optionally return a context containing data to use when for example rolling back
					return { id: 1 };
				},
				onError: (error, variables, context) => {
					// An error happened!
					console.log(context);
					// console.log(`rolling back optimistic update with id ${context.id}`)
				},
				// 뮤테이션이 성공한다면, 쿼리의 데이터를 invalidate해 관련된 쿼리가 리패치되도록 만든다.
				onSuccess: (data, variables, context) => {
					queryClient.invalidateQueries(boardKeys.delete());
				},
				onSettled: (data, error, variables, context) => {
					// Error or success... doesn't matter!
				},
			}
		)
	},

}
