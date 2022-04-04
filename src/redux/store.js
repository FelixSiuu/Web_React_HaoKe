//  該文件用來引入一個Store對象， 整個應用只有一個store對象

// 引入redux內部的createStore()，專門用於創建最為核心的store對象

// combineReducers來合併多個reducer
import {createStore} from 'redux'
// 引入一個總的reducers
import allReducers from './reducers/index.js' 

//  導出store
export default createStore(allReducers)
