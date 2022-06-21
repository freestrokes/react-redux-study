import { Result} from '@typings/Common';
import {instance} from '@hooks/useAxiosLoader';

const API_URL = '/posts';

export const BoardService = {

	/**
	 * Get Board
	 * @param id
	 */
	getBoard: async (id: string) => {
		const {data} = await instance.get<Result<any>>(
			`${API_URL}/${id}`,
			{}
		);

		return data;
	},

	/**
	 * Get Boards
	 * @param param
	 */
	getBoards: async (param) => {
		// pagination total count 사용을 위해 headers 설정.
		// response > headers > x-total-count 값을 사용.
		const {data, headers} = await instance.get<Result<any>>(
			`${API_URL}?q=${param.keyword}&_start=${(param.page-1) * param.size}&_limit=${param.size}`,
			{}
		);

		return {data, headers};
	},

	/**
	 * Create Board
	 * @param param
	 */
	createBoard: async (param) => {
		const {data} = await instance.post<Result<any>>(
			`${API_URL}`,
			param
		);

		return data;
	},

}
