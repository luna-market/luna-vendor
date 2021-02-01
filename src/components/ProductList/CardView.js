import React, { useState } from "react";
import { Container, Row } from 'react-bootstrap';
import ProductCard from "./ProductCard";
import { useQuery, gql } from '@apollo/client';
import Loader from '../Loading'

import { VENDOR_ID } from '../../constants';

const GET_PRODUCT = gql`
query Query($getProductsByVendorIdId: ID!) {
    getProductsByVendorID(id: $getProductsByVendorIdId) {
      id
      name
      price
      images
      sold_quantity
      status
    }
  }
`

function CardView(props) {
    const [content, setContent] = useState([])

    const vendorID = localStorage.getItem(VENDOR_ID)

    const { loading } = useQuery(GET_PRODUCT, {
        variables: {
            "getProductsByVendorIdId": vendorID
        },
        onCompleted: (d) => {
            setContent(d.getProductsByVendorID)
        }
    });

    if (loading) return <Loader  />

    return (

        <Container fluid
            className="product-list-container mb-5"
        // style={{ paddingLeft: '10%', paddingRight: '10%' }}
        >
            <Row className="product-list-row justify-content-left">
                {content.map((p) => {
                    return <ProductCard key={p.id} title={p.name} msrp={p.price} img={p.images[0]} pid={p.id} />
                })}
            </Row>
        </Container>
    );
}

export default CardView