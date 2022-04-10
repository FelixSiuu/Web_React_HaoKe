import { GETCITY } from '../constant.js'
import { GETAREAID } from '../constant.js'
import { GETHOUSTLIST } from '../constant.js'
import { GETHOUSEDETAIL } from '../constant.js'
import { GETUSERTOKEN } from '../constant.js'
import { GETUSERINFO } from '../constant.js'


// 獲取城市label
export const getCityAction = cityObj => {return {type:GETCITY, data: cityObj}}

// 獲取地區id
export const getAreaAction = areaObj => {return { type: GETAREAID, data: areaObj}}

// 獲取房屋列表
export const getHouseListAction = listArr => {return { type: GETHOUSTLIST, data: listArr}}

// 獲取房屋具體信息
export const getHouseDetailAction = houseObj => {return { type: GETHOUSEDETAIL, data: houseObj }}

// 獲取用戶token
export const getUserTokenAction = userTokenObj => {return { type: GETUSERTOKEN, data: userTokenObj }}

// 獲取用戶資料
export const getUserInfoAction = userInfoObj => {return { type: GETUSERINFO, data: userInfoObj }}