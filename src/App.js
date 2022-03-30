import React from 'react'
import {Link,useRoutes} from 'react-router-dom'
import {routes} from './routes'
import { Button } from 'antd-mobile'

export default function App(){
  const element = useRoutes(routes)
    return (
      <div>
        <Button color= 'primary'>Login</Button>
        <Link to="/home">主頁</Link>
        <Link to="/citylist">城市選擇</Link>
        {element}
      </div>
    )
}
