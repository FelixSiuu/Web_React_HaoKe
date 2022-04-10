import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar } from 'antd-mobile' 
import './index.css'

export default function MyNavBar(props) {
  // return to the last page
  const navigate = useNavigate()
  function back(){
    navigate(-1)
  }

  function getPosition(){
    return props.position
  }
  
  return (
    <div className='myNavBar'>
      {/* 需接受title props 可選position */}
      < NavBar onBack = { back } style={{position: getPosition() }} >{props.title}</ NavBar > 
    </div>
  )
}
