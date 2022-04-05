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
  
  return (
    <div>
      {/* 需接受title props */}
      < NavBar onBack = { back } >{props.title}</ NavBar > 
    </div>
  )
}
