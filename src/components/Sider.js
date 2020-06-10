import React, {useState} from 'react'
import {Layout, Menu} from 'antd'
import {TeamOutlined, AreaChartOutlined} from '@ant-design/icons'

const {Sider: AntdSider} = Layout

const Sider = () => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <AntdSider style={{minHeight: '100%', float: 'left', marginRight: '20px'}}
      collapsible collapsed={isCollapsed}
      onCollapse={() => setIsCollapsed(!isCollapsed)}>
      <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
        <Menu.Item key='1' icon={<TeamOutlined />}>
          Manage Employees
        </Menu.Item>
        <Menu.Item key='2' icon={<AreaChartOutlined />}>
          Transactions
        </Menu.Item>
      </Menu>
    </AntdSider>
  )
}

export default Sider
