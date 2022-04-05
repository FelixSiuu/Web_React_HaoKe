import {GETHOUSTLIST} from '../constant.js'

const initState = []

export default function getHoustListReducer(preState = initState, action){
  const { data, type } = action
  switch(type){
    case GETHOUSTLIST:
    return data
    default: return preState
  }
}