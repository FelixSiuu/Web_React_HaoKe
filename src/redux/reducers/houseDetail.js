import { GETHOUSEDETAIL } from '../constant.js'

const initState = {}

export default function getHouseDetailReducer(preState=initState, action){
  const {data, type} = action
  switch(type){
    case GETHOUSEDETAIL: return data
    default: return preState
  }
}