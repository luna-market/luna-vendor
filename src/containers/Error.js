import { useHistory } from "react-router";
import { Container, Row, Button } from "react-bootstrap";
import '../styles.css'

function Error() {
    const history = useHistory()

    return (
        <>
            <Container className='mt-5'>
                <Row className='display yellow'>404 NOT FOUND </Row>
                <Row className='heading1'>请确认您输入的是有效的链接</Row>
                <Row><Button className='button mt-5' variant='outline-dark' onClick={() => { history.push('/') }}>返回主页面</Button></Row>
            </Container>
        </>
    )

}

export default Error;