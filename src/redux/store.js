//  該文件用來引入一個Store對象， 整個應用只有一個store對象
// 引入redux內部的createStore()，專門用於創建最為核心的store對象
// combineReducers來合併多個reducer
import {createStore} from 'redux'
// 引入一個總的reducers
import allReducers from './reducers/index.js' 
// 引入redux-persist相關文件 以作本地緩存
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage: storage,
};

// 將persist配置與reducers進行封裝
const persistedReducer = persistReducer(persistConfig, allReducers);
// 將store與新的persistreducer進行封裝
const store = createStore(persistedReducer);
export const persistor = persistStore(store);

//  導出store
export default store;