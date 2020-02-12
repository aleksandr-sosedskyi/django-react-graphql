import React from 'react';
import HomePage from './pages/Home/index';
import {Route, Switch, BrowserRouter} from "react-router-dom";
import {ApolloProvider} from "@apollo/react-hooks";
import ApolloClient from "apollo-client";
import {GOALS} from "./constants/routes";
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"


const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql",
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <Route exact path={GOALS} component={ HomePage } />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;