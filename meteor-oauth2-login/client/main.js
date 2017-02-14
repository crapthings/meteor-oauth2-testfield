import queryString from 'query-string'

import React from 'react'
import { render as Render } from 'react-dom'
import { mount as Mount } from 'react-mounter'

const oauthConfig = {
  redirect_uri: 'http://localhost:3000/auth',
  response_type: 'code',
  client_id: 'abc123',
  scope: 'offline_access',
}

const oauthConfigString = queryString.stringify(oauthConfig)

const loginUrl = `https://localhost:4000/dialog/authorize?${oauthConfigString}`
const tokenUrl = `https://localhost:4000/oauth/token`

const Layout = ({main}) => <div>
  {main()}
</div>

const LoginComponent = () => <div>
  <h1>hello kitty</h1>
  <a href={loginUrl}>login with oauth</a>
</div>

const AuthComponent = (params, queryParams) => () => <div>loading</div>

FlowRouter.route('/', {
  action() {
    const main = LoginComponent
    Mount(Layout, { main })
  }
})

FlowRouter.route('/auth', {
  action(params, queryParams) {
    const data = {
      code: queryParams.code,
      redirect_uri: 'http://localhost:3000/auth',
      client_id: 'abc123',
      client_secret: 'ssh-secret',
      grant_type: 'authorization_code',
    }

    $.post(tokenUrl, data, resp => {
      console.log(resp)
      if (resp) {
        FlowRouter.go('/')
      }
    })
    // const main = AuthComponent(params, queryParams)
    // Mount(Layout, { main })
  }
})
