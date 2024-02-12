import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    // 처음 user의 정보를 저장하는 함수
    saveUser(state, action) {
      return action.payload
    },
    // 관심 기술 바꾸는 함수
    changeUserTagList(state, action) {
      return {
        ...state,
        tagList: action.payload
      }
    },
    // 사용자의 직업을 바꿔주는 함수
    changeUserJob(state, action) {
      return {
        ...state,
        job: action.payload
      }
    },
    // 로그아웃(사용자 정보 null로 다시 바꿔주기)
    logoutUser(state) {
      return null
    }
  }
})

export let { saveUser, changeUserTagList, changeUserJob, logoutUser } = user.actions

export default user