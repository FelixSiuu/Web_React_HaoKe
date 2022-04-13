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

// house list
export const requestHouseList = function(cityId,price,rentType,end){
  return axios.get(`http://localhost:8080/houses`,{
    params:{
      cityId,
      price,
      rentType,
      end
    }
  })
}

// house detail
export const requestHouseDetail = function(houseCode){
  return axios.get(`http://localhost:8080/houses/${houseCode}`)
}

// login
export const requestLogin = function(username,password){
  return axios.post('http://localhost:8080/user/login',{
    username,
    password
  })
}

// logOut
export const requestLogOut = function(access_token){
  return axios.post('http://localhost:8080/user/logout',{
    params:{}
  },{
    headers: {
      'Authorization': access_token
    }
  })
}

// get user info
export const requestGetUserInfo = function(access_token){
  return axios.get('http://localhost:8080/user',{
    headers: {
      'Authorization': access_token
    }
  })
}

// register
export const requestRegister = function(user, pwd){
  return axios.post('http://localhost:8080/user/registered',{
    "username": user,
    "password": pwd
  })
}

// edit profile
export const requestEditProfile = function(avatar,gender,nickname,phone,access_token){
  return axios.patch('http://localhost:8080/user',{
      avatar,
      gender,
      nickname,
      phone
  },{
    headers: {
      'Authorization': access_token
    }
  })
}

// get star list
export const requestGetStarList = function(access_token){
  return axios.get('http://localhost:8080/user/favorites',{
    headers:{
      'Authorization': access_token
    }
  })
}

// add star
export const requestAddStar = function(houseCode,access_token){
  return axios.post(`http://localhost:8080/user/favorites/${houseCode}`,{
    params:{}
  },{
    headers:{
      'Authorization': access_token
    }
  })
}

// is star?
export const requestIsStar = function(houseCode,access_token){
  return axios.get(`http://localhost:8080/user/favorites/${houseCode}`,{
    headers:{
      'Authorization': access_token
    }
  })
}

// delete star
export const requestDeleteStar = function(houseCode,access_token){
  return axios.delete(`http://localhost:8080/user/favorites/${houseCode}`,{
    headers:{
      'Authorization': access_token
    }
  })
}

// get community 
export const requestGetCommunity = function(name,id){
  return axios.get(`http://localhost:8080/area/community?name=${name}&id=${id}`)
}

// sell 
export const requestSell = function(title, description, houseImg, oriented, supporting, price, roomType, size, floor, community, access_token){
  return axios.post('http://localhost:8080/user/houses',{
    title,
    description,
    houseImg,
    oriented,
    supporting,
    price,
    roomType,
    size,
    floor,
    community
  },{
    headers:{
      'Authorization': access_token
    }
  })
}

// get rent list
export const requestRentList = function(access_token){
  return axios.get('http://localhost:8080/user/houses',{
    headers:{
      Authorization: access_token
    }
  })
}

// refrest rent list
export const requestRefteshList = function(houseCode,isDelete, access_token){
  return axios.patch(`http://localhost:8080/user/houses/${houseCode}`,{
    shelf: isDelete
  },{
    headers:{
      Authorization: access_token
    }
  })
}