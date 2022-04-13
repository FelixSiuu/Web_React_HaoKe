import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Picker, Selector, Toast } from 'antd-mobile'
import { DownOutline } from 'antd-mobile-icons'
import { connect } from 'react-redux'
import MyNavBar from '../../componenets/MyNavBar'
import { MyText } from '../../componenets/Input'
import { requestGetCommunity, requestSell } from '../../apis/request.js'
import { roomTypeColumns, orientedColumns } from './columns.js'
import { supportingOptions } from './option.js'
import './index.css'

export default connect(
  state => ({
    cityInfo: state.cityInfo,
    userToken: state.userToken
  })
)(
  function Sell(props) {

    const [show, setShow] = useState(false)
    const [roomVisible, setRoomVisible] = useState(false)
    const [orientedVisible, setOrientedVisible] = useState(false)
    const [communityItem, setCommunityItem] = useState([])
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [size, setSize] = useState('')
    const [floor, setFloor] = useState('')
    const [communityValue, setCommunityValue] = useState('')
    const [communityName, setCommunityName] = useState('')
    const [roomTypeValue, setRoomTypeValue] = useState('')
    const [roomTypeName, setRoomTypeName] = useState('')
    const [orientedValue, setOrientedValue] = useState('')
    const [orientedName, setOrientedName] = useState('')
    const [supporting, setSupporting] = useState('')
    const [desc, setDesc] = useState('')
    const [houseImg, setHouseImg] = useState('img1|im2|img3')

    const navigate = useNavigate()
  
    // 發布房源
    async function sellHouseRequest(){
      const {token} = props.userToken
      const {data} = await requestSell(title, desc, houseImg, orientedValue, supporting, price, roomTypeValue, size, floor, communityValue, token)
      if(data.status === 200){
        Toast.show({icon: 'success', content: '成功發布'})
        setTimeout(()=>{navigate('/user')},1000)
      }else{
        Toast.show({icon: 'fail', content: '數據錯誤，發布失敗'})
      }
    }

    // 獲取小區列表
    useEffect(()=>{
      async function initCommunity(){
        const {data:{body}} = await requestGetCommunity(props.cityInfo.label, props.cityInfo.value)
        setCommunityItem(body)
       }   
       initCommunity()
    },[])

    function saveText(e){
      setTitle(e)
    }
    function savePrice(e){
      if(isNaN(e * 1)){
        setPrice('')
        Toast.show('請輸入數字')
      }else{
        setPrice(e)
      }
    }
    function saveSize(e){
      if(isNaN(e * 1)){
        setSize('')
        Toast.show('請輸入數字')
      }else{
        setSize(e)
      }
    }
    function saveFloor(e){
      if(isNaN(e * 1)){
        setFloor('')
      }else{
        if(e !== '1' || e !== '2' || e !== '3') Toast.show('樓層只能是1/2/3')
        else setFloor('FLOOR|'+ e)
      }
    }
    function saveCommunity(item){
      setShow(!show)
      setCommunityName(item.communityName)
      setCommunityValue(item.community)
    }
    function saveRoomType(val,extend){
      setRoomTypeName(extend.items[0].label)
      setRoomTypeValue(extend.items[0].value)
    }
    function saveOriented(val,extend){
      setOrientedName(extend.items[0].label)
      setOrientedValue(extend.items[0].value)
    }
    function saveSupporting(arr){
      setSupporting(arr.join('|'))
    }
    function saveDesc(e){
      setDesc(e.target.value)
    }
  
  
    return (
      <div>
        <MyNavBar title={'發布房源'}/>
  
        <div className="sell">
          <h3 className="sell_head">房屋信息</h3>
  
          <div className="sell_body">
            <div className="title">
              <MyText placeholder={'請輸入一個閃令令的標題' } saveText={saveText}/>
            </div>
  
            <div className='price'>
              <div className="item_name">租&nbsp;&nbsp;&nbsp;&nbsp;金</div>
              <MyText placeholder={'請輸入租金'} saveText={savePrice}/>
              <span>$/月</span>
            </div>
  
            <div className="size">
              <div className="item_name">建築面積</div>
              <MyText placeholder={'請輸入建築面積'} saveText={saveSize}/>
              <span>平方米</span>
            </div>

            <div className="floor">
              <div className="item_name">樓&nbsp;&nbsp;&nbsp;&nbsp;層</div>
              <MyText placeholder={'請輸入樓層數'} saveText={saveFloor}/>
              <span>樓</span>            
            </div>
            
            <div className="commiunity">
              <div className="item_name">小區名稱</div>
              <div className="content">{communityName === '' ? '小區 - 未選擇' : communityName}</div>
              <span onClick={()=>{setShow(!show)}}><Button color='primary' fill='outline'>請選擇</Button></span> 
            </div>
  
            {/* select 懸浮窗*/}
            <div className="selectCommunity" style={show? {height: '90%'} : {height: '0%'}}>
              <div className="head">
                <h3 className="left">{props.cityInfo.label}</h3>
                <div className="close" onClick={()=>{setShow(!show)}}></div>
                <div className="right"><Link to="/citylist">切換城市 <DownOutline /></Link></div>
              </div>
              <div className="list">
                {
                  communityItem.map((item,index) => {
                    return (
                      <div className='community_item' key={index} onClick={()=>{saveCommunity(item)}}>{item.communityName}</div>
                    )
                  })
                }
              </div>
            </div>
    
            <div className="roomType">
              <div className="item_name">戶&nbsp;&nbsp;&nbsp;&nbsp;型</div>
              <div className="content">{roomTypeName === '' ? '戶型 - 未選擇' : roomTypeName}</div>
              <span><Button color='primary' fill='outline' onClick={() => {setRoomVisible(true)}}>請選擇</Button></span>
              <Picker
                columns={roomTypeColumns}
                visible={roomVisible}
                onClose={() => {
                  setRoomVisible(false)
                }}
                onConfirm={(val, extend) => {
                  saveRoomType(val,extend)
                }}
              />
            </div>
  
            <div className="oriented">
              <div className="item_name">朝&nbsp;&nbsp;&nbsp;&nbsp;向</div>
              <div className="content">{orientedName === '' ? '方位 - 未選擇' : orientedName}</div>
              <span><Button color='primary' fill='outline' onClick={() => {setOrientedVisible(true)}}>請選擇</Button></span>
              <Picker
                columns={orientedColumns}
                visible={orientedVisible}
                onClose={() => {
                  setOrientedVisible(false)
                }}
                onConfirm={(val, extend) => {
                  saveOriented(val,extend)
                }}
              />
            </div>
  
            <div className="supporting">
              <div className="item_name">房屋配套</div>
              <Selector
                options={supportingOptions}
                multiple={true}
                onChange={arr => saveSupporting(arr)}
              />
            </div>
  
            <div className="houseImg_head">
              <div className="item_name">實物圖</div>
              <div className='files'><input type="file" id="file" name="file" multiple accept="image/*"/></div>
            </div>
            <div className="houseImg_body">
              
            </div>
  
            <div className="description">
              <div className="desc_name">房屋描述</div>
              <div className="desc_box">
                <textarea rows="7" placeholder='請簡單描述下您的房屋' onChange={(e)=>{saveDesc(e)}}></textarea>
              </div>
            </div>
          </div>
  
          <Button block color='primary' size='large' onClick={()=>{sellHouseRequest()}}>发布房源</Button>
        </div>
      </div>
    )
  }  
)