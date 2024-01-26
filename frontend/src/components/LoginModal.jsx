import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MainLogo from './../assets/MainLogo.png'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Checkbox from '@mui/material/Checkbox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox'

// Modal창 스타일
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 600,
	bgcolor: 'background.paper',
	border: '1px solid #000',
	boxShadow: 24,
	p: 4,
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const skills = ['Spring', 'git', 'Django', 'React', 'Vue', 'Python', 'Java', 'PyTorch']
const targetJobs = ['백엔드', '프론트엔드', '게임개발', '데이터분석', '정보보안']


function LoginModal(props) {	
	let [order, setOrder] = useState(1)
	useEffect(() => {
		setOrder(1)
	}, [])
	return (
		<Modal
			{...props}
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
							<img src={MainLogo} alt="MainLogo" style={{ width: '80%' }} />
							<div style={{ marginTop: '20px', width: '70%' }}>
								<Button style={{ margin: '10px 0px', width: '100%', height: '50px' }} variant="outlined">Log in with google</Button>
								<Button style={{ margin: '10px 0px', width: '100%', height: '50px' }} variant="outlined">Log in with kakao</Button>
								<Button style={{ margin: '10px 0px', width: '100%', height: '50px' }} variant="outlined">Log in with naver</Button>
								<Button style={{ margin: '10px 0px', width: '100%', height: '50px' }} variant="outlined" onClick={() => setOrder(2)}>추가정보 보기</Button>
							</div>
						</div>
					</Box>	
				) : (
					<div>
						<SecondModal/>
					</div>
				)
			}
		</Modal>
	)
}

export default LoginModal

function SecondModal() {
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
						<div>최소 2개, 최대 10개까지 선택 가능</div>
						<Autocomplete
							multiple
							id='interested skills'
							options={skills}
							disableCloseOnSelect
							getOptionLabel={(option) => option}
							// 체크박스
							renderOption={(props, option, { selected }) => (
								<li {...props}>
									<Checkbox
										icon={icon}
										checkedIcon={checkedIcon}
										style={{ marginRight: 8 }}
										checked={selected}
									/>
									{option}
								</li>
							)}
							renderInput={(params) => (
								<TextField {...params} label="관심있는 기술" />
							)}
							sx={{ width: '100%', margin: '20px' }}
						/>
					</div>
					
					{/* 목표직무 */}
					<Autocomplete
						id='interested skills'
						options={targetJobs}
						getOptionLabel={(option) => option}
						renderInput={(params) => (
							<TextField {...params} label="목표 직무" />
						)}
						sx={{ width: '100%', margin: '20px' }}
					/>
					<Button variant="outlined" style={{ margin: 'auto' }}>제출</Button>
				</div>
			</div>
		</Box>
	)
}