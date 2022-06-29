import { Result} from '@typings/Common';
import {instance} from '@hooks/useAxiosLoader';

const API_URL = '/posts';

export const BoardService = {

	/**
	 * Get Board List
	 * @param param
	 */
	getBoardList: async (param: any) => {
		// pagination total count 사용을 위해 headers 설정.
		// response > headers > x-total-count 값을 사용.
		const {data, headers} = await instance.get<Result<any>>(
			`${API_URL}?q=${param.keyword}&_start=${(param.page-1) * param.size}&_limit=${param.size}`,
			{}
		);

		return {data, headers};
	},

	/**
	 * Get Board Detail
	 * @param id
	 */
	getBoardDetail: async (param) => {
		const {data} = await instance.get<Result<any>>(
			`${API_URL}/${param}`,
			{}
		);

		return data;
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

	/**
	 * Update Board
	 * @param param
	 */
	updateBoard: async (param) => {
		const {data} = await instance.put<Result<any>>(
			`${API_URL}/${param.id}`,
			param
		);

		return data;
	},

	/**
	 * Delete Board
	 * @param param
	 */
	deleteBoard: async (param) => {
		const {data} = await instance.delete<Result<any>>(
			`${API_URL}/${param}`,
		);

		return data;
	},

}
