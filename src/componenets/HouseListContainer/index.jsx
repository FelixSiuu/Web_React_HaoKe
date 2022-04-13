import React,{ useState, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { Toast } from 'antd-mobile'
// import { InfiniteScroll } from 'antd-mobile'
import { StarFill } from 'antd-mobile-icons'
import { getHouseListAction, getHouseDetailAction } from '../../redux/actions'
import { requestHouseDetail, requestHouseList, requestGetStarList } from '../../apis/request.js'
import HouseFilter from '../HouseFilter'
import './index.css'

export default connect(
  state => ({
    area: state.area,
    houseList: state.houseList,
    userToken: state.userToken
  }),
  {
  getHouseListAction,
  getHouseDetailAction
  }
)(
  function HouseListContainer(props){
    // 返回對象獲取pathName
    const loacation = useLocation()
    const navigate = useNavigate()
    const [limit,setLimit] = useState(20)
    const [hasMore, setHasMore] = useState(true)
    const [starList, setStarList] = useState([])

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

    // 點擊查看更多決定路由跳轉
    function togglePathName(){
      switch(loacation.pathname){
        case '/houselist': return '/map'
        case '/map': return '/houselist'
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

    // 加載更多
    async function loadMore() {
       // 每次刷新讓list的上限值加10
       const newLimit = limit + 10
       setLimit(newLimit)
       const {data:{body:{list}}} = await requestHouseList(props.area.value,null,null,limit)
       // 將新list結果返回redux
       props.getHouseListAction(list)
       // 判斷是否再加載
       if(list.length === props.area.count){
        setHasMore(false)
       }
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
      <div>
        <div className='houseList'>
          {/* 頭部 */}
          <div className="houseList_head">
            <h3 className="left">房屋列表</h3>
            <Link to={togglePathName()}><h4 className="right">更多房源</h4></Link>
          </div>

          {/* 身體 */}
          {loacation.pathname==='/houselist' ? <HouseFilter/> : null}
          <div className="houseList_body">
          {
            // 先判斷是否有houseList
            props.houseList.length === 0 ? <h3 className="empty">暫無結果</h3> :
            props.houseList.map(item => {
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
          {/* 加載更多 */}
          {/* <InfiniteScroll loadMore={loadMore} hasMore={hasMore} /> */}
          </div>
        </div>
      </div>
    )
  }
)
