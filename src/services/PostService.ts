import { Result} from '@typings/Common';
import {instance} from '@hooks/useAxiosLoader';

const API_URL = '/posts';

export const PostService = {

	/**
	 * Get Post
	 * @param id
	 */
	getPost: async (id: string) => {
		const {data} = await instance.get<Result<any>>(
			`${API_URL}/${id}`,
			{}
		);

		return data;
	},

	/**
	 * Get Posts
	 * @param param
	 */
	getPosts: async (param) => {
		// pagination total count 사용을 위해 headers 설정.
		// response > headers > x-total-count 값을 사용.
		const {data, headers} = await instance.get<Result<any>>(
			`${API_URL}?q=${param.keyword}&_start=${(param.page-1) * param.size}&_limit=${param.size}`,
			{}
		);

		return {data, headers};
	},

	/**
	 * Create Post
	 * @param param
	 */
	createPost: async (param) => {
		const {data} = await instance.post<Result<any>>(
			`${API_URL}/posts`,
			param
		);

		return data;
	},

	/**
	 * Get User
	 * @param id
	 */
	getUser: async () => {
		const {data} = await instance.get<Result<any>>(
			`/api/user`,
			{}
		);

		return data;
	},

}
