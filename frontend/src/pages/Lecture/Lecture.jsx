import { Grid, Box, Container } from '@mui/material'
import LectureCheck from '../../components/Lecture/LectureCheck'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import LectureSearch from './../../components/Lecture/LectureSearch'
import LectureCard from './../../components/LectureCard'
import img1 from './../../assets/Lecture/Lecture2.png'
import CompareButton from './../../components/CompareButton'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { changeCategory } from '../../store/store'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// 강의 전체 조회 창
function Lecture() {
	// 선택된 카테고리 가져오기
	let selectedCategory = useSelector((state) => state.selectedCategory)
	let dispatch = useDispatch()
	// 새로고침하면 전체로 바꿔주기
	useEffect(() => {
		dispatch(changeCategory('전체'))
	},[])

	return (
		<Container>
			<Grid container sx={{ margin: 'auto', minHeight: '500px', marginTop: '20px' }}>
				{/* 왼쪽 사이드 바 */}
				<Grid item xs={5} sm={4} md={2} sx={{ borderRight: "1px solid lightgrey", paddingRight:'0px'}}>
					<Box>
						{/* 강의 카테고리 체크 */}
						<LectureCheck />
					</Box>
				</Grid>
				{/* 여기는 검색창과 강의들 */}
				<Grid item xs={6} sm={7} md={9} sx={{marginLeft:'30px'}}>
					<div style={{ display:'flex' , justifyContent:'space-between', alignItems:'center'}}>
						{/* 전체 내용 */}
						<div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
							<h3 style={{fontWeight:'700', margin:'auto'}}>전체 강의</h3>
							{
								(selectedCategory == '전체'| selectedCategory == null) ? null : (
									<><KeyboardArrowRightIcon/> <p style={{ fontSize:'1.2em', margin:'auto'}}>{selectedCategory}</p></>
								)
							}
						</div>
						
							
						{/* 전체 검색 */}
						<div style={{ width: '40%', display:'flex'}}>
							<TextField
								id="outlined-multiline-flexible"
								label="원하는 강의를 검색해보세요!"
								style={{ flex: '70%', margin: 5 }}
								size="small"
							/>
							<IconButton style={{ margin: 5 }}><SearchIcon fontSize='small'/></IconButton>
						</div>
					</div>
					<Box>	
						{/* 세부 검색창 */}
						<LectureSearch/>
					</Box>
					{/* 강의 전체 목록 */}
					<Box sx={{margin:'20px'}}>
						<Grid container spacing={1}>
							<Grid item xs={3}>
								<LectureCard img={img1} title='강의제목'/>
							</Grid>
							<Grid item xs={3}>
								<LectureCard img={img1} title='강의제목'/>
							</Grid>
							<Grid item xs={3}>
								<LectureCard img={img1} title='강의제목'/>
							</Grid>
							<Grid item xs={3}>
								<LectureCard img={img1} title='강의제목'/>
							</Grid>
							<Grid item xs={3}>
								<LectureCard img={img1} title='강의제목'/>
							</Grid>
							<Grid item xs={3}>
								<LectureCard img={img1} title='강의제목'/>
							</Grid>
							<Grid item xs={3}>
								<LectureCard img={img1} title='강의제목'/>
							</Grid>
							<Grid item xs={3}>
								<LectureCard img={img1} title='강의제목'/>
							</Grid>
							<Grid item xs={3}>
								<LectureCard img={img1} title='강의제목'/>
							</Grid>
							<Grid item xs={3}>
								<LectureCard img={img1} title='강의제목'/>
							</Grid>
							<Grid item xs={3}>
								<LectureCard img={img1} title='강의제목'/>
							</Grid>
							<Grid item xs={3}>
								<LectureCard img={img1} title='강의제목'/>
							</Grid>
						</Grid>
					</Box>
					{/* 페이지네이션 */}
					<Box sx={{display: 'flex', justifyContent:'center'}}>
						<Stack spacing={2}>
							<Pagination count={10} />
						</Stack>
					</Box>
				</Grid>
				<CompareButton />
			</Grid>
			
		</Container>
	)
}

export default Lecture