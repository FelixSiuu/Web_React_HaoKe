import React from 'react'
import  MyNavBar from '../../componenets/MyNavBar'
import MapComponent from './MapContainer.js'

export default function Map() {
  return (
    <div className="map">   
      <MyNavBar title={'地圖找房'}/>

      {/*  參考高德地圖api官方文檔配置 */}
      < MapComponent />
    </div>
  )
}
