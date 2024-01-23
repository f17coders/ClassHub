import { Checkbox, FormControlLabel, Divider } from "@mui/material"

// 강의 검색 체크박스로 하는거 모음

function LectureCheck() {

	return (
		<div style={{paddingRight:'15px'}}>
			<div style={{marginTop:'10px'}}>
				<h3>전체</h3>
				<div style={{display:'flex', flexDirection:'column'}}>
					<FormControlLabel control={<Checkbox />} label="Design" />
					<FormControlLabel control={<Checkbox />} label="Language" />
					<FormControlLabel control={<Checkbox />} label="Animation" />
					<FormControlLabel control={<Checkbox />} label="Programming" />
					<FormControlLabel control={<Checkbox />} label="SPNS/SBM/TPA" />
					<FormControlLabel control={<Checkbox />} label="Self Developments" />
				</div>
			</div>
			<Divider />
			<div style={{marginTop:'10px'}}>
				<h3>웹 개발</h3>
				<div style={{display:'flex', flexDirection:'column'}}>
					<FormControlLabel control={<Checkbox />} label="Front-end" />
					<FormControlLabel control={<Checkbox />} label="Back-end" />
				</div>
			</div>
			<Divider />
			<div style={{marginTop:'10px'}}>
				<h3>게임 개발</h3>
				<div style={{display:'flex', flexDirection:'column'}}>
					<FormControlLabel control={<Checkbox />} label="게임 프로그래밍" />
					<FormControlLabel control={<Checkbox />} label="게임 기획" />
					<FormControlLabel control={<Checkbox />} label="게임 아트, 그래픽" />
				</div>
			</div>
		</div>
	)
}

export default LectureCheck