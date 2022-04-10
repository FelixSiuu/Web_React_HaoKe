import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Modal, Toast } from 'antd-mobile'
import { StarOutline, BillOutline, ClockCircleOutline, ReceiptOutline, UserSetOutline, SmileOutline } from 'antd-mobile-icons'
import { connect } from 'react-redux'
import Footer from '../../componenets/Footer'
import LoginTips from '../../componenets/LoginTips';
import bg_src from '../../assets/images/user_bg_image.png'
import avator_src from '../../assets/images/user_avator.png'
import banner_src from '../../assets/images/user_banner.jpeg'
import { getUserTokenAction, getUserInfoAction } from '../../redux/actions'
import { requestGetUserInfo, requestLogOut } from '../../apis/request.js'
import './index.css'

export default connect(
  state => ({
    userToken: state.userToken,
    userInfo: state.userInfo
  }),
  {getUserTokenAction,
    getUserInfoAction}
)(
  function User(props) {
    const [userTabs] = useState([
      { title: '我的收藏', icon: <StarOutline />, pathName: '/star' },
      { title: '我的出租', icon: <BillOutline />, pathName: '/myrent' },
      { title: '足跡', icon: <ClockCircleOutline />, pathName: '/footprint' },
      { title: '成為房主', icon: <ReceiptOutline />, pathName: '/sell' },
      { title: '個人資料', icon: <UserSetOutline />, pathName: '/profile' },
      { title: '聯繫我們', icon: <SmileOutline />, pathName: '/contact' }
    ])
    const navigate = useNavigate()

    // 利用token 獲取用戶信息 並儲存在redux裡
    useEffect(()=>{
      if(props.userToken.token){
        async function initUserInfo(){
          const {data} = await requestGetUserInfo(props.userToken.token)
          if(data.status === 200){
            props.getUserInfoAction(data.body)
          }else if(data.status === 400){
            // 防止因為長時間登錄 token失效後渲染錯誤 自動退出登錄
            Toast.show({
              content: 'token已過期 請重新登錄',
              icon: 'fail'
            })
          }
        }
        initUserInfo()
      }
    },[])

    // 退出登錄
    async function logOut(){
      const {data} = await requestLogOut(props.userToken.token)
      // 發送請求取消登錄
      props.getUserTokenAction({})
      console.log(data);
    }

    // 去登錄頁面
    function logIn(){
      navigate('/login')
    }

    // 是否登錄 調用函數時傳入pathName
    function isLogin(pathName){
      if(props.userToken.token){
        navigate(pathName)
      } else showLoginTips()
    }

    // 登錄提示
    async function showLoginTips(){
      const result = await Modal.confirm({
        content: <LoginTips/>
      })
      if (result) {
        navigate('/login')
      } else {
        Toast.show({ content: '取消登錄', position: 'bottom' })
      }
    }
    
  
    return (
      <div className='user'>
  
        {/* 背景圖 */}
        <div className="user_bg_image">
          <img src={bg_src} alt="" style={{width: '100%', height: '100%', verticalAlign: 'bottom'}}/>
        </div>
  
        {/* 個人信息框 */}
        <div className="user_card">
          {/* 頭像 */}
          <div style={{height: '60px'}}>
            <div className="user_avator">
              <img src={props.userToken.token? `http://localhost:8080${props.userInfo.avatar}` : avator_src} alt="" />
            </div>
          </div>
          {/* 名字 */}
          <div className="user_name">你好， {props.userToken.token ? props.userInfo.nickname : '遊客'}</div>
          <Button 
            color='primary' 
            className='handleButton' 
            onClick={props.userToken.token? logOut : logIn}>
            {props.userToken.token? '退出登錄' : '登錄'}
          </Button>
          <div className="editProfile" onClick={()=>{ isLogin('/profile' )}}>編輯個人資料</div>
        </div>
  
        {/* 標籤 */}
        <div className="user_tabs">
          { 
            userTabs.map((item,index) => {
              return (
                <div className="tab_item" key={index} onClick={()=>{isLogin(item.pathName)}}>
                  <div className='tab_icon'>{ item.icon }</div>
                  <div className='tab_title'>{ item.title }</div>
                </div>
              )
            }) 
          }
        </div>
  
        {/* banner */}
        <div className="banner">
          <img src={banner_src} alt="" />
        </div>
  
        <Footer />
      </div>
    )
  }
)

