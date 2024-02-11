import Box from '@mui/material/Box'
import { Paper } from '@mui/material'
import MainLogo from './../assets/MainLogo.png'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import naverLogo from './../assets/Login/naverLogo.png'
import googleLogo from './../assets/Login/googleLogo.png'
import kakaoLogo from './../assets/Login/kakaoLogo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { saveUser, changeUserTagList, changeUserJob } from '../store/userSlice'
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
		
			// 저장한 토큰으로 유저 정보가 있는지 없는지 확인해보자
			if (user == null) {
				loadUserInfo()
			}
			
	}, [accessToken])


	// 토큰을 통해 회원가입이 되어있는지 / 아닌지 판단하고 load해오는 함수
	const loadUserInfo = () => {
		if (accessToken) {
			// console.log(accessToken)
			axios.get('https://i10a810.p.ssafy.io/api/members/v1', {
				headers: { Authorization: `Bearer ${accessToken}` }
			})
				.then((res) => {
					// 불러온 유저정보에서 job이 null이라면 -> 추가 정보 입력이 필요함
					let tmpUser = res.data.result
					if (tmpUser.job == null) {
						// console.log('회원가입하러가자')
						dispatch(saveUser(tmpUser))
						navigate('/additionalinfo')
					} else {
						dispatch(saveUser(tmpUser))
						dispatch(login())
						navigate('/')
					}
				})
				.catch((err) => {
					console.log(err)
				})
		}

	}

	// 카카오 로그인
	const kakaoLogin = function () {
		let temp = localStorage.getItem('token')
		// console.log(temp)
		// 테스트용
		if (temp != null) {
			loadUserInfo()
		}
		// 로그인버튼을 누르면 카카오 로그인 창으로 간다
		window.location.href = 'https://i10a810.p.ssafy.io/login/oauth2/authorization/kakao';
	}


	// 구글 로그인 버튼 호버용
	let [googleHover, setGoogleHover] = useState(false)
	const hoverInGoogle = function () {
		setGoogleHover(true)
	}
	const hoverOutGoogle = function () {
		setGoogleHover(false)
	}

	// 네이버 로그인 버튼 호버용
	let [naverHover, setNaverHover] = useState(false)
	const hoverInNaver = function () {
		setNaverHover(true)
	}
	const hoverOutNaver = function () {
		setNaverHover(false)
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
      <div style={{
				marginTop: '10%',
				display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center"
      }}>
        <img src={MainLogo} alt="MainLogo" style={{ width: '15%' }} />
        <p>서비스 이용을 위해 로그인/회원가입을 해주세요</p>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '30px', width: '20%', justifyContent: 'space-around', alignItems: 'center' }}>
					<Paper 
					onMouseEnter={hoverInGoogle}
					onMouseLeave={hoverOutGoogle}
					style={{
						display:'flex', 
						justifyContent:'center',
						alignItems:'center',
						backgroundColor:'rgb(242, 242, 242)', 
						cursor: googleHover ? 'pointer' : 'default',
						boxShadow: googleHover ? '2px 2px 8px 4px lightgrey' : '2px 2px 4px 2px lightgrey',
						width:'300px',
						height:'60px'
					}}>
						<img src={googleLogo} style={{width: '50px', height:'50px'}} />
						<p style={{fontSize:'1.1em', marginLeft:'10px'}}>Google로 로그인하기</p>
					</Paper>
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
						<p style={{fontSize:'1.1em', marginLeft:'10px'}}>Google로 로그인하기</p>
					</Paper>
        </div>
      </div>
    </Box>
  )
}

export default Login