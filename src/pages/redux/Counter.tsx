import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from '../../modules/config';
import { increase, decrease } from '../../modules/counterModule';

function Counter() {

	////////////////////////////////////////
	// Hooks
	////////////////////////////////////////

	// @ts-ignore
	// number type 지정 필요.
	const { number } = useSelector((state: RootState) => state.counter);
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
		    <h1>{number}</h1>
				<div>
					<button onClick={onIncrease}>+</button>
					<button onClick={onDecrease}>-</button>
				</div>
			</div>
    </>
  );
};

export default Counter;
