import {createSlice} from '@reduxjs/toolkit';
import {UserService} from '@services/UserService';

const initialState = {};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(UserService.getUserForRTK.pending, (state, action) => {
				console.log('pending');
			})
			.addCase(UserService.getUserForRTK.fulfilled, (state, action) => {
				console.log('fulfilled');
				// state.entities.push(action.payload);
			})
			.addCase(UserService.getUserForRTK.rejected, (state, action) => {
				console.log('rejected');
			})
	}
});

export default userSlice;
