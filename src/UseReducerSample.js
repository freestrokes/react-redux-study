import React, { useCallback, useReducer } from 'react';

const initialState = {
	value: 0
};

function reducer(state, action) {
	console.log('action.type: ', action.type);
	switch (action.type) {
		case 'INCREASE':
			return {
				...state,
				value: state.value + 1
			};
		case 'DECREASE':
			return {
				...state,
				value: state.value - 1
			};
		default:
			return state;
	}
}

function UseReducerSample() {

	// const name = 'react';
	// const style = {
	// 	backgroundColor: 'black',
	// 	color: 'aqua',
	// 	fontSize: 24, // 기본 단위 px
	// 	padding: '1rem' // 다른 단위 사용 시 문자열로 설정
	// };

	// const arr = [1, 2, 3, 4, 5];
	// const nextArr1 = arr; // 같은 배열을 가리키도록 할당
	// const nextArr2 = [...arr];  // 새로운 배열에 값을 모두 복사
	//
	// nextArr1[0] = 10;
	// console.log(arr === nextArr1);  // true, 서로 같은 배열
	//
	// nextArr2[0] = 10;
	// console.log(arr === nextArr2);  // false, 서로 다른 배열

	const obj = {
		checked: false,
		innerObj: {
			checked: false
		}
	};
	// const nextObj1 = {...obj};
	//
	// nextObj1.innerObj.checked = true;
	// console.log(obj.innerObj.checked === nextObj1.innerObj.checked); // true

	const nextObj2 = {
		...obj,
		innerObj: {
			...obj.innerObj,
			checked: true
		}
	};

	console.log(obj.innerObj.checked === nextObj2.innerObj.checked); // false

	////////////////////////////////////////
	// States
	////////////////////////////////////////

	const [state, dispatch] = useReducer(reducer, initialState);
	const { value } = state;

	////////////////////////////////////////
	// Functions
	////////////////////////////////////////

	const onClickIncrease = useCallback((event) => {
		dispatch({
			type: 'INCREASE'
		});
	}, []);

	const onClickDecrease = useCallback((event) => {
		dispatch({
			type: 'DECREASE'
		});
	}, []);

	////////////////////////////////////////
	// View
	////////////////////////////////////////

	return (
		<div>
			<div>
				value: {value}
			</div>
			<button onClick={onClickIncrease}>+</button>
			<button onClick={onClickDecrease}>-</button>
		</div>
	);
}

export default UseReducerSample;