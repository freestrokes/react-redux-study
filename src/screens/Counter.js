import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increase, decrease } from '../modules/counterModule';

function Counter() {

	////////////////////////////////////////
	// Hooks
	////////////////////////////////////////

  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();

	////////////////////////////////////////
	// Functions
	////////////////////////////////////////

  const onIncrease = useCallback(() => {
  	dispatch(increase());
  }, [dispatch]);

  const onDecrease = useCallback(() => {
  	dispatch(decrease());
  }, [dispatch]);

	////////////////////////////////////////
	// View
	////////////////////////////////////////

  return (
    <>
	    <div>
		    <h1>{counter.number}</h1>
				<div>
					<button onClick={onIncrease}>+</button>
					<button onClick={onDecrease}>-</button>
				</div>
			</div>
    </>
  );
};

export default Counter;
