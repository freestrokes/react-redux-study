import React, { useState, useCallback } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { counterSelector, counterState } from '../../states/counterState';

interface CommonState {
	value: number
};

function Counter() {

	////////////////////////////////////////
	// Hooks
	////////////////////////////////////////

	// selector
	const [recoilCounter, setRecoilCounter] = useRecoilState(counterSelector);

	// atom
	// const [recoilCounter, setRecoilCounter] = useRecoilState(counterState);

	// 또는 아래와 같이 나눠서도 사용 가능.
	// const recoilCounterValue = useRecoilValue(recoilCounterState);
	// const setRecoilCounter = useSetRecoilState(recoilCounterState);
	// const resetRecoilCounter = useResetRecoilState(recoilCounterState);  // 초기화

	const defaultRecoilCounterState: CommonState = {...recoilCounter};

	////////////////////////////////////////
	// Functions
	////////////////////////////////////////

	const onIncrease = useCallback(() => {
		defaultRecoilCounterState.value = recoilCounter.value + 1;
		setRecoilCounter(defaultRecoilCounterState);
	}, [recoilCounter]);

	const onDecrease = useCallback(() => {
		defaultRecoilCounterState.value = recoilCounter.value - 1;
		setRecoilCounter(defaultRecoilCounterState);
	}, [recoilCounter]);

	////////////////////////////////////////
	// View
	////////////////////////////////////////

  return (
    <>
	    <div>
		    <h1>{recoilCounter.value}</h1>
				<div>
					<button onClick={onIncrease}>+</button>
					<button onClick={onDecrease}>-</button>
				</div>
			</div>
    </>
  );
};

export default Counter;