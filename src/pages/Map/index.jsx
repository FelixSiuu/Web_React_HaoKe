import React from 'react'
import  MyNavBar from '../../componenets/MyNavBar'
import MapContainer from '../../componenets/MapContainer'

export default function Map() {
  return (
    <div className="map">   
      <MyNavBar title={'地圖找房'}/>
      < MapContainer />
    </div>
  )
}
