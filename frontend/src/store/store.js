import { configureStore, createSlice } from '@reduxjs/toolkit'

let isLogin = createSlice({
	name: 'isLogin',
	initialState: true
})

// 비교를 원하는 강의들
let compareLectures = createSlice({
	name: 'compareLectures',
	initialState: [], 
	reducers: {
		addElement(state, action){
			return [...state, action.payload]
		},
		deleteElement(state, action){
			return state.filter((item, idx) => idx !== action.payload);
		}
	}
})
export let {addElement, deleteElement} = compareLectures.actions

export default configureStore({
	reducer: {
		isLogin: isLogin.reducer,
		compareLectures: compareLectures.reducer
	},
	devTools: process.env.NODE_ENV !== 'production',
})