import React, { useState, useCallback } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { todoListSelector } from '@states/selector/TodoSelector';

interface TodoItem {
	id: number,
	title: string,
	checked: boolean
};

export interface CommonState {
	todoList: TodoItem[]
};

function Todo() {

	////////////////////////////////////////
	// Hooks
	////////////////////////////////////////

	// selector
	const [recoilTodo, setRecoilTodo] = useRecoilState(todoListSelector);

	// atom
	// const [recoilTodo, setRecoilTodo] = useRecoilState(todoState);

	// 또는 아래와 같이 나눠서도 사용 가능.
	// const recoilTodoValue = useRecoilValue(recoilTodoState);
	// const setRecoilTodo = useSetRecoilState(recoilTodoState);
	// const resetRecoilTodo = useResetRecoilState(recoilTodoState);  // 초기화

	const [inputTitle, setInputTitle] = useState('');

	// @ts-ignore
	const defaultRecoilTodoState: CommonState = {...recoilTodo};

	////////////////////////////////////////
	// Functions
	////////////////////////////////////////

	const onChange = useCallback((event) => {
		setInputTitle(event.target.value);
	}, [inputTitle]);

	const onSubmit = useCallback((event) => {
		event.preventDefault();

		const insertItem: TodoItem = {
			// @ts-ignore
			id: (!recoilTodo.todoList.length) ? 0 : Math.max(...recoilTodo.todoList.map((item) => item.id)) + 1,
			title: inputTitle,
			checked: false
		};
		// @ts-ignore
		const setTodoList = [...recoilTodo.todoList, insertItem];

		defaultRecoilTodoState.todoList = setTodoList;
		setRecoilTodo(defaultRecoilTodoState);

		setInputTitle('');
	}, [inputTitle, recoilTodo]);

	const onToggle = useCallback((id) => {
		// 상태는 읽기 전용이기 때문에 다음과 같이 shallow copy를 해줘서 작업을 해주고 넘겨줘야 함
		// @ts-ignore
		const setTodoList = [...recoilTodo.todoList];
		const toggleIndex = setTodoList.findIndex(item => item.id === id);
		const toggleItem = {...setTodoList[toggleIndex]};

		toggleItem.checked = !toggleItem.checked;
		setTodoList[toggleIndex] = {...toggleItem};

		defaultRecoilTodoState.todoList = setTodoList;
		setRecoilTodo(defaultRecoilTodoState);
	}, [recoilTodo]);

	const onRemove = useCallback((id) => {
		// @ts-ignore
		const setTodoList = [...recoilTodo.todoList];
		const removeIndex = setTodoList.findIndex(item => item.id === id);

		setTodoList.splice(removeIndex, 1);

		defaultRecoilTodoState.todoList = setTodoList;
		setRecoilTodo(defaultRecoilTodoState);
	}, [recoilTodo]);

	////////////////////////////////////////
	// View
	////////////////////////////////////////

	return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={inputTitle} onChange={onChange} />
        <button type="submit">Add</button>
      </form>
      <div>
        {
	        recoilTodo['todoList'].map((item, index) => (
		        <div key={index}>
			        <input
				        type="checkbox"
				        checked={item.checked}
				        readOnly={true}
				        onClick={() => onToggle(item.id)}
			        />
			        <span style={{ textDecoration: item.checked ? 'line-through' : 'none' }}>
			          {item.title}
			        </span>
			        <button onClick={() => onRemove(item.id)}>X</button>
		        </div>
          ))
        }
      </div>
    </div>
  );
};

export default Todo;
