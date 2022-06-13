import {instance} from '@hooks/useAxiosLoader';
import {Result} from '@typings/Common';
import {createAsyncThunk} from '@reduxjs/toolkit';

const API_URL = `/users`;

export const UserService = {

	/**
	 * Get User
	 * @param id
	 */
	getUser: async (id: number) => {
		const {data} = await instance.get<Result<any>>(
			`${API_URL}/${id}`,
			{}
		);

		return data;
	},

	/**
	 * Get Users
	 * @param param
	 */
	getUsers: async (param) => {
		// pagination total count 사용을 위해 headers 설정.
		// response > headers > x-total-count 값을 사용.
		const {data, headers} = await instance.get<Result<any>>(
			`${API_URL}?q=${param.keyword}&_start=${(param.page-1) * param.size}&_limit=${param.size}`,
			{}
		);

		return {data, headers};
	},

	/**
	 * Get User (Redux Toolkit)
	 */
	getUserForRTK: createAsyncThunk(
		'user/getUser',
		async(userId: string, thunkApi) => {
			const {data} = await instance.get(
				`${API_URL}/${userId}`
			);
			return data;
		}
	),

}
