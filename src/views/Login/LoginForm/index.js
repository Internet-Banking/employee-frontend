import React, {useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Input, Button, message} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import {submitLogin} from './actions'
import {GOOGLE_RECAPTCHA_CLIENT_KEY} from '../../../constants'
import ReCAPTCHA from 'react-google-recaptcha'

const LoginForm = ({history}) => {
  const error = useSelector(state => state.error)
  const token = useSelector(state => state.employee.token)
  const [recaptchaToken, setRecaptcha] = React.useState(null)

  const dispatch = useDispatch()
  const onFinish = values => {
    dispatch(submitLogin(values, recaptchaToken))
  }

  // Effect when log in successfully
  useEffect(() => {
    token && history.replace('/')
  }, [token, history])

  // Handle message when error happens
  useEffect(() => {
    error && message.error(error)
  }, [error])

  const onCaptchaChange = (value) => {
    setRecaptcha(value)
  }

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
      <ReCAPTCHA
        style={{marginBottom: '10px'}}
        sitekey={GOOGLE_RECAPTCHA_CLIENT_KEY}
        onChange={onCaptchaChange}
      />
      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}

export default withRouter(LoginForm)
