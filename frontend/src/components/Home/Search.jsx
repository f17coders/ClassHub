import * as React from 'react'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { searchResult } from './../../store/store'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setFromMainTrue, changeKeyword, goInitialExceptKeyword } from './../../store/store'
// 홈페이지 강의 검색창

function Search() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [keyword, setKeyword] = useState('')
	const handlekeyword = function (event) {
		const input = event.target.value
		setKeyword(input)
	}

	const search = function () {
		// 키워드를 저장하고
		dispatch(changeKeyword(keyword))
		// 다른건 초기화 해주면서
		dispatch(goInitialExceptKeyword())
		// 강의 페이지로 가자
		navigate(`/lecture`)
	}

	const enterKeyPress = (event) => {
		//엔터키 눌렀을 때 등록 함수 호출
		if (event.key === 'Enter') {
			event.preventDefault() //기본 동작 방지
			search()
		}
	}

	return (
		<div style={{ width: '65%', margin: 'auto', display: 'flex', marginTop: "20px" }}>
			<TextField
				label="원하는 강의를 검색해보세요!"
				value={keyword}
				onChange={handlekeyword}
				onKeyDown={enterKeyPress}
				style={{ flex: '70%', margin: 5 }}
			/>
			<IconButton style={{ margin: 5 }} onClick={search}><SearchIcon fontSize='large' /></IconButton>
		</div>
	)
}
export default Search


