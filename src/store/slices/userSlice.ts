import {createSlice} from '@reduxjs/toolkit';
import {UserService} from '../../services/userService';

const initialState = {};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(UserService.getUser.pending, (state, action) => {
				console.log('pending');
			})
			.addCase(UserService.getUser.fulfilled, (state, action) => {
				console.log('fulfilled');
				// state.entities.push(action.payload);
			})
			.addCase(UserService.getUser.rejected, (state, action) => {
				console.log('rejected');
			})
	}
});

export default userSlice;
