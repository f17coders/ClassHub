import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MainLogo from './../assets/MainLogo.png'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import google1 from './../assets/Login/google.svg'
import google2 from './../assets/Login/google_hover.svg'
import naver1 from './../assets/Login/naver.png'
import naver2 from './../assets/Login/naver_hover.png'
import kakao from './../assets/Login/kakao.png'
import axios from 'axios'
import Swal from 'sweetalert2'
import naverLogo from './../assets/Login/naverLogo.png'
import googleLogo from './../assets/Login/googleLogo.png'
import kakaoLogo from './../assets/Login/kakaoLogo.png'


// Modal창 스타일
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	bgcolor: 'background.paper',
	border: '1px solid #000',
	boxShadow: 24,
	p: 4,
}


function LoginModal({ open, onClose }) {
	// 몇번째 모달인지 확인용
	let [order, setOrder] = useState(1)


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


	// 처음엔 로그인 창부터 뜨게 하자
	useEffect(() => {
		setOrder(1)
	}, [])
	return (
		<Modal
			open={open}
			onClose={onClose}
		>
			{
				order == 1 ? (
					<Box sx={style}>
						<div style={{
							display: 'flex',
							padding: "70px 30px 100px 30px",
							flexDirection: 'column',
							justifyContent: "center",
							alignItems: "center"
						}}>
							<img src={MainLogo} alt="MainLogo" style={{ width: '60%' }} />
							<p>ClassHub서비스에 로그인하기</p>
							<div style={{ display: 'flex', flexDirection: 'row', marginTop: '50px', width: '70%', justifyContent:'space-around', alignItems:'center'}}>
								<div
									onMouseEnter={hoverInGoogle}
									onMouseLeave={hoverOutGoogle}
									style={{ margin: '10px 0px' }}>
									<img src={googleLogo} style={{
										width:'80px', 
										cursor: googleHover ? 'pointer' : 'default',
										scale: googleHover ? '1.1' : '1'
									}}/>
								</div>
								<div
									onMouseEnter={hoverInNaver}
									onMouseLeave={hoverOutNaver}
									style={{ margin: '10px 0px' }}>
									<img src={naverLogo} style={{
										width:'80px',
										cursor: naverHover ? 'pointer' : 'default',
										scale: naverHover ? '1.1' : '1'
									}}/>
								</div>
								<div
									// 테스트용 수정해야함
									// onClick={() => kakaoLogin()}
									onMouseEnter={hoverInKakao}
									onMouseLeave={hoverOutKakao}
									style={{ margin: '10px 0px' }}>
									<img src={kakaoLogo} style={{
										width:'80px',
										cursor: kakaoHover ? 'pointer' : 'default',
										scale: kakaoHover ? '1.1' : '1'
									}}/>
								</div>

								{/* <div
									onMouseEnter={hoverInGoogle}
									onMouseLeave={hoverOutGoogle}
									style={{ cursor: googleHover ? 'pointer' : 'default', margin: '10px 0px' }}>
									{
										googleHover ? (<img src={google2} style={{ width: '250px' }} />) : (<img src={google1} style={{ width: '250px' }} />)
									}
								</div>
								<div
									onMouseEnter={hoverInNaver}
									onMouseLeave={hoverOutNaver}
									style={{ cursor: naverHover ? 'pointer' : 'default', margin: '10px 0px' }}>
									{
										naverHover ? (<img src={naver2} style={{ width: '250px' }} />) : (<img src={naver1} style={{ width: '250px' }} />)
									}
								</div>
								<div
									// 테스트용 수정해야함
									// onClick={() => kakaoLogin()}
									onMouseEnter={hoverInKakao}
									onMouseLeave={hoverOutKakao}
									style={{ cursor: kakaoHover ? 'pointer' : 'default', margin: '10px 0px', position: 'relative' }}>
									<img src={kakao} style={{ width: '250px' }} />
									{
										kakaoHover ? (<div style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)', width: '100%', height: '100%', borderRadius: '12px', zIndex: 100, position: 'absolute', top: 0 }} />) : null
									}
								</div> */}
							</div>
						</div>
					</Box>
				) : (
					<div>
						<SecondModal />
					</div>
				)
			}
		</Modal>
	)
}

export default LoginModal

