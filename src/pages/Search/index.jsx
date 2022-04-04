import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchOutline } from 'antd-mobile-icons' 
import './index.css'

export default function Search() {
  const navigate = useNavigate()
  function goBack(){
    navigate(-1)
  }
  return (
    <div>
      <div className="Search_search_bar">
        <span className='Search_search_icon'><SearchOutline fontSize={18}/></span>
        <input type="text" className='Search_search_input' placeholder='請輸出小區或地址'/>
        <span className='Search_search_return' onClick={goBack}>取消</span>
      </div>
      <div className="Search_history">
        <h3 className='Search_noResult'>暫無歷史紀錄</h3>
      </div>
    </div>
  )
}
