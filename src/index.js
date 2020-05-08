import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import "antd/dist/antd.css"
import { ApolloProvider } from "@apollo/react-hooks"
import client from "./graphql/client"
import { BrowserRouter as Router } from "react-router-dom"
import * as serviceWorker from "./serviceWorker"
import PostsProvider from "./context/postsContext"

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <PostsProvider>
        <Router>
          <App />
        </Router>
      </PostsProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
