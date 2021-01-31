import { useState } from 'react'
import { Container, Row, Button, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import CardView from '../components/ProductList/CardView'
import TableView from '../components/ProductList/TableView'
import { useHistory } from 'react-router'

const GET_PRODUCT = `

`

function ProductList(props) {
    const history = useHistory()

    const [view, setView] = useState('cards')

    return (
        <Container className='mt-5'>
            <Row className='justify-content-between'>
                <Col className='heading1 mb-3'>商品一览</Col>
                <div>
                    <Button className='button' variant='success' onClick={()=>{history.push('/add')}}>
                        <FontAwesomeIcon icon={faPlus} />&nbsp; 添加商品
                    </Button>
                </div>
            </Row>

            {/* <TableView /> */}
            <CardView />
        </Container>
    )
}

export default ProductList;