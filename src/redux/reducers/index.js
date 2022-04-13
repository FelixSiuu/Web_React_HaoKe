import cityInfo from './map.js'
import area from './area.js'
import houseList from './houseList.js'
import houseDetail from './houseDetail.js'
import userToken from './user.js'
import userInfo from './userInfo.js'
import historyList from './historyList.js'
// 該文件用於匯總所有的reducers

// 引入combineReducers來連結多個reducer
import {combineReducers} from 'redux'
//  引入為store對象服務的reducer
// 合併reducer 裡面存著各狀態
export default combineReducers({
  cityInfo,
  area,
  houseList,
  houseDetail,
  userToken,
  userInfo,
  historyList
})
