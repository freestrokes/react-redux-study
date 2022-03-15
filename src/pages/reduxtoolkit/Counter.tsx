import React, { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/config';
import { setCounter } from '../../store/slices/counterSlice';

function Counter() {

	////////////////////////////////////////
	// Hooks
	////////////////////////////////////////

	const { value } = useAppSelector(state => state.counter);
	const dispatch = useAppDispatch();

	////////////////////////////////////////
	// Functions
	////////////////////////////////////////

	const onIncrease = useCallback(() => {
		dispatch(setCounter(value + 1));
	}, [dispatch, value]);

	const onDecrease = useCallback(() => {
		dispatch(setCounter(value - 1));
	}, [dispatch, value]);

	////////////////////////////////////////
	// View
	////////////////////////////////////////

  return (
    <>
	    <div>
		    <h1>{value}</h1>
				<div>
					<button onClick={onIncrease}>+</button>
					<button onClick={onDecrease}>-</button>
				</div>
			</div>
    </>
  );
};

export default Counter;
