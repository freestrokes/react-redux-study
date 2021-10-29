/* eslint-disable */

// import { combineReducers } from 'redux';
// import { applyMiddleware } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import counterSlice from './slices/counterSlice';
import todoSlice from './slices/todoSlice';

// import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from './store/config';

const logger = createLogger();

// TODO
const rootReducer = combineReducers({
	counter: counterSlice.reducer,
	todo: todoSlice.reducer
});

// const rootReducer = combineReducers({
// 	popup: popupSlice.reducer,
// 	common: commonSlice.reducer,
// });

// TODO
// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));

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

// TODO
// typescript 필요
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

//////////////////////////////////////////////////////////////////////

// setting case1)
// import {combineReducers, configureStore, ConfigureStoreOptions} from '@reduxjs/toolkit';
// import {setupListeners} from '@reduxjs/toolkit/query';
// import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
// import popupSlice from "./slices/popupSlice";
// import commonSlice from "./slices/commonSlice";
//
// const rootReducer = combineReducers({
// 	popup: popupSlice.reducer,
// 	common: commonSlice.reducer,
// });
//
// const apiMiddleware = [];
//
// export const createStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) =>
// configureStore({
// 	reducer: rootReducer,
// 	devTools: process.env.NODE_ENV !== 'production',
// 	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
// 		serializableCheck: false,
// 	}).concat(...apiMiddleware),
// 	...options,
// });
// export const store = createStore();
//
// setupListeners(store.dispatch);
//
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//
// export default store;

//////////////////////////////////////////////////////////////////////

// setting case2)
// import rootReducer from "./_reducers";
// const { createStore, applyMiddleware, compose } = require("redux");
// const { asyncLogin } = require("./_actions/user");
// const { createLogger } = require("redux-logger");
//
// // middleware
// const logger = createLogger();
//
// // store
// const initialState = {
// 	user: null,
// 	posts: [],
// };
//
// // enhancers에 대해선, 공식 문서에서 applyMiddleware나 devtools를 넣지 말라고 함. 이미 내장되어 있음.
// // preloadedState는 initialState
// const store = configureStore({
// 	reducer: rootReducer,
// 	middleware: [logger, ...getDefaultMiddleware()],
// 	devTools: process.env.NODE_ENV !== "production",
// 	preloadedState: initialState, // 만약 SSR로 넘어온 정보가 있다면 여기에 담아주면 됨.
// });
//
// // store 꺼낸 후 react와의 연결
// export default store;
