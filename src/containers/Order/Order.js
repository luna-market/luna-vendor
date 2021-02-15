import { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useHistory, useParams } from "react-router";
import { AUTH_TOKEN, VENDOR_ID } from "../../constants"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons'
import { Container, Button, Badge, Card, OverlayTrigger, Tooltip, Row, Col, Image } from "react-bootstrap";
import '../../styles.css'

import Loading from '../../components/Loading'

const GET_VENDOR_ID = gql`
query Query($getOrderByIdId: ID!) {
    getOrderByID(id: $getOrderByIdId) {
      vendor_id
    }
  }
`
const GET_ORDER = gql`
query Query($getOrderByIdId: ID!) {
    getOrderByID(id: $getOrderByIdId) {
      product {
        name
        price
      }
      az_order_number
      order_screenshot
      payment
      created_date
      amazon_review_screenshot
      order_status
      user {
        payment_type
        payment_account_id
      }
    }
  }
`


function Order(props) {
    const { orderId } = useParams()
    const history = useHistory()

    const { loading } = useQuery(GET_VENDOR_ID, {
        variables: {
            "getOrderByIdId": orderId
        },
        onCompleted: (data) => {
            if (data.getOrderByID.vendor_id !== Number(localStorage.getItem(VENDOR_ID))) history.push('/err')
        }
    })

    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState('')
    const [amzOrderNumber, setAmzOrderNumber] = useState('')
    const [purchaseImg, setPurchaseImg] = useState('')
    const [reviewImg, setReviewImg] = useState('')
    const [date, setDate] = useState('')
    const [status, setStatus] = useState('')
    const [payType, setPayType] = useState('')
    const [payId, setPayId] = useState('')

    const [tooltipMessage, setTooltipMessage] = useState('复制到剪贴板')


    useQuery(GET_ORDER, {
        variables: {
            "getOrderByIdId": orderId
        },
        onCompleted: (data) => {
            setProductName(data.getOrderByID.product.name)
            setPrice(data.getOrderByID.product.price)
            setAmzOrderNumber(data.getOrderByID.az_order_number)
            setPurchaseImg(data.getOrderByID.order_screenshot)
            setStatus(data.getOrderByID.order_status)
            setDate(data.getOrderByID.created_date)
            setReviewImg(data.getOrderByID.amazon_review_screenshot)
            setPayType(data.getOrderByID.user.payment_type)
            setPayId(data.getOrderByID.user.payment_account_id)
        }
    })

    const pill = (status) => {
        switch (status) {
            case 'APPLIED': return { color: 'info', text: '待下单' }
            case 'PURCHASED': return { color: 'warning', text: '待留评' }
            case 'REVIEWED': return { color: 'danger', text: '待审核' }
            case 'APPROVED': return { color: 'success', text: '待结算' }
            case 'FINISHED': return { color: 'dark', text: '已完成' }
            default: return { color: 'light', text: '' }
        }
    }

    const copyPayId = () => {
        navigator.clipboard.writeText(payId)
        setTooltipMessage('已复制!')
        setTimeout(() => {
            setTooltipMessage('复制到剪贴板')
        }, 2000);
    }


    if (loading) return <Loading centered={true} />
    return (
        <Container className='mt-5 mb-5' style={{ maxWidth: '1000px' }}>
            <Card border='light'>
                <Card.Body className='p-5'>
                    <Row className='justify-content-between' style={{ alignItems: 'center' }}>
                        <Col xs='auto' className='mt-1 mb-1'>
                            <div className='label'>{new Date(Number(date)).toLocaleDateString()}</div>
                            <div className='title blue'>订单 #{orderId} </div>
                        </Col>
                        <Col xs='auto'><Badge className='heading3 p-2' pill variant={pill(status).color}>&nbsp;{pill(status).text}&nbsp;</Badge></Col>
                        {/* <Col className='label mt-3'></Col>
                        <Col className='mt-3' sm='auto'>

                        </Col> */}
                    </Row>

                    <Card.Text className='one-line text ml-1'>{productName}</Card.Text>
                    <hr className='mb-3' />

                    <Row className='mb-5'>
                        <Col sm={2}>
                            <Card.Text className='heading1 blue mb-0'>亚马逊单号</Card.Text>
                        </Col>
                        <Col sm={3}>
                            <Card.Text className='heading3 mb-3'>{amzOrderNumber ? amzOrderNumber : '[暂无订单号]'}</Card.Text>
                        </Col>
                        <Col sm={1}></Col>
                        <Col sm={2}>
                            <Card.Text className='heading1 blue mb-1'>结算信息</Card.Text>
                        </Col>
                        <Col sm={4}>
                            <Card.Text className='heading3 mb-1'>支付应用: {payType}</Card.Text>
                            <Card.Text className='heading3 mb-2'>支付账号: {payId} &nbsp;
                                <OverlayTrigger
                                    placement='right'
                                    overlay={
                                        <Tooltip className='ml-1'>
                                            {tooltipMessage}
                                        </Tooltip>
                                    }
                                >
                                    <FontAwesomeIcon icon={faCopy} className='blue' onClick={copyPayId} />
                                </OverlayTrigger>
                            </Card.Text>
                            <Card.Text className={status==='REVIEWED'?'heading1 mb-2 yellow':'heading3'}>待补贴金额: ${price}</Card.Text>
                            {status==='REVIEWED' && <Button className='button' variant='warning'><FontAwesomeIcon icon={faCheck}/> 我已完成补贴</Button>}
                        </Col>
                    </Row>
                    {purchaseImg &&
                        <>
                            <hr />
                            <Row className='mb-1'>
                                <Col xs={2}><Card.Text className='heading1 blue'>订单截图</Card.Text></Col>
                                <Col><Image thumbnail fluid src={purchaseImg} /></Col>
                            </Row>
                        </>}

                    {reviewImg &&
                        <>
                            <hr className='mt-5' />
                            <Row className='mb-1'>
                                <Col xs={2}><Card.Text className='heading1 blue'>留评截图</Card.Text></Col>
                                <Col><Image thumbnail fluid src={reviewImg} /></Col>
                            </Row>
                        </>}


                </Card.Body>
            </Card>
        </Container>
    )
}

export default Order