import React,{ useEffect,useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Toast } from 'antd-mobile'
import { StarFill } from 'antd-mobile-icons'
import { requestHouseDetail, requestGetStarList } from '../../apis/request.js'
import { getHouseDetailAction } from '../../redux/actions'
import MyNavBar from '../../componenets/MyNavBar'
import './index.css'

export default connect(
  state => ({
    historyList: state.historyList,
    userToken: state.userToken
  }),{
    getHouseDetailAction
  }
)(
  function FootPrint(props) {

    const [starList, setStarList] = useState([])
    const navigate = useNavigate()

    // 利用用戶token獲取收藏列表
    useEffect(()=>{
      async function initStarList(){
        const {data} = await requestGetStarList(props.userToken.token)
        if(data.status === 200){
          setStarList(data.body)
        }else if(data.status === 400){
        // 防止因為長時間登錄 token失效後渲染錯誤
          Toast.show({
            content: 'token已過期 請重新登錄',
            icon: 'fail'
          })
        }
      }
      initStarList()
    },[])

    // 前往房屋詳情
    async function handleClick(e){
      // 獲取房屋詳情信息 需傳遞房屋code值參數
      const {data: {body}} = await requestHouseDetail(e.currentTarget.getAttribute('value'))
      // 向redux傳房屋具體參數
      props.getHouseDetailAction(body)
      navigate('/housedetail')
    }

    // 獲取className
    function getClassName(item){
      if(props.userToken.token){
        if(starList.some(starItem => {return starItem.houseCode === item.houseCode})){
          return true
        }else{
          return false
        }  
      }else{
        return false
      }
    }

    return (
      <div className='footPrint'>
        <MyNavBar title={'足跡'}/>

        <div className="footPrint_body">
          {
            props.historyList.length === 0? <h3 className='empty'>目前還沒有足跡, 去<Link to='/houselist'>找找房子</Link>吧</h3> : 
            props.historyList.map((item,index) => {
              return (
                <div className={ getClassName(item) ? "houseList_item star" : "houseList_item"}
                key={ index } 
                value={ item.houseCode } 
                onClick={(e)=>{handleClick(e)}}
                >
                  { 
                  getClassName(item) ? 
                  <span style={{ position: 'absolute', top: '-10px', left: '-10px' }}><StarFill fontSize={16} color='#F5C914' /></span> : null 
                  }
                  <div className="houseList_item_left">
                    <img src={`http://localhost:8080${ item.houseImg[0] }`} alt="" />
                  </div>
                  <div className="houseList_item_right">
                    <h4 className="title">{ item.title }</h4>
                    <div className="description">{ item.desc }</div>
                    <span className="tags">{ item.tags.map((tag, index) => <span key={index} className='tag'>{tag}</span> ) }</span> 
                    <div className="price">{ item.price } 元/月</div>
                    <div className="footPrint">您在{ item.date }查看過該房源</div>
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
