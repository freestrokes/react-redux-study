import React, {useState} from 'react';
import { userSelectorFamily, usersSelectorWaitForAll, usersSelectorWaitForNone } from '@states/selector/UserSelector';
import {useRecoilState, useRecoilValue, useRecoilValueLoadable} from 'recoil';
import Counter from './pages/recoil/Counter';
import Todo from './pages/recoil/Todo';

function App() {

	const [userId, setUserId] = useState(0);

	// useRecoilValue
	// const user = useRecoilValue(userSelectorFamily(userId));

	// waitForAll
	const usersWaitForAllLoadable = useRecoilValueLoadable(usersSelectorWaitForAll);
	let usersWaitForAll = '';
	switch (usersWaitForAllLoadable.state) {
		case 'hasValue':
			usersWaitForAll = JSON.stringify(usersWaitForAllLoadable.contents);
			break;
		case 'hasError':
			usersWaitForAll = usersWaitForAllLoadable.contents.message;
			break;
		case 'loading':
			usersWaitForAll = 'Loading...';
			break;
		default:
			usersWaitForAll = 'Loading...';
	};

	// waitForNone
	const usersWaitForNoneLoadable = useRecoilValueLoadable(usersSelectorWaitForNone);
	let usersWaitForNone = '';
	switch (usersWaitForNoneLoadable.state) {
		case 'hasValue':
			usersWaitForNone = JSON.stringify(usersWaitForNoneLoadable.contents);
			break;
		case 'hasError':
			usersWaitForNone = usersWaitForNoneLoadable.contents.message;
			break;
		case 'loading':
			usersWaitForNone = 'Loading...';
			break;
		default:
			usersWaitForNone = 'Loading...';
	};

	// selectorFamily
	const userLoadable = useRecoilValueLoadable(userSelectorFamily(userId));
	let user = '';
	switch (userLoadable.state) {
		case 'hasValue':
			user = JSON.stringify(userLoadable.contents);
			break;
		case 'hasError':
			user = userLoadable.contents.message;
			break;
		case 'loading':
			user = 'Loading...';
			break;
		default:
			user = 'Loading...';
	};

	/**
	 * Get User
	 */
	const getUser = () => {
		setUserId(userId + 1);
	};

	return (
		<>
			<Counter />
			<hr />
			<Todo />
			<hr />
			<button onClick={getUser}>[ GET USER ]</button>
			<br/>
			<div>
				userInfo:
				<div>{user}</div>
			</div>
			<br/>
			<div>
				users (waitForAll):
				<div>{usersWaitForAll}</div>
			</div>
			<br/>
			<div>
				users (waitForNone):
				<div>{usersWaitForNone}</div>
			</div>
		</>
	);
}

export default App;
