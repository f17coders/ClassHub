import BalanceIcon from '@mui/icons-material/Balance'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

// 강의 비교에 들어가는 아이콘

function CompareElement() {
	return (
		<div  style={{ position: 'relative' }}>
			<div
				style={{
					width: '50px',
					height: '50px',
					margin: '10px',
					backgroundColor: 'lightgray',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				<BalanceIcon />
			</div>
			<HighlightOffIcon
				style={{
					position: 'absolute',
					top: -5,
					right: -5,
				}}
			/>
		</div>

	)
}

export default CompareElement