import React from 'react';
import Counter from './pages/reduxtoolkit/Counter';
import Todo from './pages/reduxtoolkit/Todo';
import {useAppDispatch} from './store/config';
import {UserService} from '@services/UserService';

function App() {

	const dispatch = useAppDispatch();

	/**
	 * Get User
	 */
	const getUser = async () => {
		// @ts-ignore
		// TypeScript 업데이트 후 발생하는 문제.
		// TS2345: Argument of type 'AsyncThunkAction<any, string, {}>' is not assignable to parameter of type 'AnyAction'.
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
