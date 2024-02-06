import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import user from './userSlice.js'

// 로그인 된 상태인지 확인용
let isLogin = createSlice({
  name: 'isLogin',
  initialState: true,
  reducers: {
    toggleLogin(state) {
      return !state
    }
  }
})

export let {toggleLogin} = isLogin.actions

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


// 여긴 강의 검색용 변수들이 들어감!
let searchParams = createSlice({
  name:'searchParams',
  initialState: {
    category: null,
    tags: [],
    keyword: null,
    level: 'ALL',
    site: null,
    page: 0,
    size: 16,
  },
  reducers: {
    // 카테고리 변경
    changeCategory(state, action) {
      return {
        ...state,
        category: action.payload,
      }
    },
    // 태그 추가
    addTags(state, action) {
      let copy = [...state.tags, action.payload]
      return {
        ...state,
        tags: copy
      }
    },
    // 태그 삭제
    deleteTags(state, action) {
      const filteredTags = state.tags.filter((item) => item.name !== action.payload.name);
      return {
        ...state,
        tags: filteredTags
      }
    },
    // 검색어 변경
    changeKeyword(state, action) {
      if (action.payload == '' | action.payload == '') {
        return {
          ...state,
          keyword: null
        }
      } else {
        return {
          ...state,
          keyword: action.payload
        }
      }
    },
    // 레벨 변경
    changeLevel(state, action){
      if (action.payload == '입문') {
        return {
          ...state,
          level: 'BEGINNER'
        }
      }
      if (action.payload == '초급') {
        return {
          ...state,
          level: 'INTERMEDIATE'
        }
      }
      if (action.payload == '중급이상') {
        return {
          ...state,
          level: 'EXPERT'
        }
      }
      if (action.payload == '모든 수준') {
        return {
          ...state,
          level: 'ALL'
        }
      } else {
        return {
          ...state,
          level:'ALL'
        }
      }
    },
    changeSite(state, action){
      if (action.payload == '인프런') {
        return {
          ...state,
          site: 'INFLEARN'
        }
      } else if (action.payload == '유데미') {
        return {
          ...state,
          site: 'UDEMY'
        }
      } else if (action.payload == '구름 에듀') {
        return {
          ...state,
          site: 'GOORM'
        }
      } else {
        return {
          ...state,
          site: null
        }
      }
    },
    changePage(state,action) {
      return {
        ...state,
        page: action.payload
      }
    }
  }
})
export let {changeCategory, addTags, deleteTags, changeKeyword, changeLevel,changeSite, changePage } = searchParams.actions

// 강의 검색 결과
let lectureResult = createSlice({
  name: 'lectureResult',
  initialState: [],
  reducers: {
    searchResult(state, action) {
      return action.payload
    },
  }
});
export let { searchResult } = lectureResult.actions

// 강의 페이지를 메인페이지에서 출발해서 갈때를 확인하는 용도
let fromMain = createSlice({
  name:'fromMain',
  initialState: false,
  reducers: {
    setFromMainTrue(state) {
      return true
    },
    setFromMainFalse(state) {
      return false
    },
  }
})
export let { setFromMainTrue, setFromMainFalse } = fromMain.actions

// storage 저장용
const persistConfig = {
  key: 'root',
  storage: storageSession,
  // 로컬에 저장하고 싶은 애만 빼주기
  whitelist: ['isLogin','compareLectures', 'user']
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    isLogin: isLogin.reducer,
    compareLectures: compareLectures.reducer,
    searchParams: searchParams.reducer,
    user: user.reducer,
    lectureResult: lectureResult.reducer,
    fromMain: fromMain.reducer,
  })
);

const store = configureStore({
  reducer: persistedReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}),
  devTools: process.env.NODE_ENV !== 'production'
});

export const persistor = persistStore(store);
export default store;
