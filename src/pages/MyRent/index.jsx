import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { Modal, Toast } from 'antd-mobile'
import { requestRentList, requestHouseDetail } from '../../apis/request.js'
import { getHouseDetailAction } from '../../redux/actions'
import { requestRefteshList } from '../../apis/request.js'
import MyNavBar from '../../componenets/MyNavBar'
import './index.css'

export default connect(
  state => ({
    userToken: state.userToken
  }),
  {getHouseDetailAction}
)(
  function MyRent(props) {

    const [rentList, setRentList] = useState([])
    const [houseCode, setHouseCode] = useState('')
    const [isDelete, setIsDelete] = useState(false)
    const navigate = useNavigate()
  
    // 初始化出租列表
    async function initRentList(){
      const {data} = await requestRentList(props.userToken.token)
      if(data.status === 200){
        setRentList(data.body)
      }
    }

    // 更新出租列表
    async function refreshList(){
      const {data} = await requestRefteshList(houseCode,isDelete,props.userToken.token)
      if(data.status === 200){
        initRentList()
        Toast.show({ content: '刪除成功', position: 'bottom' })
      }
    }

    useEffect(()=>{
      initRentList()
    },[])

    // 前往房屋詳情
    async function handleClick(e){
      // 獲取房屋詳情信息 需傳遞房屋code值參數
      const {data: {body}} = await requestHouseDetail(e.currentTarget.getAttribute('value'))
      // 向redux傳房屋具體參數
      props.getHouseDetailAction(body)
      navigate('/housedetail')
    }

    // 點擊刪除按鈕
    async function handleDelete(e){
      // 阻止事件冒泡
      e.stopPropagation();
      // 點擊按鈕時就設置houseCode值
      setHouseCode(e.currentTarget.getAttribute('value'))
      const result = await Modal.confirm({
        content: '是否確認刪除該房源？',
      })
      if (result) {
        // 傳true 刪除
        setIsDelete(true)
        refreshList()
      }
    }

    return (
      <div className='myrent'>
        <MyNavBar title={'我的出租'}/>
  
        <div className="myrent_body">
        {
          rentList.length === 0? <h3 className='gotosell'>目前還沒有出租的房間, 去<Link to='/sell'>發布房源</Link>吧</h3> : 
          rentList.map(item => {
            return (
              <div className="houseList_item"
              key={ item.houseCode } 
              value={ item.houseCode } 
              onClick={(e)=>{handleClick(e)}}
              >
              <div className="houseList_item_left">
                <img src={`http://localhost:8080${ item.houseImg }`} alt="" />
              </div>
              <div className="houseList_item_right">
                <h4 className="title">{ item.title }</h4>
                <div className="description">{ item.desc }</div>
                <span className="tags">{ item.tags.map((tag, index) => <span key={index} className='tag'>{tag}</span> ) }</span> 
                <div className="price">{ item.price } 元/月</div>
                <button className="delete_button" value={ item.houseCode } onClick={(e)=>{handleDelete(e)}}>刪除</button>
              </div>
            </div>  
            )
          })
        }
        </div>
      </div>
    )
  }  
)
