import React, {useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Input, Button, message} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import {submitLogin} from './actions'

const LoginForm = ({history}) => {
  const error = useSelector(state => state.error)
  const token = useSelector(state => state.employee.token)

  const dispatch = useDispatch()
  const onFinish = values => {
    dispatch(submitLogin(values))
  }

  // Effect when log in successfully
  useEffect(() => {
    token && history.replace('/')
  }, [token, history])

  // Handle message when error happens
  useEffect(() => {
    error && message.error(error)
  }, [error])

  return (
    <Form
      name='normal_login'
      className='login-form'
      initialValues={{
        remember: true
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name='email'
        rules={[
          {
            required: true,
            message: 'Please input your bank employee email!'
          }
        ]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Employee Email' />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your password!'
          }
        ]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}

export default withRouter(LoginForm)
