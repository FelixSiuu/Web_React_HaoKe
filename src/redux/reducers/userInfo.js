import { GETUSERINFO } from '../constant.js'

const initState = {}

export default function userInfoReducer(preState=initState, action){
  const {data, type} = action
  switch(type){
    case GETUSERINFO: return data
    default: return preState
  }
}