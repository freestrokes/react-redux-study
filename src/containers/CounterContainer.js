import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counterModule';

const CounterContainer = () => {
  const number = useSelector(state => state.counter.number);
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);

  return (
    <>
      {/*<Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />*/}
	    <div>
		    <h1>{number}</h1>
				<div>
					<button onClick={onIncrease}>+1</button>
					<button onClick={onDecrease}>-1</button>
				</div>
			</div>
    </>
  );
};

export default CounterContainer;
