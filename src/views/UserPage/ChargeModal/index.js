import React from 'react'
import {Modal, Button, Form, Input} from 'antd'
import {api} from '../../../services'
import {message, Select} from 'antd'
import {useSelector} from 'react-redux'

const ChargeModal = ({
  visible, handleSubmit, handleCancel, userId
}) => {
  const token = useSelector(state => state.employee.token)
  const [accountList, setAccountList] = React.useState([])
  React.useEffect(() => {
    const getData = async () => {
      const result = await api.get(`user/${userId}/account`, undefined, token)
      if (result.isSuccess) {
        setAccountList(result.data.payload)
      }
      else {
        message.error(result.error.message)
      }
    }
    getData()
  }, [token, userId])

  return (
    <div>
      <Modal
        visible={visible}
        title='Charge user account'
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item
            name='accountId'
            rules={[
              {
                required: true,
                message: 'Please select account ID!'
              }
            ]}
          >
            {accountList
              ? <Select
                placeholder='Select account ID'>
                {accountList.map(
                  (account, index) =>
                    <Select.Option key={index} value={account.id}>{account.id}</Select.Option>
                )}
              </Select> : null}
          </Form.Item>
          <Form.Item
            name='amount'
            rules={[
              {
                required: true,
                message: 'Please input amount!'
              }
            ]}
          >
            <Input
              type='number'
              placeholder='Charge amount'
            />
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

export default ChargeModal
