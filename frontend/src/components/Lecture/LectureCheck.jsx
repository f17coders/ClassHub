import { useEffect, useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {changeCategory} from './../../store/store.js'
// 강의 검색 사이드바에 들어가는 토글 리스트
function LectureCheck() {
	// redux용 변수
	let dispatch = useDispatch()
	
	// 강의 검색 카테고리들
	const [categories, setCategories] = useState([{categoryId:0, categoryName:'전체'}])
	// const setCategory = function() {
	// 	dispatch(changeCategory(event.target.innerText))
	// }

	// 카테고리 목록 가져오기
	useEffect(() => {
		if (categories.length == 1) {
			axios.get('http://i10a810.p.ssafy.io:4000/category/v0')
			.then((data)=> {
					// console.log(data.data.result.categoryList)
					let copy = [...categories, ...data.data.result.categoryList]
					setCategories(copy)
			})
		}
	},[])

	// toggle 처리용 변수들
	const [view, setView] = useState(categories[0].categoryName)
  const handleChange = (event, nextView) => {
		dispatch(changeCategory(nextView))
    setView(nextView)
  }
	return (
		<div style={{marginTop:'20px'}}>
			<ToggleButtonGroup
				orientation="vertical"
				value={view}
				exclusive
				onChange={handleChange}
				// onClick={setCategory}
				sx={{width:'100%'}}
			>
				{
					categories.map((category, idx) => (
						<ToggleButton 
							key={idx} 
							value={category.categoryName}
							size="small" 
							sx={{border:'none', fontSize:'0.9em'}} 
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