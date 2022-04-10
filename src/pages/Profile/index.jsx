import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserInfoAction  } from '../../redux/actions'
import { EditFill } from 'antd-mobile-icons'
import MyNavBar from '../../componenets/MyNavBar'
import { MyText, MySubmit } from '../../componenets/Input'
import { requestEditProfile, requestGetUserInfo} from '../../apis/request.js'
import './index.css'
import { Toast } from 'antd-mobile'

export default connect(
  state => ({
    userToken: state.userToken,
    userInfo: state.userInfo
  }),{
    getUserInfoAction,
  }
)(
  function Profile(props) {
    const [ phone, setPhone ] = useState(123456)
    const [ nickName, setNickName ] = useState(props.userInfo.nickname)
    const navigate = useNavigate()

    // 用戶名
    function saveUserName(e){
      setNickName(e.trim())
    }

    // 電話
    function savePhone(e){
      if(isNaN(e.trim())){
        return setPhone('請輸入數字')
      }else{
        setPhone(e.trim())
      }
    }
  
    // 利用token 獲取新的用戶信息
    async function newUserInfo(){
      const {data:{body}} = await requestGetUserInfo(props.userToken.token)
      props.getUserInfoAction(body)
    }

    // 提交資料
    function handleSubmit(e){
      if(nickName === ''){
        e.preventDefault()
        Toast.show('用戶名不能為空')
      }else if(isNaN(phone)){
        e.preventDefault()
        Toast.show('請輸入數字')
      }else{
        e.preventDefault()
        editProfile()  
      }
    }

    // 發送請求修改數據 若成功再更新redux
    // avatar, gender, nickname, phone, access_token
    const { avatar, gender } = props.userInfo
    const { token } = props.userToken
    async function editProfile(){
      const {data} = await requestEditProfile(avatar, gender, nickName, phone, token)
      if(data.status === 200){
        newUserInfo()
        Toast.show({
          icon: 'success',
          content: '修改資料成功'
        })
        setTimeout(()=>{navigate(-1)},1000)
      }
    }

    return (
      <div className='profile'>
        <MyNavBar title={'個人資料'}/>
  
        <div className="profile_box">
          <div className="left">
            <form action="javascript;:" onSubmit={handleSubmit}>
              <label htmlFor="username"><h4>用戶名  {props.userInfo.nickname}</h4></label>
              <MyText id={'username'} saveText={saveUserName} placeholder={'請輸入新的用戶名'}/>
              <label htmlFor="phone"><h4>電話  {phone}</h4></label>
              <MyText id={'phone'} saveText={savePhone} placeholder={'請輸入新的手機號碼'}/>
              <MySubmit value={'提交並修改資料'}/>
            </form>
          </div>
          <div className="right">
            <img src={`http://localhost:8080${props.userInfo.avatar}`} alt="" />
          </div>
        </div>
      </div>
    )
  }  
)
