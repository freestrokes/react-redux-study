import React from 'react';
import RecoilCounter from './screens/RecoilCounter';
import RecoilTodo from './screens/RecoilTodo';
// import Counter from './screens/Counter';
// import Todo from './screens/Todo';

function App() {
	return (
		<>
			<RecoilCounter />
			<hr />
			<RecoilTodo />
			{/*<Counter />*/}
			{/*<hr />*/}
			{/*<Todo />*/}
		</>
	);
}

export default App;

// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Hello from './Hello';

// function App() {
//   return (
//     <div className="App">
// 	    {/*<div>*/}
// 		    {/*<Hello />*/}
// 	    {/*</div>*/}
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
