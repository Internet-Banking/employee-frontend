import React from 'react'
import {Modal, Button} from 'antd'

const NewUserModal = ({
  visible, handleCancel, userInfo
}) => {
  return (
    <div>
      <Modal
        visible={visible}
        title='New user information'
        onCancel={handleCancel}
        footer={null}
      >
        Username: <b>{userInfo.username}</b><br/>
        Name: <b>{userInfo.name}</b><br/>
        Email: <b>{userInfo.email}</b><br/>
        Phone: <b>{userInfo.phone}</b><br/>
        Payment Account ID: <b>{userInfo.paymentAccount.id}</b><br/><br/>
        <Button type='danger' onClick={handleCancel}>Close</Button>
      </Modal>
    </div>
  )
}

export default NewUserModal
