import React from 'react'
import {NavLink} from 'react-router-dom'
import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'

import './index.css'

export default function Footer() {
  const tabs = [
    {
      key: 'home',
      title: '首頁',
      icon: <AppOutline fontSize={20} />,
      pathName:'/home'

    },
    {
      key: 'todo',
      title: '找房',
      icon: <UnorderedListOutline fontSize={20} />,
      pathName:'/houselist'

    },
    {
      key: 'message',
      title: '資訊',
      icon: <MessageOutline fontSize={20} />,
      pathName:'/info'
    },
    {
      key: 'personalCenter',
      title: '個人中心',
      icon: <UserOutline fontSize={20}/>,
      pathName:'/user'
    },
  ]
  function computedClassName({isActive}){
    return isActive? 'myNavLink' : 'active'
  }
  return (
    <div className="tabBar">
      {
        tabs.map(item => {
          return (
            <div className="tabItem" key={item.key}>
              <NavLink className={computedClassName} to={item.pathName}>{item.icon}</NavLink>
              <NavLink className={computedClassName} to={item.pathName}>{item.title}</NavLink>
            </div>
          )
        })
      }
    </div>
  )
}
