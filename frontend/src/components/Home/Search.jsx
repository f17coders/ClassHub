import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function Search() {
    return(
        <div style={{ display: 'flex', width: '50%', margin: 'auto', marginTop: '20px'}}>
            <Form style={{ width: '80%'}}>
                <Form.Control placeholder='검색어를 입력해주세요!'/>
            </Form>
            <Button style={{ marginLeft: '10px'}}>검색하기</Button>
        </div>
    )
}

export default Search