import * as React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

// 홈페이지 강의 검색창

function Search() {
	return (
		<div style={{ width: '65%', margin:'auto', display:'flex', marginTop: "20px" }}>
			<TextField
				id="outlined-multiline-flexible"
				label="원하는 강의를 검색해보세요!"
				multiline
				style={{ flex: '70%', margin: 5}}
			/>
			<Button variant="contained" style={{margin:7}}>🔍검색</Button>
		</div>
	)
}
export default Search


