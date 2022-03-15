import React, { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/config';
import { setTodo } from '../../store/slices/todoSlice';

interface TodoItem {
	id: number,
	title: string,
	checked: boolean
}

function Todo() {

	////////////////////////////////////////
	// Hooks
	////////////////////////////////////////

	const { todoList } = useAppSelector(state => state.todo);
	const [inputTitle, setInputTitle] = useState('');
	const dispatch = useAppDispatch();

	////////////////////////////////////////
	// Functions
	////////////////////////////////////////

	const onChange = useCallback((event) => {
		setInputTitle(event.target.value);
	}, [inputTitle]);

	// 상태만 넘기는 것으로 사용.
	const onSubmit = useCallback((event) => {
		event.preventDefault();

		const insertItem: TodoItem = {
			id: (!todoList.length) ? 0 : Math.max(...todoList.map((item) => item.id)) + 1,
			title: inputTitle,
			checked: false
		};
		const setTodoList = [...todoList, insertItem];

		dispatch(setTodo(setTodoList));
		setInputTitle('');
	}, [dispatch, inputTitle, todoList]);

	const onToggle = useCallback((id) => {
		// 상태는 읽기 전용이기 때문에 다음과 같이 shallow copy를 해줘서 작업을 해주고 넘겨줘야 함.
		const setTodoList = [...todoList];
		const toggleIndex = setTodoList.findIndex(item => item.id === id);
		const toggleItem = {...setTodoList[toggleIndex]};

		toggleItem.checked = !toggleItem.checked;
		setTodoList[toggleIndex] = {...toggleItem};
		dispatch(setTodo(setTodoList));
	}, [dispatch, todoList]);

	const onRemove = useCallback((id) => {
		const setTodoList = [...todoList];
		const removeIndex = setTodoList.findIndex(item => item.id === id);

		setTodoList.splice(removeIndex, 1);
		dispatch(setTodo(setTodoList));
	}, [dispatch, todoList]);

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
	        todoList.map((item, index) => (
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
