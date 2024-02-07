import Button from '@mui/material/Button'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import axios from 'axios'
import Swal from 'sweetalert2'
import { saveUser, changeUserTagList, changeUserJob } from './../../store/userSlice'


function MyPageEdit() {
	 // 토큰
	 let accessToken = useSelector((state) => state.accessToken)
	 const dispatch = useDispatch()
	// 관심있는 기술
	const [skills, setSkills] = useState([])
	// 목표 직무
	const [targetJobs, setTargetJobs] = useState([])


	// 처음에 전체 관심있는 기술과 목표직무를 가져온다
	useEffect(() => {
		if (skills.length == 0) {
			axios.get('https://i10a810.p.ssafy.io/api/tags/v0/members')
				.then((res) => {
					let loadedSkills = res.data.result.tagList.map((item) => item)
					setSkills(loadedSkills)
				})
				.catch((err) => console.log(err))
		}
		if (targetJobs.length == 0) {
			axios.get('https://i10a810.p.ssafy.io/api/jobs/v0',{
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			})
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
		if (selectedSkills.length > 10 | selectedSkills.length < 2) {
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
			// 유효할 때 수정 요청 보내기
			axios.put('https://i10a810.p.ssafy.io/api/members/v1', {
				'tagList': interstedSkills.map((skill) => skill.tagId),
				'jobId': target[0].jobId
			}, {
				headers: {
					AUTHORIZATION: `Bearer ${accessToken}`
				}
			})
				.then((res) => {
					console.log(res)
					dispatch(changeUserTagList(interstedSkills))
					dispatch(changeUserJob(target[0]))
					Swal.fire({
						title: "정보 수정 완료",
						icon: "success"
					}).then((a) => window.location.reload())
				})
				.catch((err) => console.log(err))
		}
	}

	return (
		<div>
			<h2>내 정보 수정하기</h2>
			<p>회원가입때 입력한 정보를 수정할 수 있어요</p>
			<div style={{ marginTop: '20px', width: '70%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
				{/* 관심기술 */}
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

					{/* 제출 버튼 */}
					<Button
						variant="outlined"
						style={{ marginTop: '20px' }}
						onClick={checkValid}
					>
						제출
					</Button>
				</div>
			</div>
		</div>
	)
}

export default MyPageEdit