function SecondModal() {
	// 관심있는 기술
	const [skills, setSkills] = useState([])
	// 목표 직무
	const [targetJobs, setTargetJobs] = useState([])


	// 처음에 관심있는 기술과 목표직무를 가져온다
	useEffect(() => {
		if (skills.length == 0) {
			axios.get('http://i10a810.p.ssafy.io:4000/tags/v1/members')
				.then((res) => {
					let loadedSkills = res.data.result.tagList.map((item) => item)
					setSkills(loadedSkills)
				})
				.catch((err) => console.log(err))
		}
		if (targetJobs.length == 0) {
			axios.get('http://i10a810.p.ssafy.io:4000/jobs/v1')
				.then((res) => {
					let loadedJobs = res.data.result.jobList.map((item) => item)
					setTargetJobs(loadedJobs)
				})
				.catch((err) => console.log(err))
		}
	}, [])


	// 관심있는 기술 유효성 검사용
	const [interstedSkills, setInterestedSkills] = useState([])
	const [skillError, setSkillError] = useState(false);
	const handleCheckedSkills = (event, newValue) => {
		//newValue는 선택된 옵션을 나타냄
		// skill들 중에 newValue와 같은애를 통채로 저장함
		const selectedSkills = skills.filter((option) => newValue.includes(option.name))
		//최대 10개 까지만 입력 가능하도록 검사
		if (selectedSkills.length > 10) {
			setSkillError(true);
		} else {
			setSkillError(false);
			//선택된 태그들을 state에 설정
			setInterestedSkills(selectedSkills)
		}
	}

	// 목표 직무 유효성 검사
	const [target, setTarget] = useState([])
	const [inputTarget, setInputTarget] = useState([])
	const [targetError, setTargetError] = useState(false)
	const testTargetInput = function () {
		if (inputTarget == null) {
			setTargetError(true)
		} else {
			setTargetError(false)
		}
	}

	// 전체 유효성 검사
	const [valid, setValid] = useState(false)
	const checkValid = function () {
		testTargetInput()
		if (interstedSkills.length < 2 | interstedSkills.length > 10) {
			setSkillError(true);
		}
		if (skillError | targetError) {
			setValid(false)
		} else {
			setValid(true)
		}
		if (valid) {
			// 유효할 때 가입 요청 보내기
			axios.post('https://i10a810.p.ssafy.io/api/members/v1', {
				tagList: interstedSkills.map((skill) => skill.tagId),
				jobId: target[0].jobId
			}, {
				headers: {
					// 여기는 임시, 여기에 로그인 id가져오기
					Authorization: 3
				}
			})
				.then((res) => {
					Swal.fire({
						title: "회원가입 완료",
						icon: "success"
					}).then((a) => window.location.reload())
				})
				.catch((err) => console.log(err))
		}
	}

	return (
		<Box sx={style}>
			<div style={{
				display: 'flex',
				padding: "70px 0px 100px 0px",
				flexDirection: 'column',
				justifyContent: "center",
				alignItems: "center"
			}}>
				<h1>추가 정보</h1>
				<div style={{ marginTop: '20px', width: '70%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
					{/* 관심기술 */}
					<div>
						<div>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
								<p style={{ fontWeight: 700 }}>관심 기술</p>
								<p style={{ fontSize: '0.8em' }}>최소 2개, 최대 10개</p>
							</div>
							{
								skillError ? (
									<Autocomplete
										required
										multiple
										options={skills.map((item) => item.name)}
										// value={interstedSkills}
										onChange={handleCheckedSkills}
										// getOptionLabel={(option) => option}
										// filterSelectedOptions
										// isOptionEqualToValue={(option, value) => option === value}
										renderInput={(value) => (
											<TextField
												{...value}
												error
												helperText="관심 기술은 최소 2개, 최대 10개 지정해야합니다"
												placeholder="관심 기술"
											/>
										)}
									/>
								) : (
									<Autocomplete
										required
										multiple
										options={skills.map((item) => item.name)}
										onChange={handleCheckedSkills}
										renderInput={(value) => (
											<TextField
												{...value}
												placeholder='관심 기술'
											/>
										)}
									/>
								)
							}
						</div>

						{/* 목표직무 */}
						<div>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
								<p style={{ fontWeight: 700 }}>목표 직무</p>
								<p style={{ fontSize: '0.8em' }}>1개 지정 필수</p>
							</div>
							{
								targetError ? (
									<Autocomplete
										options={targetJobs.map((item) => item.name)}
										onChange={(event, newValue) => {
											// skill들 중에 newValue와 같은애를 통채로 저장함
											const selectedJob = targetJobs.filter((option) => newValue.includes(option.name))
											setTarget(selectedJob)
										}}
										renderInput={(value) => (
											<TextField
												error
												{...value}
												helperText='목표 직무 지정은 필수입니다.'
												placeholder="목표 직무"
											/>
										)}
									/>
								) : (
									<Autocomplete
										options={targetJobs.map((item) => item.name)}
										onChange={(event, newValue) => {
											// skill들 중에 newValue와 같은애를 통채로 저장함
											const selectedJob = targetJobs.filter((option) => newValue.includes(option.name))
											setTarget(selectedJob)
										}}
										renderInput={(value) => (
											<TextField
												{...value}
												placeholder="목표 직무"
											/>
										)}
									/>
								)
							}
						</div>

						{/* 제출 버튼 */}
						<Button
							variant="outlined"
							style={{ marginTop: '20px' }}
							onClick={checkValid}
						>
							가입하기
						</Button>
					</div>
				</div>
			</div>
		</Box>
	)
}