import React, { useEffect, useState } from 'react';
import { Map, APILoader, ScaleControl, ToolBarControl, Geolocation, Marker } from '@uiw/react-amap';
import { requestCityInfo, requestMapHouse, requestHouseList } from '../../apis/request.js';
import { connect } from 'react-redux'
import { getCityAction, getAreaAction, getHouseListAction } from '../../redux/actions'
import HouseListContainer from '../../componenets/HouseListContainer'
import './index.css'

export default connect(
  state => ({
    cityInfo: state.cityInfo,
    area: state.area,
    houseList: state.houseList
  }),
  {getCityAction,
    getAreaAction,
  getHouseListAction}
)(
  // 參考高德地圖v2.7.3
  function MapContainer(props){
    // 地圖房源標注點
    const [MapHouse, setMapHouse] = useState([])
    // 控制房屋列表懸浮窗顯示與否
    const [show, setShow] = useState(false)
    // 地圖中心點位置
    const {longitude,latitude} = props.area.coord
    const [center, setCenter] = useState([Number(longitude), Number(latitude)])

    /*  // 點擊房屋標注點更改中心點
    function changeCenter(){
      const {longitude,latitude} = props.area.coord
      setCenter([Number(longitude), Number(latitude)])
    } */

    // 獲取地圖房源數據 需傳城市value參數
    useEffect(()=>{
      async function initMapHouse(){
        const {data:{body}} = await requestMapHouse(props.cityInfo.value)
        if(MapHouse.length === 0){
          setMapHouse(body)
        }
      }
      initMapHouse()
    })
    
    // 獲取房屋列表數據，需傳地區value參數
    async function initHouseList(){
      const {data:{body:{list}}} = await requestHouseList(props.area.value)
      // 向redux傳房屋列表數據
      props.getHouseListAction(list)
    }

    return (
      <div  style={{height: '100%'}}>
        <APILoader akay="b63cd488b30aca0a7bb04eda8fd9e378">
          <div className='mapContainer'>
            <Map zoom={11} onClick={()=>{setShow(false)}} center={center}>
              <ScaleControl offset={[16, 30]} position="LB" />
              <ToolBarControl offset={[16, 10]} position="RB" />
              <Geolocation
                type="cityInfo"
                // 定位按钮的停靠位置
                offset={[15, 80]}
                // 定位成功后是否自动调整地图视野到定位点
                zoomToAccuracy={true}
                onComplete={(data) => {
                  console.log('地圖定位數據：', data);
                  async function initCityInfo(){
                    // 向接口回傳一個城市的name值
                    const { data:{body} } = await requestCityInfo(data.city)
                    // 向redux傳送cityInfo對象
                    props.getCityAction(body)
                  }
                  initCityInfo()
                }}
              />
              { 
                // 房源標注點
                MapHouse.map((item,index) => {
                  const {count,label,coord} = item
                  return (
                    <Marker key={index} 
                      onClick={ 
                        ()=>{
                          setShow(true); 
                          // 向redux傳area對象
                          props.getAreaAction(item);  
                          // 發送axios請求更新房屋列表
                          initHouseList()
                        }
                      }
                      offset={()=>{new AMap.Pixel(-13, -30)}}
                      position={[coord.longitude, coord.latitude]}
                      label={{
                      // 设置文本标注内容
                      content: `<div class='info'>${label} : ${count}個房源數據</div>`,
                      // 设置文本标注方位
                      direction: 'bottom'
                      }}
                    />
                  )
                })
              }
            </Map>
          </div>
        </APILoader>
        <div style={show? {height: '50%'} : {height: '0'}} className="houseList_map">
          <HouseListContainer></HouseListContainer>
        </div> 
      </div>
      
    )
  }
)


