import { configureStore, createSlice } from '@reduxjs/toolkit'

let isLogin = createSlice({
	name: 'isLogin',
	initialState: true
})

export default configureStore({
	reducer: {
		isLogin: isLogin.reducer
	}
})