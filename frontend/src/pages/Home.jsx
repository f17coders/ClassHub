import Banner from './../components/Home/Banner'
import Search from './../components/Home/Search'
import Recommend from './../components/Home/Recommend'
import CompareButton from './../components/CompareButton'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

function Home() {
	// 로그인 확인용
	let isLogin = useSelector((state) => state.isLogin)

	// 유저정보 가져오자
	let userInfo = useSelector((state) => state.user) 

	return (
		<div>
			<Banner />
			<Search />
			{/* {
				isLogin ? (<div>{
					userInfo != null ? (<div>
						<Recommend title={`${userInfo.job.name}를 꿈꾸는 ${userInfo.nickname}님을 위한 강의 추천`} />
						{
							userInfo.tagList.map((tag, idx) => { return (
								<Recommend title={`${userInfo.nickname}님이 관심있는 ${tag.name} 분야 강의 Best 5`} key={idx} />
							)})
						}
					</div>) :(<div>로딩중</div>)
					}</div>):(<div>로그인을 해주세요!</div>)
			}
			 */}
			<CompareButton />
		</div>
	)
}

export default Home