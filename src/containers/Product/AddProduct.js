import React, { useState } from 'react'
import { useHistory } from 'react-router';

import { gql, useMutation } from '@apollo/client';
import { AUTH_TOKEN, VENDOR_ID } from "../../constants"

import { Form, Button, Container, Col, Row, Card, InputGroup, Spinner, Image } from 'react-bootstrap'
import '../../styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

const CREATE_PRODUCT = gql`
    mutation Mutation(
        $createProductName: String!,
        $createProductBrand: String!,
        $createProductVendorId: Int!,
        $createProductPrice: Float!,
        $createProductDescription: String!,
        $createProductProvidedQuantity: Int!,
        $createProductAmazonLink: String!,
        $createProductRequirement: Requirement!,
        $createProductSearchKeyWord: String!,
        $createProductCurrentAmazonLocation: String!,
        $createProductImages: [String]) {
    createProduct(
        name: $createProductName,
        brand: $createProductBrand,
        vendor_id: $createProductVendorId,
        price: $createProductPrice, 
        description: $createProductDescription, 
        provided_quantity: $createProductProvidedQuantity, 
        amazon_link: $createProductAmazonLink, 
        requirement: $createProductRequirement, 
        search_key_word: $createProductSearchKeyWord, 
        current_amazon_location: $createProductCurrentAmazonLocation, 
        images: $createProductImages) {
        id
    }
    }
`

const AddProduct = () => {
    const history = useHistory()

    const token = localStorage.getItem(AUTH_TOKEN)

    if (!token) {
        history.push('/auth')
    }

    const [product_name, set_product_name] = useState('')
    const [brand, set_brand] = useState('')
    const [price, set_price] = useState('')
    const [amazon_link, set_amazon_link] = useState('')
    const [amazon_location, set_amazon_location] = useState('')
    const [search_key_word, set_search_key_word] = useState('')
    const [description, set_description] = useState('')
    const [requirement, set_requirement] = useState('TYPE0')
    const [provided_quantity, set_provided_quantity] = useState('')
    const [images, set_images] = useState('')

    const [uploaded, set_uploaded] = useState(true)
    const [error, set_error] = useState('')
    const [imgError, set_img_error] = useState('')

    const [product, { loading }] = useMutation(CREATE_PRODUCT, {
        variables: {
            "createProductName": product_name,
            "createProductBrand": brand,
            "createProductVendorId": Number(localStorage.getItem(VENDOR_ID)),
            "createProductPrice": parseFloat(price),
            "createProductDescription": description,
            "createProductProvidedQuantity": Number(provided_quantity),
            "createProductAmazonLink": amazon_link,
            "createProductRequirement": requirement,
            "createProductSearchKeyWord": search_key_word,
            "createProductCurrentAmazonLocation": amazon_location,
            "createProductImages": images
        },
        onCompleted: (p) => {
            console.log(p)
            history.push('/')
        },
        onError: (e) => {
            set_error(e.message);
        }
    })

    // if(loading) console.log('loading: ', loading)

    const uploadImage = () => {
        const { files } = document.querySelector('input[type="file"]')
        console.log('files: ', files)
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('upload_preset', 'product_create');
        const options = {
            method: 'POST',
            body: formData,
        };

        return fetch('https://api.Cloudinary.com/v1_1/drrtelhft/image/upload', options)
            .then(res => res.json())
            .then(res => {
                console.log('image url: ', res.secure_url)
                if (res.secure_url) {
                    set_images([res.secure_url])
                    set_img_error('')
                    set_uploaded(false)
                }
                else {
                    set_img_error('上传失败, 请重试')
                }
            })
            .catch(err => {
                console.log('error: ', err)
            });
    }

    return (
        <Container className='mt-5 mb-5'>
            <h1 className='title mb-3 '>新增商品</h1>
            <Card border='light p-3'>
                <Card.Body>
                {/* <Card.Text className='title'>添加商品</Card.Text> */}
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
                                    <option value="TYPE1">5星</option>
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


                            <Form.File custom={false}>
                                <Form.File.Label className='label' data-browse="Browse files">产品图片</Form.File.Label>
                                <Container>
                                    <Row>
                                        <Form.File.Input isValid={false} />
                                    </Row>
                                    <Row className='justify-content-between mt-1 align-items-center' >
                                        <Button className='button mt-2' variant="dark" onClick={uploadImage}>上传图片</Button>
                                        <div className='mt-2' style={{ color: 'red' }}>{imgError}</div>
                                    </Row>
                                    {/* <Row lg={6}>
                                        <Image src={images[0]} fluid/>
                                    </Row> */}
                                </Container>
                            </Form.File>

                        </Col>
                    </Row>
                    <Col>
                        <Row className='justify-content-end' style={{ alignItems: 'center' }}>
                            {loading ? <Spinner className='mr-3' animation="border" /> : <div className='mr-3' style={{ color: 'red' }}>{error}</div>}
                            <Button disabled={uploaded} className='button' variant="warning" onClick={product}>添加</Button>
                        </Row>
                    </Col>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default AddProduct;