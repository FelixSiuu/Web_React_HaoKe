import React, { useEffect, useState } from 'react';
import { Map, APILoader, ScaleControl, ToolBarControl, Geolocation, Marker } from '@uiw/react-amap';
import { requestCityInfo, requestMapHouse } from '../../apis/request.js';
import { connect } from 'react-redux'
import { getCityAction } from '../../redux/actions/map.js'
 
/* // 獲取當前位置經緯度
navigator.geolocation.getCurrentPosition(location => {
  const { coords: {longitude,latitude} } = location
  console.log('當前位置的信息對象', longitude,latitude); */

export default connect(
  state => ({
    cityInfo: state.cityInfo
  }),
  {getCityAction},
)(
  function MapComponent(props){
    const [MapHouse, setMapHouse] = useState([])

    useEffect(()=>{
      // 獲取地圖房源數據 需傳房屋id參數
      async function initMapHouse(){
        const {data:{body}} = await requestMapHouse(props.cityInfo.value)
        if(MapHouse.length === 0){
          setMapHouse(body)
        }
      }
      initMapHouse()
    })

    return (
      <APILoader akay="b63cd488b30aca0a7bb04eda8fd9e378">
        <div style={{ width: '100%', height: '622px' }}>
          <Map zoom={5}>
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
                  const { data:{body} } = await requestCityInfo(data.province)
                  // 向redux傳送action對象
                  props.getCityAction(body)
                }
                initCityInfo()
              }}
            />
            {
              MapHouse.map((item,index) => {
                const {count,label,coord} = item
                return (
                  <Marker key={index}
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
    )
  }
)


