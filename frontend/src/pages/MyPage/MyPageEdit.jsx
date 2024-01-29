import Button from '@mui/material/Button'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'


// 내 정보 수정하기 창
const skills = ['Spring', 'git', 'Django', 'React', 'Vue', 'Python', 'Java', 'PyTorch']
const targetJobs = ['백엔드', '프론트엔드', '게임개발', '데이터분석', '정보보안']



function MyPageEdit() {
  	// 관심있는 기술 유효성 검사용
	const [interstedSkills, setInterestedSkills] = useState([])
	const [skillError, setSkillError] = useState(false);
	const handleCheckedSkills = (event, newValue) => {
		//newValue는 선택된 옵션을 나타냄
		const selectedSkills = newValue.map((option) => option);
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
	const [inputTarget, setInputTarget] = useState('')
	const [targetError, setTargetError] = useState(false)
	const testTargetInput = function () {
		if (inputTarget == '') {
			setTargetError(true)
		} else {
			setTargetError(false)
		}
	}

	// 전체 유효성 검사
	const [valid, setValid] = useState(true)
	const checkValid = function() {
		testTargetInput()
		if (interstedSkills.length < 2) {
			setSkillError(true);
		}
		if (skillError | targetError)	{
			setValid(false)
		}	else {
			setValid(true)
		}
	}

  return (
    <div>
      <h2>내 정보 수정하기</h2>
      <p>회원가입때 입력한 정보를 수정할 수 있어요</p>
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
										options={skills}
										value={interstedSkills.map((skill) => skill)}
										onChange={handleCheckedSkills}
										getOptionLabel={(option) => option}
										filterSelectedOptions
										isOptionEqualToValue={(option, value) => option === value}
										renderInput={(params) => (
											<TextField
												{...params}
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
										options={skills}
										value={interstedSkills.map((skill) => skill)}
										onChange={handleCheckedSkills}
										getOptionLabel={(option) => option}
										filterSelectedOptions
										isOptionEqualToValue={(option, value) => option === value}
										renderInput={(value) => (
											<TextField
												{...value}
												placeholder="관심 기술"
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
										options={targetJobs}
										onChange={(event, newValue) => {
											setTarget(newValue)
										}}
										inputValue={inputTarget}
										onInputChange={(event, newInputValue) => {
											setInputTarget(newInputValue)
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
										options={targetJobs}
										onChange={(event, newValue) => {
											setTarget(newValue)
										}}
										inputValue={inputTarget}
										onInputChange={(event, newInputValue) => {
											setInputTarget(newInputValue)
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
							제출
						</Button>
					</div>
				</div>

    </div>
  )
}

export default MyPageEdit