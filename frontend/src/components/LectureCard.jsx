import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


function LectureCard(props) {
	return (
		<Card style={{ width: '16em', margin: '5px' }}>
			<Card.Img variant="top" src={ props.img }/>
			<Card.Body>
				<Card.Title>제목</Card.Title>
				<Card.Text>
					데이터가 업서요 나중에 데이터 받으면 props.content 이런식으로 할 수 있지 않을까
				</Card.Text>
				<Button variant="primary">강의 보러가기</Button>
			</Card.Body>
		</Card>
	)
}

export default LectureCard