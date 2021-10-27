import React, { useRef } from 'react';

function UseRefSample() {

	const id = useRef(0);

	const setId = () => {
		id.current = id.current + 1;
		getId();
	}
	const getId = () => {
		console.log('id', id.current);
	}

	return (
		<>
			<button onClick={setId}>Add id</button>
		</>
	);
}

export default UseRefSample;