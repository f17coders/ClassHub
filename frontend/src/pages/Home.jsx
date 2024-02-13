import Banner from './../components/Home/Banner'
import Search from './../components/Home/Search'
import RecommendJob from '../components/Home/RecommendJob'
import RecommendTag from '../components/Home/RecommendTag'
import CompareButton from './../components/CompareButton'
import GoPage from '../components/Home/GoPage'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

function Home() {
	// 로그인 확인용
	let isLogin = useSelector((state) => state.isLogin)

	// 유저정보 가져오자
	let user = useSelector((state) => state.user) 

	return (
		<div>
			<Banner />
			<Search />
			<GoPage />
			<RecommendJob />
			{
				isLogin ? (<div>
					{
						user.tagList.map((tag, idx) => {
							return(
								<div key={idx}>
									<RecommendTag tag={tag}/>
								</div>
								
							)
						})
					}
				</div>) : null
			}
			
			<CompareButton />
		</div>
	)
}

export default Home