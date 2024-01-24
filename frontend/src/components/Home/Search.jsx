import * as React from 'react'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

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
		<IconButton style={{ margin: 5 }}><SearchIcon fontSize='large' /></IconButton>
		</div>
	)
}
export default Search


