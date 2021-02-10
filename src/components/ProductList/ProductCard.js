import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faStarOfLife } from '@fortawesome/free-solid-svg-icons'
import React from "react";
import { Card, Col, Badge } from "react-bootstrap";

import { useHistory } from "react-router";

import "../../styles.css";

const ProductCard = (props) => {

    const history = useHistory();

    const cardOnClick = () => {

        /* change destination appropriate to vendor portal */
        history.push('/product/' + props.pid)
    }

    return (
        <Col className="featured-card-col mb-3 pl-0" xs={6} sm={4} md={3}>
            <Card style={{ width: "auto", border: "0" }} onClick={cardOnClick}>
                <Card.Img
                    className=' mb-0'
                    variant="top"
                    src={props.img}
                />
                <Card.Body className='pl-3 pt-3' style={{ textAlign: "left" }}>
                    <Card.Title className='heading3 one-line mb-1'>
                        {props.title}
                    </Card.Title>
                    <Card.Text className='text mb-2'>
                        <b style={{ color: 'green' }}>免费</b> <s> ${props.msrp}</s>
                    </Card.Text>
                    <Card.Text className='text mb-2'>
                        销量: <b style={{ color: (props.sold < props.provided) ? 'orange' : 'green' }}>{props.sold}</b> / <b>{props.provided}</b>
                    </Card.Text>
                    {props.status === 'ACTIVE' ?
                        <Badge pill className='bold mt-1 mr-2' variant='success'><FontAwesomeIcon icon={faEye} /> 展示中</Badge>
                        :
                        <Badge pill className='bold mt-1 mr-2' variant='secondary'><FontAwesomeIcon icon={faEyeSlash} /> 隐藏中</Badge>
                    }
                    {props.featured &&
                        <Badge pill className='bold mt-1' variant='danger'><FontAwesomeIcon icon={faStarOfLife} color='gold' /> 主打商品</Badge>
                    }
                </Card.Body>
            </Card>
        </Col>
    );
}

export default ProductCard;
