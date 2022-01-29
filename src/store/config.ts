import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import counterSlice from './slices/counterSlice';
import todoSlice from './slices/todoSlice';
import userSlice from './slices/userSlice';
// import {setupListeners} from '@reduxjs/toolkit/query';

const logger = createLogger();

const rootReducer = combineReducers({
	counter: counterSlice.reducer,
	todo: todoSlice.reducer,
	user: userSlice.reducer
});

const initialState = {};

// enhancers에 대해선, 공식 문서에서 applyMiddleware나 devtools를 넣지 말라고 함. 이미 내장되어 있음.
// enhancers: (defaultEnhancers) => [reduxBatch, ...defaultEnhancers],
// preloadedState는 initialState
export const store = configureStore({
	reducer: rootReducer,
	// middleware: [logger, ...getDefaultMiddleware()],
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
	devTools: process.env.NODE_ENV !== 'production',
	preloadedState: initialState, // 만약 SSR로 넘어온 정보가 있다면 여기에 담아주면 됨.
	enhancers: (defaultEnhancers) => [...defaultEnhancers]
});

// [ 사내 프레임워크 config.ts ]

// const apiMiddleware = [];
// export const createStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) =>
// 	configureStore({
// 		reducer: rootReducer,
// 		middleware: (getDefaultMiddleware) => getDefaultMiddleware({
// 			serializableCheck: false, // 함수를 보내야 하는 경우에 사용 (원칙적으로는 보내지 않는 것을 권장)
// 		}).concat(...apiMiddleware),
// 		devTools: process.env.NODE_ENV !== 'production',
// 		...options,
// 	});
// export const store = createStore();
// setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
