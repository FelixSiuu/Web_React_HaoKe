import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toast } from 'antd-mobile'
import { StarFill } from 'antd-mobile-icons'
import { connect } from 'react-redux'
import { requestGetStarList, requestHouseDetail } from '../../apis/request.js'
import { getHouseDetailAction } from '../../redux/actions'
import MyNavBar from '../../componenets/MyNavBar'
import './index.css'

export default connect(
  state => ({userToken: state.userToken}),
  {getHouseDetailAction}
)(
  function Star(props) {

    const [ starList, setStarList ] = useState([])
    const navigate = useNavigate()
    
    // 初始化收藏列表
    useEffect(()=>{
      async function initStarList(){
        const {data} = await requestGetStarList(props.userToken.token)
        if(data.status === 200){
          setStarList(data.body)
        }else Toast.show({ content: '獲取收藏列表失敗', icon: 'fail' })
      }
      initStarList()
    },[])

    // 獲取className
    function getClassName(item){
      if(starList.some(starItem => {return starItem.houseCode === item.houseCode})){
        return true
      }else{
        return false
      }
    }

    // 前往房屋詳情
    async function handleClick(e){
      // 獲取房屋詳情信息 需傳遞房屋code值參數
      const {data: {body}} = await requestHouseDetail(e.currentTarget.getAttribute('value'))
      // 向redux傳房屋具體參數
      props.getHouseDetailAction(body)
      navigate('/housedetail')
    }


    return (
      <div>
        <MyNavBar title={'我的收藏'}/>

        <div className='star_list'>
          {/* 收藏列表 */}
          { starList.length=== 0 ? <h3 className='noResult'>冇收藏過任何嘢</h3> : 
            starList.map(item => {
              return (
                // "houseList_item star"
                <div className={ getClassName(item) ? "houseList_item star" : "houseList_item"}
                key={ item.houseCode } 
                value={ item.houseCode } 
                onClick={(e)=>{handleClick(e)}}
                >
                  { 
                  getClassName(item) ? 
                  <span style={{ position: 'absolute', top: '-10px', left: '-10px' }}><StarFill fontSize={16} color='#F5C914' /></span> : null 
                  }
                  <div className="houseList_item_left">
                    <img src={`http://localhost:8080${ item.houseImg }`} alt="" />
                  </div>
                  <div className="houseList_item_right">
                    <h4 className="title">{ item.title }</h4>
                    <div className="description">{ item.desc }</div>
                    <span className="tags">{ item.tags.map((tag, index) => <span key={index} className='tag'>{tag}</span> ) }</span> 
                    <div className="price">{ item.price } 元/月</div>
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

