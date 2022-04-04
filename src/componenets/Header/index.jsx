import React from 'react'
import {useNavigate} from 'react-router-dom'
import { UserCircleOutline,SearchOutline } from 'antd-mobile-icons'
import { connect } from 'react-redux'
import { getCityAction } from '../../redux/actions/map.js'
import './index.css'

export default connect(
  state => ({
    cityInfo: state.cityInfo
  }),
  {getCityAction},
)( 
  function Header(props) {
  // hook: useNavigate
  const navigate = useNavigate()

  // go to city list page
  function goToCityList(){
    navigate('/citylist')
  }

  // go to search page
  function goToSearch(){
    navigate('/search')
  }

  // go to map page
  function goToMap(){
    navigate('/map')
  }

    return (
      <div className='header'>
        <div className="left">
          <div className="selectCity" onClick={goToCityList}>{props.cityInfo.label}</div>
          <div className='Header_search'>
            <span className='Header_search_icon'><SearchOutline fontSize={18}/></span>
            <input className='Header_search_bar' type="text" placeholder='請輸入小區或地址' onClick={goToSearch}/>
          </div>
        </div>
        <div className="right" onClick={goToMap}><UserCircleOutline fontSize={18}/></div>
      </div>
    )
})

