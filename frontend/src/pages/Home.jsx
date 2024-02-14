import Banner from './../components/Home/Banner'
import Search from './../components/Home/Search'
import RecommendJob from '../components/Home/RecommendJob'
import RecommendTag from '../components/Home/RecommendTag'
import CompareButton from './../components/CompareButton'
import GoPage from '../components/Home/GoPage'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Divider } from '@mui/material'

function Home() {
	// 로그인 확인용
	let isLogin = useSelector((state) => state.isLogin)

	// 유저정보 가져오자
	let user = useSelector((state) => state.user)

	// 인기태그
	const [tags, setTags] = useState([])
	// 비로그인이라면 인기태그에서 추천
	useEffect(() => {
		if (isLogin == false) {
			// 태그부터 가져오고
			axios.get('https://i10a810.p.ssafy.io/api/tags/v0/lectures')
				.then((res) => setTags(res.data.result.tagList.slice(0, 2)))
				.catch((err) => console.log(err))
		}
	}, [])

	return (
		<div>
			<Banner />
			<Search />

			{
				isLogin ? (
					<div style={{ margin: 'auto', textAlign: 'center', height: '65vh' }}>
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: false }}
							transition={{
								type: "spring",
								duration: 1.5,
								bounce: 0.2
							}}
							style={{ margin: '15vh 0vh 20vh 0vh' }}>
							<p style={{ fontSize: '3em', fontWeight: '800', paddingRight: '200px' }}>{user.nickname}님의 <span style={{ color: 'rgb(56, 65, 172)' }}>관심 기술</span>과 <span style={{ color: 'rgb(56, 65, 172)' }}>목표 직무</span>에 따라서</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: false }}
							transition={{
								type: "spring",
								duration: 1.5,
								bounce: 0.2
							}}
							style={{ margin: '30vh 0vh 10vh 0vh' }}>
							<p style={{ fontSize: '3em', fontWeight: '800', paddingLeft: '300px' }}><span style={{ color: 'rgb(56, 65, 172)' }}>Classhub</span>가 강의를 추천해드려요</p>
						</motion.div>
					</div>
				) : (<div style={{ margin: 'auto', textAlign: 'center', height: '65vh' }}>
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: false }}
						transition={{
							type: "spring",
							duration: 1.5,
							bounce: 0.2
						}}
						style={{ margin: '15vh 0vh 20vh 0vh' }}>
						<p style={{ fontSize: '3em', fontWeight: '800', paddingRight: '200px' }}><span style={{ color: 'rgb(56, 65, 172)' }}>회원 가입</span>을 통해 나에게 맞는</p>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: false }}
						transition={{
							type: "spring",
							duration: 1.5,
							bounce: 0.2
						}}
						style={{ margin: '30vh 0vh 10vh 0vh' }}>
						<p style={{ fontSize: '3em', fontWeight: '800', paddingLeft: '300px' }}><span style={{ color: 'rgb(56, 65, 172)' }}>Classhub</span>의 추천을 받으세요</p>
					</motion.div>
				</div>)
			}
			<Divider />
			{
				isLogin ? null : (
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: false }}
						transition={{
							type: "spring",
							duration: 1.5,
							bounce: 0.2
						}}
						style={{ margin: '0px', textAlign:'center' }}>
						<p style={{ fontSize: '1.3em', color:'gray' }}>ClassHub의 인기 강의</p>
					</motion.div>
				)
			}

			<RecommendJob />
			{
				isLogin ? (<div>
					{
						user.tagList.map((tag, idx) => {
							return (
								<div key={idx}>
									<RecommendTag tag={tag} />
								</div>
							)
						})
					}
				</div>) : (<div>{
					tags.length > 0 ? (<div>
						{
							tags.map((tag, idx) => {
								return (
									<div key={idx}>
										<RecommendTag tag={tag} />
									</div>
								)
							})
						}
					</div>) : null
				}</div>)
			}
			<GoPage />
			<CompareButton />
		</div>
	)
}

export default Home