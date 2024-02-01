import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

let user = createSlice({
  name: 'user',
  initialState: null,
  // reducers: {
  //   getUserInfo(state, action) {
  //     console.log(state)
  //     axios.get('http://i10a810.p.ssafy.io:4000/members/v1', {
  //       headers: {
  //         // 여기에 회원 아이디가 들어감
  //         AUTHORIZATION: action.payload
  //       }
  //     })
  //       .then((res) => {
  //         state = res.data.result
  //         console.log(state) 
  //       })
  //       .catch((err) => console.log(err))
  //   }
  // }
})
// export let { getUserInfo } = user.actions


export default user