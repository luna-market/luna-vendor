import React, { useState } from 'react'
import { useHistory, useParams } from "react-router";

import { gql, useMutation, useQuery } from '@apollo/client';
import { VENDOR_ID } from "../../constants"

import { Form, Button, Container, Col, Row, Card, InputGroup, Spinner, Image } from 'react-bootstrap'
import '../../styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

import Loading from '../../components/Loading'

const GET_PRODUCT = gql`
query Query($getProductByIdId: ID!) {
    getProductByID(id: $getProductByIdId) {
      name
      price
      brand
      description
      images
      created
      provided_quantity
      sold_quantity
      amazon_link
      status
      featured
      requirement
      search_key_word
      current_amazon_location
    }
  }
  `

const ViewProduct = (props) => {
    const history = useHistory()

    const productId = Number(useParams())

    const [product_name, set_product_name] = useState('')
    const [brand, set_brand] = useState('')
    const [price, set_price] = useState('')
    const [amazon_link, set_amazon_link] = useState('')
    const [amazon_location, set_amazon_location] = useState('')
    const [search_key_word, set_search_key_word] = useState('')
    const [description, set_description] = useState('')
    const [requirement, set_requirement] = useState('')
    const [provided_quantity, set_provided_quantity] = useState('')
    const [images, set_images] = useState('')

    const {loading, data, error} = useQuery(GET_PRODUCT,{
        variables:{
            "getProductByIdId": localStorage.getItem(VENDOR_ID)
          }
    })


    if(loading) return <Loading centered={true}/>

    return (
        <Container className='mt-5 mb-5'>
            <h1 className='heading1 mb-3 '>{product_name}</h1>
            <Row>
                <Col >
                    <Form.Group>
                        <Form.Label className='label'> 产品名称 </Form.Label>
                        <Form.Control type="text" onChange={e => set_product_name(e.target.value)} />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label className='label'> 品牌 </Form.Label>
                                <Form.Control type="text" onChange={e => set_brand(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col xl={4}>
                            <Form.Group>
                                <Form.Label className='label'> 原价 </Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control placeholder="0.00" type="text" onChange={e => set_price(e.target.value)} />
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>


                    <Form.Group>
                        <Form.Label className='label'> 亚马逊产品链接 </Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text><FontAwesomeIcon icon={faLink} /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="text" onChange={e => set_amazon_link(e.target.value)} />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='label'> 产品描述 </Form.Label>
                        <Form.Control as="textarea" rows='10' onChange={e => set_description(e.target.value)} />
                    </Form.Group>
                </Col>

                <Col lg={1}></Col>

                <Col lg={4}>
                    <Form.Group>
                        <Form.Label className='label'> 留评要求 </Form.Label>
                        <Form.Control
                            as="select"
                            className="mr-sm-2"
                            id="inlineFormCustomSelect"
                            custom
                            onChange={e => set_requirement(e.target.value)}
                        >
                            <option value="TYPE0">仅下单</option>
                            <option value="TYPE1">5星+评论</option>
                            <option value="TYPE2">5星+评论</option>
                            <option value="TYPE3">5星+评论+图片</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group >
                        <Form.Label className='label'> 所需单数 </Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control placeholder="0" type="text" onChange={e => set_provided_quantity(e.target.value)} />
                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">个</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className='label'> 搜索关键词 </Form.Label>
                        <Form.Control type="text" onChange={e => set_search_key_word(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className='label'> 商品当前在亚马逊网站处在 </Form.Label>
                        <InputGroup
                            className="mb-3"
                            style={{ width: '140px' }}
                        >
                            <InputGroup.Prepend>
                                <InputGroup.Text >第</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="text" placeholder='?' onChange={e => set_amazon_location(e.target.value)} />
                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">页</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>


                    {/* <Row lg={6}>产品图片
                                        <Image src={images[0]} fluid/>
                                    </Row> */}

                </Col>
            </Row>
            <Col>
                <Row className='justify-content-end' style={{ alignItems: 'center' }}>
                    <Button className='button' variant="warning">修改商品信息</Button>
                </Row>
            </Col>
        </Container>
    )
}

export default ViewProduct;