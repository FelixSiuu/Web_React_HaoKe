import React, { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAreaAction, getHouseListAction } from '../../redux/actions'
import './index.css'

export default connect(
  state => ({
    cityInfo: state.cityInfo,
    area: state.area,
    houseList: state.houseList
  }),
  {getAreaAction,
  getHouseListAction}
)(
  function HouseListContainer(props){

    const loacation = useLocation()

    function togglePathName(){
      switch(loacation.pathname){
        case '/houselist': return '/map'
        case '/map': return '/houselist'
      }
    }

    return (
      <div>
        <div className='houseList'>
          <div className="houseList_head">
            <h3 className="left">房屋列表</h3>
            <Link to={togglePathName()}><h4 className="right">更多房源</h4></Link>
          </div>
          <div className="houseList_body">
          {
            props.houseList.map(item => {
              return (
                <div className="houseList_item" key={ item.houseCode } onClick={()=>{console.log('houselist item')}}>
                  <div className="houseList_item_left">
                    <img src={`http://localhost:8080${ item.houseImg }`} alt="" />
                  </div>
                  <div className="houseList_item_right">
                    <h4 className="title">{ item.title }</h4>
                    <div className="description">{ item.desc }</div>
                    <span className="tags">{ item.tags }</span> 
                    <div className="price">{ item.price } 元/月</div>
                  </div>
                </div>
              )
            })
          }
          </div>
        </div>
      </div>
    )
  }
)
