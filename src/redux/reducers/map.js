import {GETCITY} from '../constant.js'

const initState = {label: '香港', value: 'xxx'}

export default function mapReducer(preState = initState, action){
  const { data, type } = action 
  switch(type){
    case GETCITY:
    return data
    default: return preState
  }
}

