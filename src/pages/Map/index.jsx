import React from 'react'
import  MyNavBar from '../../componenets/MyNavBar'
import MapContainer from '../../componenets/MapContainer'

export default function Map() {
  return (
    <div className="map"  style={{height: '100%'}}>   
      <MyNavBar title={'地圖找房'} position={'fixed'}/>
      < MapContainer />
    </div>
  )
}
