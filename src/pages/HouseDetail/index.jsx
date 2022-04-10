import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { StarFill, StarOutline, CheckOutline } from 'antd-mobile-icons'
import { Swiper, Modal, Toast } from 'antd-mobile'
import { Map, APILoader, Marker } from '@uiw/react-amap';
// import { getHouseListAction, getHouseDetailAction } from '../../redux/actions'
import MyNavBar from '../../componenets/MyNavBar'
import LoginTips from '../../componenets/LoginTips';
import { requestAddStar, requestIsStar, requestDeleteStar } from '../../apis/request.js'
import './index.css'

export default connect(
  state => ({
    houseDetail: state.houseDetail,
    userToken: state.userToken,
  }),
  {}
)(
  function HouseDetail(props) {
    const [isStar, setIsStar] = useState()
    const {houseImg} = props.houseDetail
    const navigate = useNavigate()

    // 查看是否收藏
    useEffect(()=>{
      if(props.userToken.token){
        async function initIsStar(){
          const { houseCode } = props.houseDetail
          const { token } = props.userToken
          const {data:{body}} = await requestIsStar(houseCode, token)
          setIsStar(body.isFavorite)
        }
        initIsStar()
      }
    },[])

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

    // 點擊收藏與否
    function handleStar(){
      if(isStar){
        // 刪除收藏
        Toast.show('刪除收藏');
        setIsStar(false)
        deleteStar()
      }else{
        // 添加收藏
        Toast.show('添加收藏成功')
        setIsStar(true)
        addStar()
      }
    }

    // 收藏
    async function addStar(){
      const { houseCode } = props.houseDetail
      const { token } = props.userToken
      const {data} = await requestAddStar(houseCode, token)
      console.log(data);
    }

    // 點擊取消收藏
    async function deleteStar(){
      const { houseCode } = props.houseDetail
      const { token } = props.userToken
      const {data} = await requestDeleteStar(houseCode, token)
      console.log(data);
    }

    return (
      <div className='houseDetail'>
        <MyNavBar title={'房屋詳情'}/>

        {/* Swiper */}
        <Swiper Swiper autoplay loop>
          {
            houseImg.map((item, index) => (  
            <Swiper.Item key ={ index }> 
              <img src={`http://localhost:8080${item}`} alt="" style={{width: '100%', height: '222px', verticalAlign: 'bottom'}}/>
            </Swiper.Item >
            ))
          }
        </Swiper> 

        {/* info */}
        <div className="houseDetail_info">
          <h3>{props.houseDetail.title}</h3>
          <div className="houseDetail_tags">
            {props.houseDetail.tags.map((item, index) => <div key={index} className='tag'>{item}</div>)}
          </div>
          <div className="houseDetail_first">
            <div><span className='highLight'>{props.houseDetail.price} 元/月</span><span>租金</span></div>
            <div><span className='highLight'>{props.houseDetail.roomType}</span><span>房型</span></div>
            <div><span className='highLight'>{props.houseDetail.size}平米</span><span>面積</span></div>
          </div>
          <div className="houseDetail_second">
            <div><span>裝修 : </span><span className='highLight'>{props.houseDetail.tags.indexOf('精装') === -1 ? '平裝' : '精裝'}</span></div>
            <div><span>朝向 : </span><span className='highLight'>{props.houseDetail.oriented}</span></div>
            <div><span>樓層 : </span><span className='highLight'>{props.houseDetail.floor}</span></div>
            <div><span>類型 : </span><span className='highLight'>普通住宅</span></div>
          </div>
        </div>

        {/* small map */}
        <div className="houseDetail_smallMap" style={{ width: '100%', height: '200px' }}>
          <h4 className="community">小區：{props.houseDetail.community}</h4>
          <APILoader akay="b63cd488b30aca0a7bb04eda8fd9e378">
            <Map 
              center={[props.houseDetail.coord.longitude, props.houseDetail.coord.latitude]}
              zoom={17}
              >
              <Marker 
              position={[props.houseDetail.coord.longitude, props.houseDetail.coord.latitude]}
              label={{
              // 设置文本标注内容
              content: `<div class='info'>${props.houseDetail.community}</div>`,
              // 设置文本标注方位
              direction: 'bottom'
              }}/>
            </Map>
          </APILoader>
        </div>

        {/* supporting */}
        <div className="houseDetail_supporting">
          <h4 className='supporting_head'>房屋配套</h4>
          <div className='supporting_body'>
            {
              props.houseDetail.supporting.length === 0 ? <div>暫無數據</div> :
              props.houseDetail.supporting.map(
                (item,index) => <div className='supporting_item' key={index}>{item} <CheckOutline color='limegreen' /></div>
              )
            }
          </div>
        </div>

        {/* footer */}
        <div className="houseDetail_footer">
          {/* 登錄後收藏功能 */}
          {
            // 判斷是否有登錄
            props.userToken.token ? 
            <span onClick={ handleStar }>
              { isStar? <StarFill color='red'/> : <StarOutline color='#333'/>}
              { isStar? '已收藏' : '收藏' }
            </span>
               
              //  沒有登錄 會彈出登錄框
            : <span onClick={showLoginTips}><StarOutline color='#333'/>收藏</span>
          }
          {/* 顯示登錄提示 */}
          <span>在線諮詢</span>
          <span className='booking'>電話預約</span>
        </div>
      </div>
    )
  }
)


