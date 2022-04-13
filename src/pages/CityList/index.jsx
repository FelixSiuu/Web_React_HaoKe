import React, { useEffect, useState } from 'react'
import { Toast } from 'antd-mobile'       
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getCityAction } from '../../redux/actions'
import MyNavBar from '../../componenets/MyNavBar'
import { requestCityList,requestHotCity } from '../../apis/request.js'
import './index.css'

export default connect(
  state => ({
    cityInfo: state.cityInfo
  }),
  {getCityAction},
)(
  function CityList(props){
    const [ elevator ] =  useState([
      'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
    ])
    const [ cityList, setCityList ] = useState([])
    const [ hotCity, setHotCity ] = useState([])
    const navigate = useNavigate()
  
    useEffect(()=>{
      // 獲取所有城市列表  需要回傳城市等級參數 1級為城市列表 2為城市下區列表
      async function initCityList(){
        const {data: {body}} = await requestCityList(1)
        setCityList(body)
      }
      initCityList()
  
      // 獲取熱門城市
      async function initHotCity(){
        const {data: {body}} = await requestHotCity()
        setHotCity(body)
      }
      initHotCity()
    },[])
  
    // 選擇城市
    function handleClick(e){
      // 設置當前選擇城市
      props.getCityAction({label:e.target.innerText, value: e.target.getAttribute('value')})
      Toast.show ({
        content: `已選擇: ${e.target.innerText}`
      })
      setTimeout(()=>{navigate(-1)},1000)
    }
  
    // 點擊顯示高亮
    function computedClassName(e){
      const siblings = e.target.parentNode.children
      for( let i = 0; i < siblings.length ; i ++ ){
        siblings[i].className = 'active'
      }
      e.target.className = 'myNavLink';
    }
  
    return (
      <div>
          <MyNavBar title={'城市選擇'} /> 
  
          <div className="cityList">
            {/* 側邊欄 */}
            <div className="cityList_elevator">
              <a onClick={computedClassName} href="##">#</a>
              <a onClick={computedClassName} href="#HOT">熱</a>
              {elevator.map((item,index) => <a onClick={computedClassName} key={index} href={`#${item}`}> {item} </a>)}
            </div>
  
            {/* 城市列表主體 */}
            {/* 當前選擇 */}
            <div className="cityList_main" id="#">
              <div className="cityList_main_head">
               當前選擇城市
              </div>
              <div className="cityList_main_item">
                {props.cityInfo.label}
              </div> 
            </div>
  
            {/* 熱門 */}
            <div className="cityList_main" id="HOT">
              <div className="cityList_main_head">
               熱門城市
              </div>
              {
                hotCity.map((item, index) => <div key={index} className="cityList_main_item cityList_hot" onClick={handleClick} value={item.value}>{item.label}</div> )
              }
            </div>
  
            {/* 其餘 */}
            {
              elevator.map((item,index) => {
                // 頭部 首字母
                return (
                  <div className="cityList_main" key={index} id={`${item}`}>
                    <div className="cityList_main_head">
                      {item}
                    </div>
                    {/* 根據首字母篩選並歸類 */}
                    {
                      cityList.filter(cityName => cityName.pinyin.charAt(0).toUpperCase() === item ).map((cityItem,index) => {
                        return (
                          <div className="cityList_main_item" key={index} onClick={handleClick} value={cityItem.value}> {cityItem.label} </div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
      </div>
    )
  }
)

