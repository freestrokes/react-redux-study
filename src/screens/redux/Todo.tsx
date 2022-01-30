import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../../modules/config';
import { changeInput, insert, toggle, remove } from '../../modules/todoModule';

function Todo() {

	////////////////////////////////////////
	// Hooks
	////////////////////////////////////////

	// @ts-ignore
	// inputTitle, todoList type 지정 필요.
	const { inputTitle, todoList } = useSelector((state: RootState) => state.todo);
	const dispatch = useDispatch();

	////////////////////////////////////////
	// Functions
	////////////////////////////////////////

	const onSubmit = useCallback((event) => {
		event.preventDefault();
		dispatch(insert(inputTitle));
		dispatch(changeInput(''));
	}, [dispatch, inputTitle]);

	const onChange = useCallback((event) => {
		dispatch(changeInput(event.target.value));
	}, [dispatch]);

	const onToggle = useCallback((id) => {
		dispatch(toggle(id));
	}, [dispatch]);

	const onRemove = useCallback((id) => {
		dispatch(remove(id));
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
