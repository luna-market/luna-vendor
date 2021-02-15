import { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useHistory, useParams } from "react-router";
import { AUTH_TOKEN, VENDOR_ID } from "../constants"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { Container, Button, Badge, Card, OverlayTrigger, Tooltip, Row, Col, Image } from "react-bootstrap";
import '../styles.css'

function OrderItem(props) {

    const history = useHistory()
    const redirect = (destination) => {
        history.push('/' + destination)
    }

    const pill = () => {
        switch (props.data.order_status) {
            case 'APPLIED': return { color: 'info', text: '待下单' }
            case 'PURCHASED': return { color: 'warning', text: '待留评' }
            case 'REVIEWED': return { color: 'danger', text: '待审核' }
            case 'APPROVED': return { color: 'success', text: '待结算' }
            case 'FINISHED': return { color: 'dark', text: '已完成' }
            default: return { color: 'light', text: '' }
        }
    }

    return (
        <Card className='mt-2' border='light' onClick={() => history.push('/order/' + props.data.id)}>
            <Card.Body>
                <Row className='justify-content-between mb-1' style={{ alignItems: 'center' }}>
                    <Col className='heading1' xs='auto' style={{ alignContent: 'start' }}>
                        <span style={{display:'inline-block'}}>订单 #{props.data.id} </span>
                        <Badge className='heading3 p-1 ml-2' pill variant={pill().color} style={{display:'inline-block'}}>
                            &nbsp;{pill().text}&nbsp;
                        </Badge>
                    </Col>
                    {/* <Col xs='auto'><Badge className='heading3 p-2' pill variant={pill().color}>&nbsp;{pill().text}&nbsp;</Badge></Col> */}
                    <Col className='label' xs='auto'>{new Date(Number(props.data.created_date)).toLocaleDateString()}</Col>
                </Row>

                <Card.Text className='one-line heading3'>{props.data.product.name}</Card.Text>

            </Card.Body>
        </Card>
    )
}

// product {
//     
//     requirement
//   }
//   az_order_number
//   order_screenshot
//   amazon_review_screenshot
//   created_date
//   
// }

export default OrderItem