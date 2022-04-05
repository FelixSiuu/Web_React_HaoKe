import {GETAREAID} from '../constant.js'

const initState = {
  label: "杨浦", 
  value: "AREA|67fad918-f2f8-59df", 
  coord :{latitude: "31.29397421", longitude: "121.5361245"} , 
  count: 49 }

export default function getAreaReducer(preState = initState, action){
  const { data, type } = action
  switch(type){
    case GETAREAID:
    return data
    default: return preState
  }
}