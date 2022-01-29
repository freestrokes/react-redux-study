import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TodoItem {
	id: number,
	title: string,
	checked: boolean
}

export interface CommonState {
	todoList: TodoItem[]
}

const initialState: CommonState = {
	todoList: []
};

export const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		setTodo(state, action: PayloadAction<TodoItem[]>) {
			// 상태만 넘기는 것으로 변경하면 아래와 같이 좀 더 간편하게 사용 가능.
			state.todoList = action.payload;
		}
	}
});

export const { setTodo } = todoSlice.actions;
export default todoSlice;
