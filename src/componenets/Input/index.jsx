import React from 'react'
import './index.css'

// 父組件傳placeholder可以自定義
// 傳saveText 或 savePwd 可得value

export function MyText(props){
  return(
    <div className="text">
      <input type="text" id={props.id} placeholder={props.placeholder} onChange={(e)=>{props.saveText(e.target.value)}}/>
    </div>
  )
}

export function MyPassWord(props){
  return (
    <div className="password">
      <input type="password" id={props.id} autoComplete="on" placeholder={props.placeholder} onChange={e => props.savePwd(e.target.value)}/>
    </div>
  ) 
}

export function MySubmit(props){
  return (
    <input type="submit" className='submit' value={props.value} />
  )
}