import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Checkbox from '@mui/material/Checkbox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox'

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



function MyPageEdit() {
  return (
    <div>
      <h1>내 정보 수정하기</h1>
      <p>회원가입때 입력한 정보를 수정할 수 있어요</p>
      <div style={{ marginTop: '20px', width: '70%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
          sx={{ width: '70%', margin: '20px' }}
        />
        {/* 목표직무 */}
        <Autocomplete
          id='interested skills'
          options={targetJobs}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField {...params} label="목표 직무" />
          )}
          sx={{ width: '70%', margin: '20px' }}
        />
        <Button variant="outlined" style={{ width:'15%', marginLeft: '57%', marginTop:'20px' }}>수정하기</Button>
      </div>

    </div>
  )
}

export default MyPageEdit