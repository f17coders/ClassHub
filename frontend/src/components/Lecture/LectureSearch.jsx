import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import ToggleButton from '@mui/material/ToggleButton'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import SouthIcon from '@mui/icons-material/South'
import NorthIcon from '@mui/icons-material/North';
import Box from '@mui/material/Box'
import { useState, useEffect } from 'react'
import axios from 'axios'

// 강의 검색창 (+ 태그 선택까지)
export default function LimitTags() {
	// 옆에 있을 태그(임시)
	const [recommendTags, setRecommendTags] = useState(['Spring', 'React', '네트워크', 'C++', 'SQL', 'JavaScript', 'Vue.js'])

	// 처음 전체 태그 불러오기
	const [tags, setTags] = useState([])
	const getTags = function () {
		if (tags.length == 0) {
			axios.get('http://i10a810.p.ssafy.io:4000/tags/v0/lectures')
				.then((res) => {
					let tmp = res.data.result.tagList
					let copy = tmp.map((item) => item.name)
					setTags(copy)
				})
				.catch((err) => console.log(err))
		}
	}

	// 태그 선택용
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
	// 추가 태그 보기 위한 변수들
	const [add, setAdd] = useState(false)
	const toggleAdd = function () {
		setAdd(!add)
	}

	// (해시태그 이외의) 버튼들
	const levels = ['입문', '초급', '중급이상', '모든 수준']
	const sites = ['인프런', '유데미', '구름 에듀']


	//정렬관련
	const [sort, setSort] = useState('')
	const handleSort = (event) => {
		setSort(event.target.value)
	}

	return (
		<div>
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
											sx={{ margin: '4px', height: '35px'  }}
										>
											# {item}
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


			{/* 해시태그 제외 나머지 버튼들 */}
			<Grid container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
				<Grid item xs={9}>
					<Grid container>
						<Grid item>
							{/* 난이도 */}
							{
								levels.map((item, idx) => {
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
											{item}
										</ToggleButton>
									)
								})
							}
						</Grid>
						<Divider orientation="vertical" variant="middle" flexItem />
						<Grid item style={{ marginLeft: '40px' }}>
							{/* 사이트 */}
							{
								sites.map((item, idx) => {
									return (
										<ToggleButton
											key={idx}
											value={item}
											selected={selectedButtons.includes(item)}
											onChange={() => handleButtonClick(item)}
											color='primary'
											size='large'
											sx={{ margin: '4px', height: '35px' }}
										>
											{item}
										</ToggleButton>
									)
								})
							}
						</Grid>
					</Grid>
				</Grid>
				{/* 정렬 */}
				<Grid item sx={{ marginRight: '20px' }}>
					<FormControl sx={{ minWidth: '170px' }} fullWidth size='small'>
						<Select
							defaultValue={'최신순'}
							onChange={handleSort}
							inputProps={{ 'aria-label': 'Without label' }}
							sx={{ color: 'grey' }}
						>
							<MenuItem value='최신순'>최신순</MenuItem>
							<MenuItem value='가격순'>가격순</MenuItem>
							<MenuItem value='할인률높은순'>할인률높은순</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>

		</div>


	);
}
