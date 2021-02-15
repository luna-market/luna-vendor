import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useHistory } from "react-router";
import { AUTH_TOKEN, VENDOR_ID } from "../constants"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Container, Button, Form, Card, Toast } from "react-bootstrap";
import '../styles.css'

const GET_VENDOR = gql
    `query Query($getVendorByIdId: ID!) {
    getVendorByID(id: $getVendorByIdId) {
      email
      phone
      wechat
      credits
    }
  }`

const UPDATE_VENDOR = gql`
mutation VendorUpdateMutation($vendorUpdateId: Int!, $vendorUpdateInput: VendorUpdateInput!) {
    vendorUpdate(id: $vendorUpdateId, input: $vendorUpdateInput) {
      phone
      wechat
    }
  }
`

function Profile(props) {
    const [email, setEmail] = useState()
    const [wechat, setWechat] = useState()
    const [phone, setPhone] = useState()

    const [showToast, setToast] = useState(false)

    const { loading, data } = useQuery(GET_VENDOR, {
        variables: {
            "getVendorByIdId": localStorage.getItem(VENDOR_ID)
        },
        onCompleted: (data) => {
            setEmail(data.getVendorByID.email)
            setWechat(data.getVendorByID.wechat)
            setPhone(data.getVendorByID.phone)
        }
    })

    const [updateVendor] = useMutation(UPDATE_VENDOR, {
        variables: {
            "vendorUpdateId": Number(localStorage.getItem(VENDOR_ID)),
            "vendorUpdateInput": {
                "phone": phone,
                "wechat": wechat
            }
        },
        onCompleted: (data) => {
            setToast(true)
            setWechat(data.vendorUpdate.wechat)
            setPhone(data.vendorUpdate.phone)
            setTimeout(() => setToast(false), 1500)
        }
    })

    return (
        <Container className='mt-5' style={{ maxWidth: '400px' }}>


            <Card border='light'>
                <Card.Body>
                    <Card.Title className='title mb-3'>我的账号</Card.Title>

                    <Form.Group>
                        <Form.Label className='label'>账号</Form.Label>
                        <Form.Control
                            disabled
                            value={email}
                        // onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className='label'>微信</Form.Label>
                        <Form.Control
                            value={wechat}
                            onChange={e => setWechat(e.target.value)} />
                    </Form.Group>

                    <Form.Group className='label'>
                        <Form.Label>联系电话</Form.Label>
                        <Form.Control
                            value={phone}
                            onChange={e => setPhone(e.target.value)} />
                    </Form.Group>

                    <Button className="button" variant="warning" style={{ marginTop: "30px" }}
                        onClick={updateVendor}
                    >
                        保存更改
                    </Button>


                </Card.Body>
            </Card>

            <Toast
                className='mt-3'
                show={showToast}
            // style={{
            //     position: 'fixed',
            //     bottom: '20px',
            //     right: '20px',
            // }}
            >
                <Toast.Body><FontAwesomeIcon icon={faCheck} color='green' /> 信息已更新</Toast.Body>
            </Toast>
        </Container>
    )
}

export default Profile