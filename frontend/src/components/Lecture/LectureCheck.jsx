import { useEffect, useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import axios from 'axios'

// 강의 검색 사이드바에 들어가는 토글 리스트
function LectureCheck() {

	// 강의 검색 카테고리들
	const [categories, setCategories] = useState([{categoryId:0, categoryName:'카테고리 전체'}])

	// 카테고리 목록 가져오기
	useEffect(() => {
		if (categories.length == 1) {
			axios.get('http://i10a810.p.ssafy.io:4000/category/v0')
			.then((data)=> {
					// console.log(data.data.result.categoryList)
					let copy = [...categories, ...data.data.result.categoryList]
					setCategories(copy)
					// console.log(categories)
			})
		}
		
	},[])

	// toggle 처리용 변수들
	const [view, setView] = useState('list')
  const handleChange = (event, nextView) => {
    setView(nextView);
  }
	return (
		<div style={{marginTop:'20px'}}>
			<ToggleButtonGroup
				orientation="vertical"
				value={view}
				exclusive
				onChange={handleChange}
				sx={{width:'100%'}}
			>
				{
					categories.map((category, idx) => (
						<ToggleButton key={idx} value={category.categoryName} aria-label="list" size="small" sx={{border:'none', fontSize:'0.9em'}}>
							{category.categoryName}
						</ToggleButton>
					))
				}
			</ToggleButtonGroup>
		</div>
	)
}

export default LectureCheck