import {useMutation, useQuery} from 'react-query';
import {BoardService} from '@services/BoardService';

export const BoardQuery = {

	useGetBoardsQuery: (param) => useQuery(
		'getBoards',
		() => BoardService.getBoards(param),
		{
			refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
			retry: 0, // 실패시 재호출 몇번 할지
			enabled: true,
		}
	),

	useGetBoardQuery: (param) => useQuery(
		'getBoard',
		() => BoardService.getBoard(param),
		{
			refetchOnWindowFocus: false,
			retry: 0,
			enabled: true,
		}
	),

	useCreateBoardQuery: (param) => useMutation(
		'createBoard',
		() => BoardService.createBoard(param),
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
			onSuccess: (data, variables, context) => {
				// Boom baby!
			},
			onSettled: (data, error, variables, context) => {
				// Error or success... doesn't matter!
			},
		}
	),

}
