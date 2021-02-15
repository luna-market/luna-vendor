import { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useHistory } from "react-router";
import { AUTH_TOKEN, VENDOR_ID } from "../../constants"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Container, Button, Form, Card, Toast } from "react-bootstrap";
import '../../styles.css'

import Loading from '../../components/Loading'
import OrderItem from '../../components/OrderItem';

const GET_ORDERS = gql`
query Query($getOrdersByVendorIdId: ID!) {
    getOrdersByVendorID(id: $getOrdersByVendorIdId) {
      id
      product {
        name
        requirement
      }
      order_status
      az_order_number
      order_screenshot
      amazon_review_screenshot
      created_date
    }
  }`


function OrderList(props) {

  const history = useHistory()

  const token = localStorage.getItem(AUTH_TOKEN)

  if (!token) {
      history.push('/auth')
  }

  const { loading, data } = useQuery(GET_ORDERS, {
      variables: {
          "getOrdersByVendorIdId": localStorage.getItem(VENDOR_ID)
      }
  })

  if (loading) return <Loading centered={true} />
  return (
      <Container className='mt-5' style={{maxWidth:'800px'}}>
          <div className='title'>订单列表</div>
          <hr className='mb-4'/>
          {data.getOrdersByVendorID.map((d) => <OrderItem data={d} />)}
      </Container>
  )
}

export default OrderList