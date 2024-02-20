import { Container, Stack, Select, Button, FormControl, TextField, Grid, ToggleButton, Autocomplete, IconButton } from '@mui/material';
import { useState, useEffect } from 'react'
import React from 'react';
import SearchIcon from '@mui/icons-material/Search'
import SouthIcon from '@mui/icons-material/South'
import NorthIcon from '@mui/icons-material/North';
import Box from '@mui/material/Box'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setSort, setKeyWord, setTagsAdd, setTagsDelete } from '../../store/store';


export default function CommunitySearch() {
	const dispatch = useDispatch()
	// 토큰
	let accessToken = useSelector((state) => state.accessToken)

	// 1. 태그 검색
	// 옆에 있을 태그 = recommendTags, 검색에서 나올 태그 = tags
	const [recommendTags, setRecommendTags] = useState([])
	const [tags, setTags] = useState([])
	const [tagNames, setTagNames] = useState([]) // 확인용으로 이름만 있는애

	// 처음 전체 태그 불러오기(id랑 같이)
	useEffect(() => {
		if (tags.length == 0) {
			axios.get('https://i10a810.p.ssafy.io/api/tags/v0/communities')
				.then((res) => {
					let tmp = res.data.result.tagList
					setTags(tmp.slice(10))
					// 앞에 10개는 추천 태그
					setRecommendTags(tmp.slice(0, 10))
					// 이름만 뽑아서 저장
					let temp = tmp.map((item) => item.name)
					setTagNames(temp)
				})
				.catch((err) => console.log(err))
		}
	}, [])


	// 선택된 태그들(id까지)
	const [selectedButtons, setSelectedButtons] = useState([])
	const addSelectedButton = function (newBtn) {
		let arr = [newBtn, ...selectedButtons]
		setSelectedButtons(arr)
	}
	const handleTag = function (event, newValue) {
		// 있는 값만 추가
		if (tagNames.includes(newValue)) {
			// 만약에 옆에 있는 애들 중에 하나 검색한거라면
			if (tagNames.slice(0, 10).includes(newValue)) {
				// 버튼은 추가 안하고 활성화 + 검색에 추가
				const nowValue = recommendTags.filter((item) => item.name == newValue)
				addSelectedButton(nowValue[0])
				dispatch(setTagsAdd(nowValue[0]))
			} else {
				// 새로운걸 검색한거라면 버튼추가, 활성화, 검색 추가
				const nowValue = tags.filter((item) => item.name == newValue)
				let copy = [nowValue[0], ...recommendTags]
				setRecommendTags(copy)
				addSelectedButton(nowValue[0])
				dispatch(setTagsAdd(nowValue[0]))
			}
		}
	}

	// 호버 버튼용변수들(해시태그)
	const handleButtonClick = (value) => {
		if (selectedButtons.includes(value)) {
			setSelectedButtons(selectedButtons.filter((btn) => btn !== value))
			dispatch(setTagsDelete(value))
		} else {
			dispatch(setTagsAdd(value))
			setSelectedButtons([...selectedButtons, value])
		}
	}
	
	// 토글 열고 닫기
	const [add, setAdd] = useState(false)
	const toggleAdd = function () {
		setAdd(!add)
	}

	// 검색어
	const [keyword, setKeyword] = useState('')
	const handlekeyword = function (event) {
		const input = event.target.value
		setKeyword(input)
	}

	//
	const enterKeyPress = (event) => {
		//엔터키 눌렀을 때 등록 함수 호출
		if (event.key === 'Enter') {
			event.preventDefault() //기본 동작 방지
			dispatch(setKeyWord())
		}
	}
	// // 인풋 받는 용
	// const [value, setValue] = useState(null);
	// const [inputValue, setInputValue] = useState('');
	// const addTag = function (event, newValue) {
	// 	if (tags.includes(newValue)) {
	// 		let copy = [newValue, ...selectedTags]

	// 		setSelectedTags(copy)
	// 		setValue(newValue)
	// 		if (newValue != null) {
	// 			if (recommendTags.includes(newValue)) {
	// 				console.log('있는 태그')
	// 			} else {
	// 				let tmp = [newValue, ...recommendTags]
	// 				setRecommendTags(tmp)
	// 			}
	// 			let tmp2 = [newValue, ...selectedButtons]
	// 			setSelectedButtons(tmp2)
	// 		}
	// 	}
	// }

	return (
		<Container>
			{/* 내용 검색하기 */}
			<Stack direction="row" spacing={1} sx={{ mx: 1, px: 1, mt: 3, width: '100%' }}>
				<TextField 
					size="small" 
					sx={{ width: "100%" }} 
					id="outlined-basic" 
					label="궁금한 내용을 검색해보세요" 
					variant="outlined" 
					value={keyword}
					onChange={handlekeyword}
					onKeyDown={enterKeyPress}
				/>
				<IconButton onClick={() => dispatch(setKeyWord(keyword))} style={{ margin: 2 }}><SearchIcon fontSize='medium' /></IconButton>
			</Stack>
			<Stack useFlexGap flexWrap="wrap" alignItems="center" justifyContent="flex-start" direction="row" spacing={1} sx={{ margin: 1, padding: 1 }}>
				{/* 태그로 검색하기 */}
				{
					// 추가로 안봤을 때
					add == false ? (
						<Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
							{/* 태그로 검색 */}
							<Grid item style={{ width: '40%', display: 'flex', alignItems: 'center' }}>
								<Autocomplete
									freeSolo
									onChange={handleTag}
									options={tags.map((item) => item.name)}
									renderInput={(params) => (
										<TextField {...params} label="태그로 검색해보세요" placeholder="" />
									)}
									sx={{ flex: '70%' }}
									size="small"
								/>
								<IconButton style={{ margin: 5 }}><SearchIcon fontSize='small' /></IconButton>
							</Grid>
							<Grid item sx={{ width: '50%', whiteSpace: 'nowrap', overflow: 'hidden' }}>
								{
									recommendTags.map((item, idx) => {
										return (
											<ToggleButton
												key={idx}
												value="item"
												selected={selectedButtons.includes(item)}
												onChange={() => handleButtonClick(item)}
												color='primary'
												size='large'
												sx={{ margin: '4px', height: '35px' }}
											>
												#{item.name}
											</ToggleButton>
										)
									})
								}
							</Grid>
							<IconButton style={{ margin: 5 }} onClick={toggleAdd}>{
								add == false ? (<SouthIcon fontSize='small' />) : (<NorthIcon fontSize='small' />)
							}</IconButton>
						</Grid>

					) : (
						<Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
							{/* 태그로 검색 */}
							<Grid item style={{ width: '40%', display: 'flex', alignItems: 'center' }}>
								<Autocomplete
									freeSolo
									options={tags.map((item) => item.name)}
									renderInput={(params) => (
										<TextField {...params} label="태그로 검색해보세요" placeholder="" />
									)}
									sx={{ flex: '70%' }}
									size="small"
								/>
								<IconButton style={{ margin: 5 }}><SearchIcon fontSize='small' /></IconButton>
							</Grid>
							<Grid item style={{ marginLeft: '40px' }}>
								{
									recommendTags.slice(0, 3).map((item, idx) => {
										return (
											<ToggleButton
												key={idx}
												value="item"
												selected={selectedButtons.includes(item)}
												onChange={() => handleButtonClick(item)}
												color='primary'
												size='large'
												sx={{ margin: '4px', height: '35px' }}
											>
												#{item.name}
											</ToggleButton>
										)
									})
								}
								<IconButton style={{ margin: 5 }} onClick={toggleAdd}>{
									add == false ? (<SouthIcon fontSize='small' />) : (<NorthIcon fontSize='small' />)
								}</IconButton>
							</Grid>
							<Box style={{ height: '40px', overflow: 'hidden', flexWrap: 'nowrap', display: 'flex' }}>
								<Grid item >
									{
										recommendTags.slice(3).map((item, idx) => {
											return (
												<ToggleButton
													key={idx}
													value="item"
													selected={selectedButtons.includes(item)}
													onChange={() => handleButtonClick(item)}
													color='primary'
													size='large'
													sx={{ margin: '4px', height: '35px' }}
												>
													#{item.name}
												</ToggleButton>
											)
										})
									}
								</Grid>
							</Box>


						</Grid>
					)
				}
			</Stack>
		</Container>
	)
}