// import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'


// function LectureCard(props) {
// 	return (
// 		<Card style={{ width: '16em', margin: '5px' }}>
// 			<Card.Img variant="top" src={ props.img }/>
// 			<Card.Body>
// 				<Card.Title>제목</Card.Title>
// 				<Card.Text>
// 					데이터가 업서요 나중에 데이터 받으면 props.content 이런식으로 할 수 있지 않을까
// 				</Card.Text>
// 				<Button variant="primary">강의 보러가기</Button>
// 			</Card.Body>
// 		</Card>
// 	)
// }

// export default LectureCard

import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'


function LectureCard(props) {
	return (
		<Card style={{ height: 300}}>
			<CardMedia
				sx={{ height: 140 }}
				image={props.img}
				title="lecture image"
			/>
			<CardContent>
				<Typography gutterBottom variant="h7" component="div">
					{props.title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					강의 상세 정보가 들어가는 곳입니다
				</Typography>
			</CardContent>
			<Button size="small">더 알아보기</Button>
		</Card>
	)
}

export default LectureCard