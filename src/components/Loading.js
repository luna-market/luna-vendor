import Loader from 'react-loader-spinner';
import { Container, Row } from 'react-bootstrap';
import '../styles.css'

function Loading(props) {
    const center = () => {
        // console.log('centered: ', props.centered)
        if (props.centered) return { marginTop: '40vh' }
        else return { marginTop: '40px' }
    }

    return (
        <Container>
            <Row className='justify-content-center mb-3' style={center()}>
                <Loader type="Grid" color="#4D5176" />
            </Row>
            <Row className='justify-content-center mb-5 button'>
                努力加载中...
            </Row>
        </Container>
    )
}

export default Loading;