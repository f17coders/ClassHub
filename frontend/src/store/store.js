import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import user from './userSlice'

// 로그인 된 상태인지 확인용
let isLogin = createSlice({
  name: 'isLogin',
  initialState: true
});

// 강의 비교용
let compareLectures = createSlice({
  name: 'compareLectures',
  initialState: [],
  reducers: {
    addElement(state, action) {
      return [...state, action.payload];
    },
    deleteElement(state, action) {
      return state.filter((item, idx) => idx !== action.payload);
    }
  }
});
export let { addElement, deleteElement } = compareLectures.actions


// 선택된 강의 카테고리 저장
let selectedCategory = createSlice({
  name:'selectedCategory',
  initialState: '전체',
  reducers: {
    changeCategory(state, action) {
      return action.payload
    }
  }
})

export let {changeCategory} = selectedCategory.actions

// storage 저장용
const persistConfig = {
  key: 'root',
  storage: storageSession
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    isLogin: isLogin.reducer,
    compareLectures: compareLectures.reducer,
    selectedCategory: selectedCategory.reducer,
    user: user.reducer
  })
);

const store = configureStore({
  reducer: persistedReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}),
  devTools: process.env.NODE_ENV !== 'production'
});

export const persistor = persistStore(store);
export default store;


// export default configureStore({
// 	reducer: {
// 		isLogin: isLogin.reducer,
// 		compareLectures: compareLectures.reducer
// 	},
// 	devTools: process.env.NODE_ENV !== 'production',
// })