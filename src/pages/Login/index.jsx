import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import MyNavBar from '../../componenets/MyNavBar'
import { requestLogin } from '../../apis/request.js'
import { MyText, MyPassWord, MySubmit } from '../../componenets/Input'
import { getUserTokenAction } from '../../redux/actions'
import './index.css'

export default connect(
  state => ({userToken: state.userToken}),
  { getUserTokenAction }
)(
  function Login(props) {
    const [ user, setUser ] = useState('')
    const [ pwd, setPwd ] = useState('')
    const navigate = useNavigate()
  
    function handleSubmit(e){
      // 若帳密為空 提示用戶並阻止遞交
      if(user.trim() === '' || pwd.trim() === ''){
        e.preventDefault()
        alert('用戶名或密碼不能為空')
      // 若輸入不為空 則發送登錄請求
      }else{
        e.preventDefault()
        login()
      }
    }
  
    async function login(){
      const {data} = await requestLogin(user,pwd)
      console.log(data);
      // 提示用戶登錄情況 並將用戶token存在redux
      if(data.status === 200){
        Toast.show({ icon:'success', content: '登錄成功' })
        // 傳對象回redux
        props.getUserTokenAction(data.body)
        setTimeout(()=>{ navigate(-1) },1000)
      }else Toast.show({ icon:'fail', content: '帳號或密碼異常' }); 
    }
  
    function saveText(value){
      setUser(value)
    }
    function savePwd(value){
      setPwd(value)
    }
  
  
    return (
      <div className='login'>
        <MyNavBar title={'帳號登錄'}/>

        {/* 帳號輸入 */}
        <div className="login_box">
          <form action="javascript;:" onSubmit={(e)=>{handleSubmit(e)}}>
            {/* saveText 接收 type為text的收據 */}
            <MyText placeholder={'請輸出用戶名 user1'} saveText={saveText}/>
            <MyPassWord placeholder={'請輸入密碼 user1'} savePwd={savePwd} />
            <MySubmit value={'登錄'}/>
          </form>
        </div>
        
        <div className="goToSignUp">
        <Link to='/register'>沒有帳號？ 去註冊～</Link>
        </div>
      </div>
    )
  }
)

