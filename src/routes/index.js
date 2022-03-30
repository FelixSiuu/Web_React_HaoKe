import { Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import CityList from '../pages/CityList'

export const routes = [
  { path:'/home', element:<Home/> },
  { path:'/citylist', element:<CityList/> },
  { path:'/' , element:<Navigate to="/home"/> }
] 