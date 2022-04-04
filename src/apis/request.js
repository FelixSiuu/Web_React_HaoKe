import axios from 'axios'

// swiper
export const requestSwiper = function(){
  return axios.get('http://localhost:8080/home/swiper')
}

// group
export const requestGroup = function(){
  return axios.get('http://localhost:8080/home/groups',{
    params:{
      area: 'AREA%7C88cff55c-aaa4-e2e0'
    }
  })
}

// news
export const requestNews = function(){
  return axios.get('http://localhost:8080/home/news',{
    params:{
      area: 'AREA%7C88cff55c-aaa4-e2e0'
    }
  })
}

// city info
export const requestCityInfo = function(name){
  return axios.get(`http://localhost:8080/area/info?name=${name}`)
}

// city list
export const requestCityList = function(level){
  return axios.get(`http://localhost:8080/area/city?level=${level}`)
}

// hot city
export const requestHotCity = function(){
  return axios.get('http://localhost:8080/area/hot')
}

// map house info
export const requestMapHouse = function(id){
  return axios.get('http://localhost:8080/area/map',{
    params:{
      id
    }
  })
}