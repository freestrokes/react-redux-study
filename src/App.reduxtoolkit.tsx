import React from 'react';
import Counter from './screens/reduxtoolkit/Counter';
import Todo from './screens/reduxtoolkit/Todo';
import {useAppDispatch} from './store/config';
import {UserService} from './services/userService';

function App() {

	const dispatch = useAppDispatch();

	/**
	 * Get User
	 */
	const getUser = async () => {
		// @ts-ignore
		dispatch(UserService.getUserForRTK('1'));
	};

	return (
		<>
			<Counter />
			<hr />
			<Todo />
			<hr />
			<button onClick={getUser}>[ GET USER ]</button>
		</>
	);
}

export default App;
