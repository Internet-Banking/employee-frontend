import React from 'react'
import styled from 'styled-components'
import {Layout as antdLayout} from 'antd'
import Header from './Header'
import Sider from './Sider'
import 'antd/dist/antd.css' // from antd

const Wrapper = styled.section`
  height: 100vh;
`

const {Content} = antdLayout

const Layout = ({children}) => {
  return (
    <Wrapper>
      <Header/>
      <Content style={{margin: '0 16px'}}>
        {children}
      </Content>
      <Sider/>
    </Wrapper>
  )
}

export default Layout
