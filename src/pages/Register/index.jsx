import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MyNavBar from '../../componenets/MyNavBar'
import { MyText, MyPassWord, MySubmit } from '../../componenets/Input'
import { requestRegister } from '../../apis/request.js'
import './index.css'
import { Toast } from 'antd-mobile'

export default function Register() {
  const [ user, setUser ] = useState('')
  const [ pwd, setPwd ] = useState('')
  const navigate = useNavigate()

  function saveText(text){
    setUser(text)
  }

  function savePwd(pwd){
    setPwd(pwd)
  }

  async function initRegister(){
    const {data} = await requestRegister(user,pwd)
    console.log(data);
    if(data.status === 400){
      Toast.show({
        icon: 'fail',
        content: '該用戶名已存在'
      })
    }else if(data.status === 200){
      Toast.show({
        icon: 'success',
        content: '帳號創建成功'
      })
      setTimeout(()=>{navigate(-1)},1000)
    }
  }

  // 提交註冊資料
  function handleSubmit(e){
    e.preventDefault()
    initRegister()
  }

  return (
    <div className='register'>
      <MyNavBar title={'註冊'}/>

      <div className="register_box">
        <div className="title">簡單註冊兩步驟~</div>
        <form action="javascript;:" onSubmit={ handleSubmit }>
          <MyText placeholder={'請輸入你的用戶名'} saveText={ saveText }/>
          <MyPassWord placeholder={'請輸入你的密碼'} savePwd={ savePwd }/>
          <MySubmit value={'註冊'}/>
        </form>
      </div>
    </div>
  )
}

