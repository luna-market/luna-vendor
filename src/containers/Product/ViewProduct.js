import React, { useState } from 'react'
import { useHistory, useParams } from "react-router";

import { gql, useMutation, useQuery } from '@apollo/client';
import { VENDOR_ID } from "../../constants"

import { Form, Button, Container, Col, Row, Card, InputGroup, Spinner, Image } from 'react-bootstrap'
import '../../styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faEdit, faEye, faEyeSlash, faSave } from '@fortawesome/free-solid-svg-icons'

import Loading from '../../components/Loading'
// import Error from '../Error'

const GET_VENDOR_PRODUCT_IDS = gql`
query Query($getProductsByVendorIdId: ID!) {
    getProductsByVendorID(id: $getProductsByVendorIdId) {
      id
    }
  }
`

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

const UPDATE_PRODUCT = gql`
mutation Mutation($updateProductId: Int!, $updateProductName: String, $updateProductPrice: Float, $updateProductDescription: String, $updateProductProvidedQuantity: Int, $updateProductAmazonLink: String, $updateProductRequirement: Requirement, $updateProductSearchKeyWord: String, $updateProductCurrentAmazonLocation: String, $updateProductStatus: ProductStatus) {
    updateProduct(id: $updateProductId, name: $updateProductName, price: $updateProductPrice, description: $updateProductDescription, provided_quantity: $updateProductProvidedQuantity, amazon_link: $updateProductAmazonLink, requirement: $updateProductRequirement, search_key_word: $updateProductSearchKeyWord, current_amazon_location: $updateProductCurrentAmazonLocation, status: $updateProductStatus) {
      name
      price
      description
      provided_quantity
      amazon_link
      status
      requirement
      search_key_word
      current_amazon_location
      brand
      featured
    }
  }`

const STATUS_TOGGLE = ``

