import React from 'react'
import {Button, message} from 'antd'
import styled from 'styled-components'
import CreateUserModal from './CreateUserModal'
import NewUserModal from './NewUserModal'
import {PlusOutlined} from '@ant-design/icons'
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
  const [createUserModalVisibility, setCreateUserModalVisibility] = React.useState(false)
  const [newUserModalVisibility, setNewUserModalVisibility] = React.useState(false)
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

  const openCreateModal = () => {
    setCreateUserModalVisibility(true)
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
    </Wrapper>
  )
}

export default UserPage
