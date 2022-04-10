import { Navigate } from 'react-router-dom'
import Map from '../pages/Map'
import Home from '../pages/Home'
import User from '../pages/User'
import HouseList from '../pages/HouseList'
import Info from '../pages/Info'
import CityList from '../pages/CityList'
import Search from '../pages/Search'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Profile from '../pages/Profile'
import Star from '../pages/Star'
import MyRent from '../pages/MyRent'
import FootPrint from '../pages/FootPrint'
import Sell from '../pages/Sell'
import Contact from '../pages/Contact'
import HouseDetail from '../pages/HouseDetail'

export const routes = [
  { path: '/home', element: <Home/> },
  { path: '/user', element: <User/> },
  { path: '/houselist', element: <HouseList/> },
  { path: '/info', element: <Info/> },
  { path: '/citylist', element: <CityList/> },
  { path: '/search', element: <Search/> },
  { path: '/map', element: <Map/> },
  { path: '/housedetail', element: <HouseDetail/> },
  { path: '/login', element: <Login/> },
  { path: '/register', element: <Register/> },
  { path: '/profile' , element: <Profile /> },
  { path: '/star' , element: <Star /> },
  { path: '/myrent' , element: <MyRent /> },
  { path: '/footprint' , element: <FootPrint /> },
  { path: '/sell' , element: <Sell /> },
  { path: '/contact' , element: <Contact /> },
  { path: '/' , element: <Navigate to="/home"/> },
]