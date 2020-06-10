import React from 'react'
import {Modal, Button, Form, Input} from 'antd'
import {UserOutlined, LockOutlined, MailOutlined} from '@ant-design/icons'

const CreateUserModal = ({
  visible, handleSubmit, handleCancel
}) => {
  return (
    <div>
      <Modal
        visible={visible}
        title='Create user'
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item
            name='username'
            rules={[
              {
                required: true,
                message: 'Please input username!'
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder='Username'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input user password!'
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              placeholder='Password'
            />
          </Form.Item>
          <Form.Item
            name='name'
            rules={[
              {
                required: true,
                message: 'Please input user name!'
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='User full name'
            />
          </Form.Item>
          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                message: 'Please input user email!'
              }
            ]}
          >
            <Input
              prefix={<MailOutlined className='site-form-item-icon' />}
              type='email'
              placeholder='User email' />
          </Form.Item>
          <Form.Item
            name='phone'
            rules={[
              {
                required: true,
                message: 'Please input user phone!'
              }
            ]}
          >
            <Input
              prefix={<MailOutlined className='site-form-item-icon' />}
              type='number'
              placeholder='User phone' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' >Submit</Button>&nbsp;&nbsp;
            <Button type='danger' onClick={handleCancel}>Close</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CreateUserModal
