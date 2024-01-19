import { configureStore, createSlice } from '@reduxjs/toolkit'

let isLogin = createSlice({
	name: 'isLogin',
	initialState: false
})

export default configureStore({
	reducer: {
		isLogin: isLogin.reducer
	}
})