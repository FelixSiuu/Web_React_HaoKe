import { GETHISTORYLIST } from '../constant.js'

const initState = []

export default function historyListReducer(preState=initState, action){
  const {data, type} = action
  switch(type){
    case GETHISTORYLIST: return [...data, ...preState]
    default: return preState
  }
}