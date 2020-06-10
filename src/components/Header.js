import React from 'react'
import styled from 'styled-components'
import {useSelector, useDispatch} from 'react-redux'
import {BankOutlined, createFromIconfontCN} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import {api, auth} from '../services'
import {action} from '../utils'
import {ActionTypes} from '../constants'

const IconFont = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/font_1861426_5usavs3twno.js']
})

const Wrapper = styled.header`
  width: 100%;
  padding: 10px;
  background: #08979c;
  color: white;
`

const Title = styled.h1`
  font-size:25px;
  padding: 2.5px 0 0 100px;
  color: white;
  transform: translateY(10%);
`

const HomeIcon = styled.div`
  float: left;
  font-size: 40px;
  padding: 0 0 0 10px;
  justify-content: center;
  display: flex;
  transform: translateY(15%);
`

const EmployeePanel = styled.span`
  width: 30vh;
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(70%);
`

const onLogOut = () => {
  return action.create(ActionTypes.LOG_OUT, () => {
    auth.removeToken()
  })
}

const Header = () => {
  const token = useSelector(state => state.employee.token)
  const dispatch = useDispatch()
  const [employeeInfo, setEmployeeInfo] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      const result = await api.get('employee/me', undefined, token)
      if (result.isSuccess) {
        setEmployeeInfo(result.data.payload)
      }
    }
    getData()
  }, [token])

  const logOut = () => {
    dispatch(onLogOut())
  }

  return (
    <Wrapper>
      <Link to='/user'>
        <HomeIcon>
          <BankOutlined/>
        </HomeIcon>
        <Title>IBanking 29 employee Website</Title>
      </Link>
      <EmployeePanel>
        {employeeInfo ? employeeInfo.name : null}
        <IconFont
          onClick={logOut}
          style={{padding: '0 30px', fontSize: '25px', transform: 'translateY(20%)'}}
          type='icon-logout'/>
      </EmployeePanel>
    </Wrapper>
  )
}

export default Header
