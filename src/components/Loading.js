import Loader from 'react-loader-spinner';
import { Container, Row } from 'react-bootstrap';
import '../styles.css'

function Loading(props) {

    return (
        <Container>
            <Row className='justify-content-center mb-3'
                style={props.centered ? { marginTop: '35vh' } : { marginTop: '40px' }}>
                <Loader type="Grid" color="#4D5176" />
            </Row>
            <Row className='justify-content-center mb-5 button'>
                努力加载中...
            </Row>
        </Container>
    )
}

export default Loading;