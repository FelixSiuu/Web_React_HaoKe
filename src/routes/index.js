import { Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import User from '../pages/User'
import HouseList from '../pages/HouseList'
import Info from '../pages/Info'
import CityList from '../pages/CityList'
import Search from '../pages/Search'
import Map from '../pages/Map'

export const routes = [
  { path: '/home', element: <Home/> },
  { path: '/user', element: <User/> },
  { path: '/houselist', element: <HouseList/> },
  { path: '/info', element: <Info/> },
  { path: '/citylist', element: <CityList/> },
  { path: '/search', element: <Search/> },
  { path: '/map', element: <Map/> },
  { path: '/' , element: <Navigate to="/home"/> },
]