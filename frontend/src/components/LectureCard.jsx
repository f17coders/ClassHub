import * as React from 'react'
import { Card, CardContent, CardMedia, Button, Rating, IconButton, Snackbar, Alert, Backdrop } from '@mui/material'
import { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import BalanceIcon from '@mui/icons-material/Balance'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import { useSelector, useDispatch } from 'react-redux'
import { addElement } from './../store/store.js'


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

function LectureCard(props) {
	// 비교 강의 추가할때 쓰는 변수
	let dispatch = useDispatch()

	// 호버용 변수
	const [hover, setHover] = useState(false)
	const hoverStyle = {
		position: 'relative',
		height: 340,
		cursor: hover ? 'pointer' : 'none',
		boxShadow: hover ? "0px 4px 8px 0px rgba(0, 0, 0, 0.2)" : 'none',
	}

	// 좋아요용 변수
	const [like, setLike] = useState(false)
	const toggleLike = () => setLike(!like)


	// snackbar용 병수
	const [open, setOpen] = useState(false)
	const handleClick = () => {
    setOpen(true)
  }
	const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }
	
	// alert창 용
	const [openAlert, setOpenAlert] = React.useState(false);
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

	// 함수 두개 합치는 용(강의 비교 + 완료됐다는 snackbar) or 3개 다 차면 안된다고 해주기
	let compareLectures = useSelector((state) => state.compareLectures)
	function addCart() {
		if (compareLectures.length < 3) {
			dispatch(addElement(props))
			handleClick()
		} else {
			handleOpenAlert()
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
				image={props.img}
				title="lecture image"
			/>
			<CardContent style={{ padding: '13px' }}>
				<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
					<div style={{ height: '70px' }}>
						<p style={{ fontWeight: '700', fontSize: '1.1em' }}>{props.title}</p>
					</div>
					<div>
						<p style={{ marginBottom: '5px' }}>강의자<br /><Rating value={4} readOnly></Rating></p>
					</div>
					<div>
						<Button size="small" variant="contained" sx={{ borderRadius: '20px', marginRight: '0.5em' }}>#VSCode</Button>
					</div>
				</div>
			</CardContent>
			{
				hover == true ? (
					<div
						style={{
							position: 'absolute',
							top: 0,
							backgroundColor: 'rgba(29, 35, 100, 0.9)',
							width: '100%',
							height: '100%',
							color: 'white',
							padding: '15px',
							display: 'flex',
							flexDirection: 'column'
						}}
					>
						<p style={{ fontWeight: '700', fontSize: '1.3em' }}>{props.title}</p>
						<div style={{ height: '70%' }}>
							<p>수강기간<br />한줄 설명<br />강의 총 시간<br />난이도</p>
						</div>
						<div style={{ height: '20%' }}>
							<Button size="small" sx={{ backgroundColor: 'RGB(83, 96, 245)', color: 'white', borderRadius: '20px', marginRight: '0.5em' }}>#VSCode</Button>
						</div>
						<div style={{ marginLeft: '75%', display: 'flex', flexDirection: 'column' }}>
							{
								like ? (
									<LightTooltip slotProps={{popper: {modifiers: [{name: 'offset', options: {offset: [0, -15],},},]},}} placement="left" arrow title="좋아요 취소">
										<IconButton size='small' onClick={toggleLike} sx={{ color: 'white' }}>
											<FavoriteIcon />
										</IconButton>
									</LightTooltip>
								) : (
									<LightTooltip slotProps={{popper: {modifiers: [{name: 'offset', options: {offset: [0, -15],},},]},}} placement="left" arrow title="좋아요">
										<IconButton size='small' onClick={toggleLike} sx={{ color: 'white' }}>
											<FavoriteBorderIcon />
										</IconButton>
									</LightTooltip>
								)
							}
							<LightTooltip slotProps={{popper: {modifiers: [{name: 'offset', options: {offset: [0, -15],},},]},}} placement="left" arrow title="강의 비교하기">
								<IconButton size='small' sx={{ color: 'white' }} onClick={addCart}>
									<BalanceIcon />
								</IconButton>
							</LightTooltip>

						</div>
					</div>
				) : null
			}
			<Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="비교하기 위한 강의에 담겼습니다"
      />
			<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openAlert}
        onClick={handleCloseAlert}
      >
        <Alert severity="warning">비교강의가 3개 이상입니다!</Alert>
      </Backdrop>
		</Card>
	)
}

export default LectureCard