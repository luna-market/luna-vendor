import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import { AUTH_TOKEN, VENDOR_ID } from '../constants';

import { Card, Button, Container, Form } from "react-bootstrap";

const SIGNUP_MUTATION = gql`
    mutation Mutation(
        $email: String!
        $password: String!
        $wechat: String!
    ) {
        vendorSignup(
            email: $email
            password: $password
            wechat: $wechat
        ) {
            token
            vendor{
              id
            }
        }
    }
`

const LOGIN_MUTATION = gql`
    mutation Mutation(
        $email: String!
        $password: String!
    ) {
        vendorLogin(
            email: $email
            password: $password
        ) {
            token
            vendor{
              id
            }
        }
    }
`

const Auth = () => {
  const history = useHistory();
  const [formState, setFormState] = useState({
    login: true,
    wechat: '',
    password: '',
    name: '',
    error: ''
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password
    },
    onCompleted: ({ vendorLogin }) => {
      console.log("login is running")
      console.log(vendorLogin)
      localStorage.setItem(AUTH_TOKEN, vendorLogin.token);
      localStorage.setItem(VENDOR_ID, vendorLogin.vendor.id);
      history.push('/');
    },
    onError: (e) => {
      console.log(e.message)
      setFormState({
        ...formState,
        error: e.message
      })
    }
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      wechat: formState.wechat,
      email: formState.email,
      password: formState.password
    },
    onCompleted: ({ vendorSignup }) => {
      console.log("signup is running")
      console.log(vendorSignup)
      localStorage.setItem(AUTH_TOKEN, vendorSignup.token);
      localStorage.setItem(VENDOR_ID, vendorSignup.vendor.id);
      history.push('/');
    },
    onError: (e) => {
      console.log(e.message)
      setFormState({
        ...formState,
        error: e.message
      })
    }
  });

  return (
    <>
      <Container fluid style={{ maxWidth: '500px' }}>
        <Card className='mt-5' border='light'>
          <Card.Body>
            <Card.Title className="title">{login ? 'Login' : 'Sign Up'}</Card.Title>
            {!formState.login && (
              <Form.Group>
                <Form.Label className='label'>wechat</Form.Label>
                <Form.Control
                  value={formState.wechat}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      wechat: e.target.value
                    })
                  }
                  type="text"
                />
              </Form.Group>
            )}
            <Form.Group>
              <Form.Label className='label'>Email address</Form.Label>
              <Form.Control
                value={formState.email}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    email: e.target.value
                  })
                }
                type="text"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className='label'>Password</Form.Label>
              <Form.Control
                value={formState.password}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    password: e.target.value
                  })
                }
                type="password"
              />
            </Form.Group>
            <Form.Text className="text" style={{color:'red'}}>
              {formState.error}
            </Form.Text>

            <Button
              className='button' variant="warning" style={{ marginTop: 20, width: '100%' }}
              onClick={formState.login ? login : signup}
            >
              {formState.login ? 'login' : 'create account'}
            </Button>
            <Button
              className='button' variant="outline-dark" style={{ marginTop: 20, width: '100%' }}
              onClick={(e) =>
                setFormState({
                  ...formState,
                  login: !formState.login
                })
              }
            >
              {formState.login
                ? 'Create account'
                : 'Log in'}
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Auth;