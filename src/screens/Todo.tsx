/* eslint-disable */

import React, { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from "../store/config";
import { insert, toggle, remove } from '../store/slices/todoSlice';
// import { useSelector, useDispatch } from 'react-redux';
// import produce from 'immer';

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

	const onSubmit = useCallback((event) => {
		event.preventDefault();

		const insertItem: TodoItem = {
			id: (!todoList.length) ? 0 : Math.max(...todoList.map((item) => item.id)) + 1,
			title: inputTitle,
			checked: false
		};

		dispatch(insert(insertItem));
		setInputTitle('');
	}, [dispatch, inputTitle, todoList]);

	const onChange = useCallback((event) => {
		setInputTitle(event.target.value);
	}, [inputTitle]);

	const onToggle = useCallback((id) => {
		dispatch(toggle(id));
	}, [dispatch]);

	const onRemove = useCallback((id) => {
		const removeIndex = todoList.findIndex(item => item.id === id);
		dispatch(remove(removeIndex));
	}, [dispatch]);

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