const ViewProduct = (props) => {
    const history = useHistory()
    const productId = Number(useParams().productId)

    /* prevent vendor from accessing other vendor's data */
    useQuery(GET_VENDOR_PRODUCT_IDS, {
        variables: {
            "getProductsByVendorIdId": localStorage.getItem(VENDOR_ID)
        },
        onCompleted: (data) => {

            // if (!data.getProductsByVendorIdId.products_id.includes(productId.toString())) history.push('/err')
        }
    })

    const [product_name, set_product_name] = useState('')
    const [brand, set_brand] = useState('')
    const [price, set_price] = useState('')
    const [amazon_link, set_amazon_link] = useState('')
    const [amazon_location, set_amazon_location] = useState('')
    const [search_key_word, set_search_key_word] = useState('')
    const [description, set_description] = useState('')
    const [requirement, set_requirement] = useState('')
    const [provided_quantity, set_provided_quantity] = useState('')
    const [sold_quantity, set_sold_quantity] = useState('')
    const [images, set_images] = useState('')
    const [status, set_status] = useState('')
    const [created, set_created] = useState('')
    const [featured, set_featured] = useState(false)

    const [editMode, setEditMode] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [saved, setSaved] = useState(false)
    const [updateError, setUpdateError] = useState('')

    const [uploaded, set_uploaded] = useState(true)
    const [error, set_error] = useState('')
    const [imgError, set_img_error] = useState('')

    const { loading, data } = useQuery(GET_PRODUCT, {
        variables: {
            "getProductByIdId": productId
        },
        onCompleted: (data) => {
            set_product_name(data.getProductByID.name)
            set_price(data.getProductByID.price)
            set_brand(data.getProductByID.brand)
            set_description(data.getProductByID.description)
            set_images(data.getProductByID.images)
            set_created(data.getProductByID.created)
            set_provided_quantity(data.getProductByID.provided_quantity)
            set_sold_quantity(data.getProductByID.sold_quantity)
            set_amazon_link(data.getProductByID.amazon_link)
            set_status(data.getProductByID.status)
            set_featured(data.getProductByID.featured)
            set_requirement(data.getProductByID.requirement)
            set_search_key_word(data.getProductByID.search_key_word)
            set_amazon_location(data.getProductByID.current_amazon_location)
        }
    })

    const [updateProduct, { loading: updateLoading }] = useMutation(UPDATE_PRODUCT, {
        variables: {
            "updateProductId": productId,
            "updateProductName": product_name,
            "updateProductPrice": price,
            "updateProductDescription": description,
            "updateProductProvidedQuantity": provided_quantity,
            "updateProductAmazonLink": amazon_link,
            "updateProductRequirement": requirement,
            "updateProductSearchKeyWord": search_key_word,
            "updateProductCurrentAmazonLocation": amazon_location,
            // "updateProductStatus": null
        },
        onCompleted: () => {
            setEditMode(false)

            set_product_name(product_name)
            set_price(price)
            set_brand(brand)
            set_description(description)
            set_images(images)
            set_provided_quantity(provided_quantity)
            set_amazon_link(amazon_link)
            set_status(status)
            set_featured(featured)
            set_requirement(requirement)
            set_search_key_word(search_key_word)
            set_amazon_location(amazon_location)
        },
        onError: (e) => { setUpdateError(e) }
    })

    const deleteProduct = () => { }

    const requirementText = () => {
        switch (requirement) {
            case 'TYPE0': return '仅下单'
            case 'TYPE1': return '5星'
            case 'TYPE2': return '5星 + 评论'
            case 'TYPE3': return '5星 + 评论 + 图片'
        }
    }

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

    if (loading) return <Loading centered={true} />

    return (
        <Container className='mt-4 mb-5'>
            <Row className='justify-content-between' style={{ alignItems: 'center' }}>
                <Col className='title mt-3' >商品信息</Col>
                <Col sm='auto'  >
                    {updateLoading ? <Spinner className='mr-4' animation="border" size="sm" /> : <div className='mr-4 mt-2 ' style={{ color: 'red' }}>{error}</div>}
                    {editMode && <Button className='button mr-4 mt-3' variant="info" onClick={updateProduct}><FontAwesomeIcon icon={faSave} />&nbsp; 保存更改</Button>}
                    <Button className='button mr-4 mt-3' variant='warning' onClick={() => { setEditMode(!editMode) }}>
                        {editMode ? '取消修改' : <><FontAwesomeIcon icon={faEdit} />&nbsp; 修改</>}
                    </Button>
                    <Button className='button mt-3' variant={status ? 'success' : 'outline-secondary'}
                        onClick={
                            () => set_status(!status)  // Need to have proper handler
                        }>
                        <FontAwesomeIcon icon={status ? faEye : faEyeSlash} />&nbsp; {status ? '显示中' : '隐藏中'}
                    </Button>
                </Col>
            </Row>

            <hr className='mb-3' />


            <Row>
                <Col >
                    <Form.Group className='mb-5'>
                        <Form.Label className='heading1 blue'> 产品名称 </Form.Label>
                        {editMode ?
                            <Form.Control value={product_name} type="text" onChange={e => set_product_name(e.target.value)} />
                            :
                            <Form.Text className='heading3'>{product_name}</Form.Text>}
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group className='mb-5'>
                                <Form.Label className='heading1 blue'> 品牌 </Form.Label>
                                {editMode ?
                                    <Form.Control value={brand} type="text" onChange={e => set_brand(e.target.value)} />
                                    :
                                    <Form.Text className='heading3'>{brand}</Form.Text>}
                            </Form.Group>
                        </Col>
                        <Col xs={editMode ? 4 : 6}>
                            <Form.Group className='mb-5'>
                                <Form.Label className='heading1 blue'> 原价 </Form.Label>
                                {editMode ?
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>$</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control value={price} placeholder="0.00" type="text" onChange={e => set_price(e.target.value)} />
                                    </InputGroup>
                                    :
                                    <Form.Text className='heading3'>${price}</Form.Text>}
                            </Form.Group>
                        </Col>
                    </Row>


                    <Form.Group className='mb-5'>
                        <Form.Label className='heading1 blue'> 亚马逊产品链接 </Form.Label>
                        {editMode ?
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text><FontAwesomeIcon icon={faLink} /></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control value={amazon_link} type="text" onChange={e => set_amazon_link(e.target.value)} />
                            </InputGroup>
                            :
                            <Form.Text className='heading3'><a href={amazon_link} style={{ wordBreak: 'break-all', display: 'inline-block' }}>{amazon_link}</a></Form.Text>}
                    </Form.Group>

                    <Form.Group className='mb-5'>
                        <Form.Label className='heading1 blue'> 产品描述 </Form.Label>
                        {editMode ?
                            <Form.Control value={description} as="textarea" rows='10' onChange={e => set_description(e.target.value)} />
                            :
                            <Form.Text className='heading3'>{description}</Form.Text>}
                    </Form.Group>

                    {editMode ?
                        <Form.File custom={false} className='mb-5'>
                            <Form.File.Label className='heading1 blue' data-browse="Browse files">产品图片</Form.File.Label>
                            <Container>
                                <Row lg={2}>
                                    <Image src={images[0]} fluid />
                                </Row>
                                <Row className='mt-2'>
                                    <Form.File.Input isValid={false} />
                                </Row>
                                <Row className='justify-content-between mt-1 align-items-center' >
                                    <Button className='button mt-2' variant="dark" onClick={uploadImage}>上传图片</Button>
                                    <div className='mt-2' style={{ color: 'red' }}>{imgError}</div>
                                </Row>

                            </Container>
                        </Form.File>
                        :
                        <Container className='mb-5'>
                            <Row className='heading1 blue'>产品图片 </Row>
                            <Row className='mt-2' ><Image src={images[0]} fluid /></Row>
                        </Container>
                    }
                </Col>

                <Col lg={1}></Col>

                <Col lg={editMode ? 4 : 4}>
                    <Form.Group className='mb-5'>
                        <Form.Label className='heading1 blue'> 留评要求 </Form.Label>
                        {editMode ?
                            <Form.Control
                                as="select"
                                className="mr-sm-2"
                                id="inlineFormCustomSelect"
                                custom
                                value={requirement}
                                onChange={e => set_requirement(e.target.value)}
                            >
                                <option value="TYPE0">仅下单</option>
                                <option value="TYPE1">5星</option>
                                <option value="TYPE2">5星+评论</option>
                                <option value="TYPE3">5星+评论+图片</option>
                            </Form.Control>
                            :
                            <Form.Text className='heading3'>{requirementText()}</Form.Text>}
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group className='mb-5'>
                                <Form.Label className='heading1 blue'> 所需单数{editMode && '(需大于已售单数)'}</Form.Label>
                                {editMode ?
                                    <InputGroup className="mb-3">
                                        <Form.Control value={provided_quantity} placeholder="0" type="text" onChange={e => set_provided_quantity(e.target.value)} />
                                        <InputGroup.Append>
                                            <InputGroup.Text id="basic-addon2">件</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    :
                                    <Form.Text className='heading3'>{provided_quantity}件</Form.Text>}
                            </Form.Group>
                        </Col>
                        <Col xs={editMode ? 4 : 6}>
                            <Form.Group className='mb-5'>
                                <Form.Label className='heading1 blue'>已售单数 </Form.Label>
                                <Form.Text className='heading3'>{sold_quantity}件</Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className='mb-5'>
                        <Form.Label className='heading1 blue'> 搜索关键词 </Form.Label>
                        {editMode ?
                            <Form.Control value={search_key_word} type="text" onChange={e => set_search_key_word(e.target.value)} />
                            :
                            <Form.Text className='heading3'>{search_key_word}</Form.Text>}
                    </Form.Group>

                    <Form.Group className='mb-5'>
                        {editMode ?
                            <>
                                <Form.Label className='heading1 blue'> 商品当前在亚马逊网站处在 </Form.Label>
                                <InputGroup
                                    className="mb-3 "
                                    style={{ width: '140px' }}
                                >
                                    <InputGroup.Prepend>
                                        <InputGroup.Text >第</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control value={amazon_location} type="text" placeholder='?' onChange={e => set_amazon_location(e.target.value)} />
                                    <InputGroup.Append>
                                        <InputGroup.Text id="basic-addon2">页</InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                            </>
                            :
                            <>
                                <Form.Label className='heading1 blue'>商品当前在亚马逊网站处在</Form.Label>
                                <Form.Text className='heading3'> 第{amazon_location}页</Form.Text>
                            </>}
                    </Form.Group>

                </Col>
            </Row>
            {/* <Col>
                <Row className='justify-content-end' style={{ alignItems: 'center' }}>
                    {updateLoading ? <Spinner className='mr-3' animation="border" /> : <div className='mr-3' style={{ color: 'red' }}>{error}</div>}
                </Row>
            </Col> */}
        </Container>
    )
}

export default ViewProduct;