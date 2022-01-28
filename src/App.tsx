import React, {useState} from 'react';
import { userSelector, usersSelector } from './states/userState';
import {useRecoilState, useRecoilValue, useRecoilValueLoadable} from 'recoil';
// import RecoilCounter from './screens/RecoilCounter';
// import RecoilTodo from './screens/RecoilTodo';
// import {useAppDispatch} from './store/config';
// import {UserService} from './services/userService';
// import Counter from './screens/Counter';
// import Todo from './screens/Todo';

function App() {

	// TODO
	// redux toolkit
	// const dispatch = useAppDispatch();
	// const [recoilUser, setRecoilUser] = useRecoilState(recoilUserSelector);

	// TODO
	// RecoilValue
	// const [userId, setUserId] = useState(0);
	// const user = useRecoilValue(userSelector(userId));

	// TODO
	// waitForAll/waitForNone
	const usersLoadable = useRecoilValueLoadable(usersSelector);
	let users = '';
	switch (usersLoadable.state) {
		case 'hasValue':
			users = JSON.stringify(usersLoadable.contents);
			break;
		case 'hasError':
			users = usersLoadable.contents.message;
			break;
		case 'loading':
			users = 'Loading...';
			break;
		default:
			users = 'Loading...';
	};

	// TODO
	// RecoilValueLoadable
	// const userLoadable = useRecoilValueLoadable(userSelector(userId));
	// let user = '';
	// switch (userLoadable.state) {
	// 	case 'hasValue':
	// 		user = JSON.stringify(userLoadable.contents);
	// 		break;
	// 	case 'hasError':
	// 		user = userLoadable.contents.message;
	// 		break;
	// 	case 'loading':
	// 		user = 'Loading...';
	// 		break;
	// 	default:
	// 		user = 'Loading...';
	// };

	/**
	 * Get User
	 */
	// const getUser = () => {
	// 	setUserId(userId + 1);
	// };

	return (
		<>
			{/*<RecoilCounter />*/}
			{/*<hr />*/}
			{/*<RecoilTodo />*/}
			{/*<Counter />*/}
			{/*<hr />*/}
			{/*<Todo />*/}
			{/*<p/>*/}

			{/*<button onClick={getUser}>[ GET USER ]</button>*/}
			{/*<p/>*/}
			{/*{user}*/}

			{users}
		</>
	);
}

export default App;
