import React from 'react';
import { Map, APILoader, ScaleControl, ToolBarControl, Geolocation, Marker, } from '@uiw/react-amap';
import { requestCityInfo } from '../../apis/request.js';
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

    return (
      <APILoader akay="b63cd488b30aca0a7bb04eda8fd9e378">
        <div style={{ width: '100%', height: '622px' }}>
          {/* zoom: 地圖顯示距離 */}
          <Map zoom={7}>
            <ScaleControl offset={[16, 30]} position="LB" />
            <ToolBarControl offset={[16, 10]} position="RB" />
            <Geolocation
              type="cityInfo"
              // 是否使用高精度定位，默认:true
              enableHighAccuracy={true}
              // 超过10秒后停止定位，默认：5s
              timeout={10000}
              // 定位按钮的停靠位置
              buttonPosition="RT"
              offset={[16, 80]}
              // 定位成功后是否自动调整地图视野到定位点
              zoomToAccuracy={true}
              onComplete={(data) => {
                async function initCityInfo(){
                  // 向接口回傳一個城市的name值
                  const {data:{body}} = await requestCityInfo(data.province)
                  // 返回的結果
                  props.getCityAction(body)
                }
                initCityInfo()
              }}
            />
            <Marker
            title="北京市"
            // offset={new AMap.Pixel(-13, -30)}
            label={{
              // 设置文本标注偏移量
              // offset: new AMap.Pixel(20, 20),
              // 设置文本标注内容
              content: "<div class='info'>我是 marker 的 label 标签</div>",
              // 设置文本标注方位
              direction: 'right'
            }}
            position={(AMap)=>{
              console.log(AMap);
              new AMap.LngLat(117.283042 ,31.86119)
            }}
            />
          </Map>
        </div>
      </APILoader>
    )
  }
)


