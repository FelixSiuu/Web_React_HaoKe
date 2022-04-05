import {GETCITY} from '../constant.js'
import {GETAREAID} from '../constant.js'
import {GETHOUSTLIST} from '../constant.js'

// 獲取城市label
export const getCityAction = cityObj => {return {type:GETCITY, data: cityObj}}

// 獲取地區id
export const getAreaAction = areaObj => {return { type: GETAREAID, data: areaObj}}

// 獲取房屋列表
export const getHouseListAction = listArr => {return { type: GETHOUSTLIST, data: listArr}}