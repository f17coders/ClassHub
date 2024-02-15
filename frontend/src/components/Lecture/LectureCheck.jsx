import { useEffect, useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {changeCategory, searchResult} from './../../store/store.js'
// 강의 검색 사이드바에 들어가는 토글 리스트
function LectureCheck() {
	// 검색할 때 쓸 변수들
	let searchParams = useSelector((state) => state.searchParams)
	// redux용 변수
	let dispatch = useDispatch()
	let selectedCategory = useSelector((state) => state.selectedCategory)

	// 강의 검색 카테고리들
	const [categories, setCategories] = useState([{categoryId:0, categoryName:'전체'}])

	// 카테고리 목록 가져오기
	useEffect(() => {
		if (categories.length == 1) {
			axios.get('https://i10a810.p.ssafy.io/api/category/v0')
			.then((data)=> {
					let copy = [...categories, ...data.data.result.categoryList]
					setCategories(copy)
			})
			.catch((err) => console.log(err))
		}
	},[])

	// 눌렀을 때 검색 
	// 컴포넌트가 나눠짐 이슈 + 얘를 따로 빼서 검색하는게 맞는거같음
	const searchCategory = function(category) {
		if (category.categoryId == 0) {
			dispatch(changeCategory(null))
			axios.get(`https://i10a810.p.ssafy.io/api/lectures/v0?page=0&size=16`)
			.then((res) =>{
				console.log(res.data.result)
				dispatch(searchResult(res.data.result.lectureList))
			})
			.catch((err) => {
				console.log(err)
			})
		} else {
			dispatch(changeCategory(category))
		}
		
	}

	// toggle 처리용 변수들
	const [view, setView] = useState(categories[0].categoryName)
  const handleChange = (event, nextView) => {
		setView(nextView)
  }
	return (
		<div style={{marginTop:'20px'}}>
			<ToggleButtonGroup
				orientation="vertical"
				color="primary"
				value={view}
				exclusive
				onChange={handleChange}
				sx={{width:'100%'}}
			>
				{
					categories.map((category, idx) => (
						<ToggleButton 
							key={idx} 
							value={category.categoryName}
							size="small" 
							sx={{border:'none', fontSize:'1em',color:'black'}} 
							onClick={() => searchCategory(category)}
						>
							{category.categoryName}
						</ToggleButton>
					))
				}
			</ToggleButtonGroup>
		</div>
	)
}

export default LectureCheck