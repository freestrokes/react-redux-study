/* eslint-disable */

import React, { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from "../store/config";
import { increase, decrease } from '../store/slices/counterSlice';
// import { useSelector, useDispatch } from 'react-redux';

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
		dispatch(increase(1));
	}, [dispatch]);

	const onDecrease = useCallback(() => {
		dispatch(decrease(1));
	}, [dispatch]);

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
