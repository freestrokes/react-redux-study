import React, { useState, useMemo, useCallback, useRef } from 'react';

function ComponentSample() {
	// const [name, setName] = useState('');
	// const [age, setAge] = useState('');
	//
	// useEffect(() => {
	// 	console.log('Default effect to Rendering.');
	// 	console.log('name: ', name);
	// 	console.log('age: ', age);
	// });
	//
	// const onChangeName = (event) => {
	// 	setName(prevName => event.target.value);
	// };
	// const onChangeAge = (event) => {
	// 	setAge(prevAge => event.target.value);
	// };

	////////////////////////////////////////
	// States
	////////////////////////////////////////

	const [list, setList] = useState([]);
	const [number, setNumber] = useState('');

	const numberInput = useRef();

	////////////////////////////////////////
	// Hooks
	////////////////////////////////////////



	////////////////////////////////////////
	// Functions
	////////////////////////////////////////

	const onChangeNumber = useCallback((event) => {
		setNumber(prevNumber => event.target.value);
	}, []);

	const onClickAddList = useCallback((event) => {
		// const nextList = list.concat(parseInt(number));
		// setList(nextList);
		// setNumber('');
		// numberInput.current.focus();
		console.log(event);
	}, [number, list]);

	const average = useMemo(() => {
		console.log('Calculating...');
		if (list.length === 0) {
			return;
		}
		const sum = list.reduce((a, b) => a + b);
		return sum / list.length;
	}, [list]);


	return (
		<>
			{/*<div>*/}
			{/*<input value={name} onChange={onChangeName}></input>*/}
			{/*<input value={age} onChange={onChangeAge}></input>*/}
			{/*</div>*/}
			{/*<div>*/}
			{/*<div>name: {name}</div>*/}
			{/*<div>age: {age}</div>*/}
			{/*</div>*/}

			<div>
				<input value={number} ref={numberInput} onChange={onChangeNumber}></input>
				<button onClick={onClickAddList}>Add</button>
				<ul>
					{list.map((value, index) => (
						<li key={index}>{value}</li>
					))}
				</ul>
				<div>
					Average: {average}
				</div>
			</div>
		</>
	);
}

export default ComponentSample;
