import * as React from 'react'
import { Card, CardContent, CardMedia, Button, Rating, IconButton, Chip } from '@mui/material'
import { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import BalanceIcon from '@mui/icons-material/Balance'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import { useSelector, useDispatch } from 'react-redux'
import { addElement, searchResult } from './../store/store.js'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import LoginModal from './LoginModal.jsx'

// tooltip에 스타일 주기
const LightTooltip = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.palette.common.white,
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[1],
		fontSize: 11,
	},
}))

function LectureCard({ lecture }) {
	// 토큰
	let accessToken = useSelector((state) => state.accessToken)
	const navigate = useNavigate()
	let dispatch = useDispatch()
	// 로그인 확인용
	let isLogin = useSelector((state) => state.isLogin)

	// 호버용 변수
	const [hover, setHover] = useState(false)
	const hoverStyle = {
		position: 'relative',
		height: 330,
		cursor: hover ? 'pointer' : 'none',
		boxShadow: hover ? "0px 8px 12px 0px rgba(0, 0, 0, 0.2)" : 'none',
	}

	// 좋아요 + 로그인 안했으면 로그인 하라 하기
	// 좋아요용 변수
	const [like, setLike] = useState(false)
	// 로그인 모달용
	const [open, setOpen] = useState(false)
	const ModalOpen = () => setOpen(true)
	const ModalClose = () => setOpen(false)
	const toggleLike = () => {
		console.log(accessToken)
		if (isLogin == true) {
			if (like == false) {
				axios.post(`https://i10a810.p.ssafy.io/api/lectures/v1/likes/${lecture.lectureId}`, null, {
					headers: {
						Authorization: `Bearer ${accessToken}`
					}
				})
					.then((res) => console.log('좋아요를 눌렀어요'))
					.catch((err) => console.log(err));
				setLike(true)
			} else {
				axios.delete(`https://i10a810.p.ssafy.io/api/lectures/v1/unlikes/${lecture.lectureId}`, {
					headers: {
						Authorization: `Bearer ${accessToken}`
					}
				})
					.then((res) => console.log('좋아요 취소'))
					.catch((err) => console.log(err))
				setLike(false)
			}
		} else {
			Swal.fire({
				title: "로그인이 필요합니다!",
				icon: "warning",
				confirmButtonText: '로그인하러가기'
			}).then((result) => {
				if (result.isConfirmed) {
					navigator('/login')
				}
			})
		}
	}

	// 할인 여부에 따라 가격 다르게 표시하는 함수
	const definePrice = function (price1, price2) {
		if (price2 == 0) {
			return (<p>무료강의</p>)
		} else if (price1 == price2) {
			return (<p>{price1.toLocaleString()}원</p>)
		} else {
			return (<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
				<p style={{ textDecoration: 'line-through', margin: 0 }}>{price2.toLocaleString()}</p>
				<EastIcon fontSize='small' />
				<p style={{ margin: 0 }}>{price1.toLocaleString()}</p>
			</div>)
		}
	}

	// 디테일 페이지로 가기	
	const goDetail = function () {
		navigate(`/lecture/detail/${lecture.lectureId}`)
	}
	// 강의 담았을 때 알림 (sweetAlert용)
	const Toast = Swal.mixin({
		toast: true,
		position: "bottom-start",
		showConfirmButton: false,
		timer: 2000,
		didOpen: (toast) => {
			toast.onmouseenter = Swal.stopTimer;
			toast.onmouseleave = Swal.resumeTimer;
		}
	})

	// 강의 담겼을 때 or 3개 다 차면 안된다고 해주기
	let compareLectures = useSelector((state) => state.compareLectures)
	function addCart(now) {
		const isDuplicate = compareLectures.some((compareLecture) => compareLecture.lectureId === now.lectureId);
		if (isDuplicate) {
			Swal.fire({
				icon: "error",
				title: "이미 추가된 강의입니다",
				text: "강의는 중복해서 비교할 수 없습니다.",
			});
		} else if (compareLectures.length < 3) {
			dispatch(addElement(lecture));
			Toast.fire({
				icon: "success",
				title: "강의 비교하기에 담겼습니다.",
			});
		} else {
			Swal.fire({
				icon: "error",
				title: "강의가 3개 이상입니다",
				text: "비교할 수 있는 강의는 최대 3개입니다.",
			});
		}
	}

	return (
		<Card
			variant="outlined"
			style={hoverStyle}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<CardMedia
				sx={{ height: 140 }}
				image={lecture.image}
				title="lecture image"
			/>
			<CardContent style={{ padding: '10px' }}>
				<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
					<div style={{ height: '70px' }}>
						<p style={{
							fontWeight: '700',
							fontSize: '1.1em',
							display: '-webkit-box',
							WebkitBoxOrient: 'vertical',
							WebkitLineClamp: 2,
							overflow: 'hidden',
							textOverflow: 'ellipsis'
						}}>
							{lecture.lectureName}
						</p>
					</div>
					<div>
						<p style={{ marginBottom: '5px' }}>{lecture.instructor}<br /><Rating size='small' value={lecture.combinedRating} readOnly></Rating></p>
					</div>
					<div>
						{definePrice(lecture.priceOriginal, lecture.priceSale)}
					</div>

				</div>
			</CardContent>
			{
				// 호버했을 때
				hover == true ? (
					<div
						style={{
							position: 'absolute',
							top: 0,
							backgroundColor: 'rgba(29, 35, 100, 0.9)',
							height: 330,
							color: 'white',
							padding: '15px',
							display: 'flex',
							flexDirection: 'column'
						}}
					>
						<div style={{ height: '100px' }} onClick={goDetail}>
							<p style={{
								fontWeight: '700', fontSize: '1.3em', margin: 0, display: '-webkit-box',
								WebkitBoxOrient: 'vertical',
								WebkitLineClamp: 4,
								overflow: 'hidden',
								textOverflow: 'ellipsis'
							}}>{lecture.lectureName}</p>
						</div>

						<div style={{ height: '80px' }} onClick={goDetail}>
							<p>총 {lecture.totalTime}시간<br />{lecture.level}</p>
						</div>
						<div style={{ height: '40px', overflow: 'hidden' }} onClick={goDetail}>
							{
								lecture.tagList ? (<div>
									{
										lecture.tagList.map((tag, idx) => {
											return (
												<Chip key={idx} color="primary" size="small" label={`# ${tag.name}`} sx={{ margin: '5px' }} />
											)
										})
									}
								</div>) : null

							}
						</div>
						<div style={{ display: 'flex', flexDirection: 'column', width: '20%', marginLeft: 'auto', marginBottom: '10px' }}>
							{
								like ? (
									<LightTooltip slotProps={{ popper: { modifiers: [{ name: 'offset', options: { offset: [0, -5], }, },] }, }} placement="left" arrow title="좋아요 취소">
										<IconButton size='small' onClick={toggleLike} sx={{ color: 'white' }}>
											<FavoriteIcon />
										</IconButton>
									</LightTooltip>
								) : (
									<LightTooltip slotProps={{ popper: { modifiers: [{ name: 'offset', options: { offset: [0, -5], }, },] }, }} placement="left" arrow title="좋아요">
										<IconButton size='small' onClick={toggleLike} sx={{ color: 'white' }}>
											<FavoriteBorderIcon />
										</IconButton>
									</LightTooltip>
								)
							}
							<LightTooltip slotProps={{ popper: { modifiers: [{ name: 'offset', options: { offset: [0, -5], }, },] }, }} placement="left" arrow title="강의 비교하기">
								<IconButton size='small' sx={{ color: 'white' }} onClick={() => addCart(lecture)}>
									<BalanceIcon />
								</IconButton>
							</LightTooltip>
						</div>
					</div>
				) : null
			}
			<LoginModal open={open} onClose={ModalClose} />
		</Card>
	)
}

export default LectureCard