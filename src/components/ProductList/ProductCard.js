import React from "react";
import { Card, Col } from "react-bootstrap";

import { useHistory } from "react-router";

import "../../styles.css";

const ProductCard = (props) => {

    const history = useHistory();

    const cardOnClick = () => {

        /* change destination appropriate to vendor portal */
        history.push('/ProductPage/' + props.pid)
    }

    return (
        <Col className="featured-card-col mb-3" xs={6} sm={4} md={2}>
            <Card className="bg-transparent" style={{ width: "auto", border: "0" }} onClick={cardOnClick}>
                <Card.Img
                    className='rect'
                    variant="top"
                    src={props.img}
                />
                <Card.Body style={{ textAlign: "left", paddingLeft: 0 }}>
                    <Card.Title className='heading3 one-line'>
                        {props.title}
                    </Card.Title>
                    <Card.Text className='text'>
                        <span style={{ color: 'green', fontWeight: 'bold' }}>Free</span> <s style={{ color: 'grey' }}> ${props.msrp}</s>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default ProductCard;
