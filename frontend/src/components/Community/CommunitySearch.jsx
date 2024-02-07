import { Container, Stack, Select, Button, FormControl, TextField, Grid, ToggleButton, Autocomplete, IconButton } from '@mui/material';
import { useState, useEffect } from 'react'
import React from 'react';
import SearchIcon from '@mui/icons-material/Search'
import SouthIcon from '@mui/icons-material/South'
import NorthIcon from '@mui/icons-material/North';
import Box from '@mui/material/Box'
import axios from 'axios'
import { useSelector } from "react-redux"


export default function CommunitySearch() {
	// 토큰
	let accessToken = useSelector((state) => state.accessToken)
	// // 태그 검색
	// const Tags = ['HTML/CSS', 'JavaScript', 'Node.js', 'React', 'Python','Java','Spring','Spring Boot', 'SQL', 'Django', 'React Native']

	// 옆에 있을 태그(임시)
	const [recommendTags, setRecommendTags] = useState(['Spring', 'React', '네트워크', 'C++', 'SQL', 'JavaScript', 'Vue.js'])

	// 처음 전체 태그 불러오기
	const [tags, setTags] = useState([])
	const getTags = function () {
		if (tags.length == 0) {
			axios.get('https://i10a810.p.ssafy.io/api/tags/v0/communities')
				.then((res) => {
					let tmp = res.data.result.tagList
					let copy = tmp.map((item) => item.name)
					setTags(copy)
				})
				.catch((err) => console.log(err))
		}
	}
	// 선택된 태그
	const [selectedTags, setSelectedTags] = useState([])

	// 인풋 받는 용
	const [value, setValue] = useState(null);
	const [inputValue, setInputValue] = useState('');
	const addTag = function (event, newValue) {
		if (tags.includes(newValue)) {
			let copy = [newValue, ...selectedTags]

			setSelectedTags(copy)
			setValue(newValue)
			if (newValue != null) {
				if (recommendTags.includes(newValue)) {
					console.log('있는 태그')
				} else {
					let tmp = [newValue, ...recommendTags]
					setRecommendTags(tmp)
				}
				let tmp2 = [newValue, ...selectedButtons]
				setSelectedButtons(tmp2)
			}
		}
	}
	// 호버 버튼용변수들
	const [selectedButtons, setSelectedButtons] = useState([])
	const handleButtonClick = (value) => {
		if (selectedButtons.includes(value)) {
			setSelectedButtons(selectedButtons.filter((btn) => btn !== value));
		} else {
			setSelectedButtons([...selectedButtons, value]);
		}
	}

	// 토글 열고 닫기
	const [add, setAdd] = useState(false)
	const toggleAdd = function () {
		setAdd(!add)
	}
	return (
		<Container>
			{/* 내용 검색하기 */}
			<Stack direction="row" spacing={1} sx={{ mx: 1, px: 1, mt: 3, width: '100%' }}>
				<TextField size="small" sx={{ width: "100%" }} id="outlined-basic" label="궁금한 내용을 검색해보세요" variant="outlined" />
				<IconButton style={{ margin: 2 }}><SearchIcon fontSize='medium' /></IconButton>
			</Stack>
			<Stack useFlexGap flexWrap="wrap" alignItems="center" justifyContent="flex-start" direction="row" spacing={1} sx={{ margin: 1, padding: 1 }}>
				{/* 태그로 검색하기 */}
				{
					// 추가로 안봤을 때
					add == false ? (
						<Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
							{/* 태그로 검색 */}
							<Grid item style={{ width: '40%', display: 'flex', alignItems: 'center' }} onClick={getTags}>
								<Autocomplete
									freeSolo
									value={value}
									onChange={addTag}
									inputValue={inputValue}
									onInputChange={(event, newInputValue) => {
										setInputValue(newInputValue);
									}}
									options={tags}
									renderInput={(params) => <TextField {...params} label="태그로 검색해보세요" placeholder="" />}
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
												#{item}
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
									value={value}
									onChange={addTag}
									inputValue={inputValue}
									onInputChange={(event, newInputValue) => {
										setInputValue(newInputValue);
									}}
									options={tags}
									renderInput={(params) => <TextField {...params} label="태그로 검색해보세요" placeholder="" />}
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
												#{item}
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
													#{item}
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