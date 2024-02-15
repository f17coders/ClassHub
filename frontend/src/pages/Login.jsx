import Box from '@mui/material/Box'
import { Paper } from '@mui/material'
import MainLogo from './../assets/MainLogo.png'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import kakaoLogo from './../assets/Login/kakaoLogo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { saveUser, changeUserTagList, changeUserJob, updateLikeList } from '../store/userSlice'
import { saveAccessToken } from './../store/store'
import { login } from './../store/store'

function Login() {
  const navigate = useNavigate()
	const dispatch = useDispatch()

	// 유저 정보
	let user = useSelector((state) => state.user)
	// 토큰
	let accessToken = useSelector((state) => state.accessToken)

	// 토큰 가져오는 useEffect
	useEffect(() => {
		// 현재 url에서 토큰을 가져와서 저장하자
		let token = new URL(window.location.href).searchParams.get('Authorization')
		if (token) {
			// 세션에 accessToken을 저장해주자
			dispatch(saveAccessToken(token))
		}
		if (accessToken) {
			loadUserInfo()
		}
		
	}, [accessToken])

	// 토큰을 통해 회원가입이 되어있는지 / 아닌지 판단하고 load해오는 함수
	const loadUserInfo = () => {
		// 토큰이 있는지 확인하고, 서버에 user info를 확인하자
		if (accessToken) {
			axios.get('https://i10a810.p.ssafy.io/api/members/v1', {
				headers: { Authorization: `Bearer ${accessToken}` }
			})
				.then((res) => {
					// 불러온 유저정보에서 job이 null이라면 -> 추가 정보 입력이 필요함
					let tmpUser = res.data.result
					// 회원가입
					if (tmpUser.job == null) {
						dispatch(login())
						dispatch(saveUser(tmpUser))
						navigate('/additionalinfo')
					} else {
						// console.log(res.data)
						dispatch(saveUser(tmpUser))
						dispatch(login())
						// 로그인에만 좋아요 리스트 받아오기
						getUserLike()
					}
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}

	
	// 좋아요 리스트도 가져오기
	const getUserLike = function() {
		axios.get('https://i10a810.p.ssafy.io/api/members/v1/lectures/all-like', {
			headers: { Authorization: `Bearer ${accessToken}` }
		})
		.then((res) => {
			let likeList = res.data.result.lectureIdList
			dispatch(updateLikeList(likeList))
			navigate('/')
		})
		.catch((err) => {
			console.log(err)
			dispatch(updateLikeList([]))
		})
	}


	// 카카오 로그인
	const kakaoLogin = function () {
		let temp = localStorage.getItem('token')
		
		if (temp != null) {
			loadUserInfo()
		}
		// 로그인버튼을 누르면 카카오 로그인 창으로 간다
		window.location.href = 'https://i10a810.p.ssafy.io/login/oauth2/authorization/kakao';
	}

	// 카카오 로그인 버튼 호버용
	let [kakaoHover, setKakaoHover] = useState(false)
	const hoverInKakao = function () {
		setKakaoHover(true)
	}
	const hoverOutKakao = function () {
		setKakaoHover(false)
	}

  return (
    <Box>
      <Paper 
			elevation={3}
			style={{
				margin: 'auto',
				marginTop: '10vh',
				width: '400px',
				height: '450px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: "center",
				alignItems: "center"
      }}>
        <img src={MainLogo} alt="MainLogo" style={{ width: '60%' }} />
        <p>서비스 이용을 위해 로그인/회원가입을 해주세요</p>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '30px', width: '20%', justifyContent: 'space-around', alignItems: 'center' }}>
					<Paper 
					onMouseEnter={hoverInKakao}
					onMouseLeave={hoverOutKakao}
					onClick={kakaoLogin}
					style={{
						display:'flex', 
						justifyContent:'center',
						alignItems:'center',
						backgroundColor:'rgb(254, 229, 0)', 
						cursor: kakaoHover ? 'pointer' : 'default',
						boxShadow: kakaoHover ? '2px 2px 8px 4px lightgrey' : '2px 2px 4px 2px lightgrey',
						width:'300px',
						height:'60px',
						marginTop:'20px'
					}}>
						<img src={kakaoLogo} style={{width: '50px', height:'50px'}} />
						<p style={{fontSize:'1.1em', marginLeft:'10px'}}>카카오로 로그인하기</p>
					</Paper>
        </div>
      </Paper>
    </Box>
  )
}

export default Login