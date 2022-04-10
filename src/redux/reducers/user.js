import { GETUSERTOKEN } from '../constant.js'

const initState = {}

export default function getUserTokenReducer(preStete = initState, action){
  const {data, type} = action
  switch(type){
    case GETUSERTOKEN: return data
    default: return preStete
  }
}