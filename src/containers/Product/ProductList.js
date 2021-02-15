import { useState } from 'react'
import { Container, Row, Button, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { AUTH_TOKEN, VENDOR_ID } from "../../constants"

import CardView from '../../components/ProductList/CardView'
import TableView from '../../components/ProductList/TableView'
import { useHistory } from 'react-router'


function ProductList(props) {
    const history = useHistory()

    const token = localStorage.getItem(AUTH_TOKEN)

    if (!token) {
        history.push('/auth')
    }


    const [view, setView] = useState('cards')

    return (
        <Container className='mt-3'>
            <Row className='justify-content-between'>
                <Col className='title mt-3'>商品一览</Col>
                <Col className='mt-3' sm='auto'>
                    <Button className='button' variant='success' onClick={()=>{history.push('/add')}}>
                        <FontAwesomeIcon icon={faPlus} />&nbsp; 添加商品
                    </Button>
                </Col>
            </Row>
            <hr className='mb-3'/>

            {/* <TableView /> */}
            <CardView />
        </Container>
    )
}

export default ProductList;