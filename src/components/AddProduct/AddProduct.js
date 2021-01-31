import React, {useState} from 'react'

import {Form, Button, Container} from 'react-bootstrap'

import { gql, useMutation } from '@apollo/client';
import { VENDOR_ID } from "../../constants"

const CREATE_PRODUCT = gql`
    mutation Mutation(
        $createProductName: String!,
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
    const [product_name, set_product_name] = useState('')
    const [price, set_price] = useState('')
    const [amazon_link, set_amazon_link] = useState('')
    const [amazon_location, set_amazon_location] = useState('')
    const [search_key_word, set_search_key_word] = useState('')
    const [description, set_description] = useState('')
    const [requirement, set_requirement] = useState('')
    const [provided_quantity, set_provided_quantity] = useState('')
    const [images, set_images] = useState('')

    const [error, set_error] = useState('')

    const [product] = useMutation(CREATE_PRODUCT, {
        variables: {
            "createProductName": product_name,
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
        },
        onError: (e) => {
            set_error(e.message);
        }
    })

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
                }
            })
            .catch(err => console.log(err));
    }

    return(
        <>
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label> 产品名称 </Form.Label>
                    <Form.Control type="text" onChange={e => set_product_name(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label> 原价 </Form.Label>
                    <Form.Control type="text" onChange={e => set_price(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label> 亚马逊产品链接 </Form.Label>
                    <Form.Control type="text" onChange={e => set_amazon_link(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label> 当前亚马逊位置 </Form.Label>
                    <Form.Control type="text" onChange={e => set_amazon_location(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label> 搜索关键词 </Form.Label>
                    <Form.Control type="text" onChange={e => set_search_key_word(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label> 产品描述 </Form.Label>
                    <Form.Control type="textarea" onChange={e => set_description(e.target.value)}/>
                </Form.Group>
                <Form.Control
                    as="select"
                    className="mr-sm-2"
                    id="inlineFormCustomSelect"
                    custom
                    onChange={e => set_requirement(e.target.value)}
                >
                    <option value="TYPE1">下单</option>
                    <option value="TYPE2">下单+评论</option>
                    <option value="TYPE3">下单+评论+图片</option>
                </Form.Control>
                <Form.Group>
                    <Form.Label> 所需单数 </Form.Label>
                    <Form.Control type="text" onChange={e => set_provided_quantity(e.target.value)}/>
                </Form.Group>
                <Form.File custom={false}>
                        <Form.File.Input isValid={false} />
                        <Form.File.Label className='text' data-browse="Browse files">
                            产品图片
                        </Form.File.Label>
                </Form.File>
                <Button variant="primary" onClick={uploadImage}>
                    上传图片
                </Button>
                <Button variant="primary" onClick={product}>
                    提交商品
                </Button>
            </Form>
        </Container>
        </>
    )
}

export default AddProduct;