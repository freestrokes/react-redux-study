import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeInput, insert, toggle, remove } from '../modules/todoModule';

function Todo() {

	////////////////////////////////////////
	// Hooks
	////////////////////////////////////////

	const { inputTitle, todoList } = useSelector(state => state.todo);
	const dispatch = useDispatch();

	////////////////////////////////////////
	// Functions
	////////////////////////////////////////

	const onSubmit = useCallback((event) => {
		event.preventDefault();
		dispatch(insert(inputTitle));
		dispatch(changeInput('')); // 등록 후 인풋 초기화
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
