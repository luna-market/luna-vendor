import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import {Auth0Provider} from "@auth0/auth0-react";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import { AUTH_TOKEN } from './constants';

console.log(process.env.SERVER_URL)

const httpLink = createHttpLink({
  uri: 'https://luna-backend-aozd9.ondigitalocean.app/'
  // uri: 'http://localhost:4000/'
  // uri: process.env.SERVER_URL
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <Auth0Provider 
    domain="lunamkt.us.auth0.com"
    clientId="hHU2ghNC2n9yG77WMhZe8hWNAMq8r5z8"
    redirectUri={window.location.origin}
  >
    <ApolloProvider client={client}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </ApolloProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
