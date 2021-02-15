import React, { useState } from "react";
import "./Navigation.css";
import "../../styles.css";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useHistory } from 'react-router';
import { AUTH_TOKEN } from '../../constants'

function Navigation(props) {
  const history = useHistory()



  return (
    <Navbar collapseOnSelect expand="lg" className="color-nav" sticky="top">
      <Navbar.Brand color="white" href="/" >
        LUNA<span className='title yellow'>&nbsp; Vendor</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="justify-content-end" style={{ width: "100%" }}>
          {
            props.loggedIn ? (
              <>
                <Nav.Item>
                  <Nav.Link className="heading1 white mr-3" href="/orders">
                    订单
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="mr-3 heading1 white" href="/products">
                    商品
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="mr-4 heading1 white" href="/profile">
                    我的账号
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Button className="button" variant='outline-warning' onClick={() => {
                    console.log("USER LOG OUT")
                    localStorage.removeItem(AUTH_TOKEN)
                    props.setLoggedIn(false)
                    history.push(`/auth`)
                  }}>
                    退出登录
                  </Button>
                </Nav.Item>
              </>
            ) : (
                <Nav.Item>
                </Nav.Item>
              )
          }
          {/* {navitems() /* temp */}
        </Nav>
      </Navbar.Collapse>
    </Navbar >
  )
}

export default Navigation;
