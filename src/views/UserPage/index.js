import React from 'react'
import {Button, message, Table, Tooltip} from 'antd'
import styled from 'styled-components'
import CreateUserModal from './CreateUserModal'
import NewUserModal from './NewUserModal'
import ChargeModal from './ChargeModal'
import {PlusSquareOutlined, PlusOutlined} from '@ant-design/icons'
import {api} from '../../services'
import {useSelector} from 'react-redux'

const Wrapper = styled.main`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  margin-left: 70px;
  position: absolute;
  z-index: 1000;
`

const UserPage = () => {
  const token = useSelector(state => state.employee.token)
  const [data, setData] = React.useState([])
  const [createUserModalVisibility, setCreateUserModalVisibility] = React.useState(false)
  const [newUserModalVisibility, setNewUserModalVisibility] = React.useState(false)
  const [chargeModalVisibility, setChargeModalVisibility] = React.useState(false)
  const [newUserInfo, setNewUserInfo] = React.useState({
    username: '',
    password: '',
    name: '',
    email: '',
    phone: '',
    paymentAccount: {
      id: ''
    }
  })
  const [selectedUserId, setSelectedUserId] = React.useState(0)

  React.useEffect(() => {
    const getData = async () => {
      const {data} = await api.get('user', undefined, token)
      setData(data.payload)
    }
    getData()
  }, [token])

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center'
    },
    {
      title: 'Full name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      // eslint-disable-next-line react/no-multi-comp
      render: (id) =>
        <Tooltip placement='rightTop' title='Charge user account'>
          <Button
            type='primary'
            onClick={() => openChargeModal(id)}
            shape='circle'
            icon={<PlusSquareOutlined />}
            size={10}
          />
        </Tooltip>
    }
  ]

  const submitCreateModal = async (values) => {
    const result = await api.post('user', values, token)
    if (result.isSuccess) {
      message.success('Create user successfully!')
      setNewUserInfo(result.data.payload)
      setCreateUserModalVisibility(false)
      setNewUserModalVisibility(true)
    }
    else {
      message.error(result.error.message)
    }
  }

  const submitChargeModal = async (values) => {
    const {accountId, amount} = values
    const result = await api.patch(`account/${accountId}/charge`, {amount}, token)
    if (result.isSuccess) {
      message.success('Charge account successfully!')
      setChargeModalVisibility(false)
    }
    else {
      message.error(result.error.message)
    }
  }

  const openCreateModal = () => {
    setCreateUserModalVisibility(true)
  }
  
  const openChargeModal = (userId) => {
    setSelectedUserId(userId)
    setChargeModalVisibility(true)
  }
  
  const closeChargeModal = () => {
    setChargeModalVisibility(false)
  }

  const closeCreateModal = () => {
    setCreateUserModalVisibility(false)
  }

  const closeNewUserModal = () => {
    setNewUserModalVisibility(false)
  }

  return (
    <Wrapper>
      <br/>
      <Button onClick={() => openCreateModal()} icon={<PlusOutlined />} type='primary'>
        Create User
      </Button>
      <br/>
      <Table dataSource={data} pagination={false} columns={columns} />
      <CreateUserModal
        visible={createUserModalVisibility}
        handleCancel={closeCreateModal}
        handleSubmit={submitCreateModal}
      />
      <NewUserModal
        visible={newUserModalVisibility}
        handleCancel={closeNewUserModal}
        userInfo={newUserInfo}
      />
      <ChargeModal
        visible={chargeModalVisibility}
        handleCancel={closeChargeModal}
        handleSubmit={submitChargeModal}
        userId={selectedUserId}
      />
    </Wrapper>
  )
}

export default UserPage
