import React, { useState } from 'react'
import { Picker, Button, Space } from 'antd-mobile'
import { FilterOutline } from 'antd-mobile-icons'
import { basicColumns } from './basicColumns.js'
import { connect } from 'react-redux'
import { getHouseListAction } from '../../redux/actions'
import { requestHouseList } from '../../apis/request.js'
import './index.css'

export default connect(
  state => ({
    area: state.area,
    houseList: state.houseList
    }),
  {getHouseListAction}
)(
  function HouseFilter(props){

    const [visible, setVisible] = useState(false)
    const [value, setValue] = useState()

    // 點擊篩選確定
    async function handleConfirm(val){
      // 將篩選的條件傳參數發送請求 重新render house list
      // val[0]為價格參數, val[1]為 整租(true) 與 合租(false)參數
      const {data:{body:{list}}} = await requestHouseList(props.area.value, val[0],val[1])
      // 將新的house list回傳給redux 讓HouseListContainer組件重新渲染
      props.getHouseListAction(list)
    }
  
    return (
      <div className='houseFilter'>
        <Space align='center'>
          <Button onClick={() => {setVisible(true)}}> 篩選 <FilterOutline /> </Button>
          <Picker
            // 選項配置
            columns={basicColumns}
            visible={visible}
            onClose={() => {
              setVisible(false)
            }}
            value={value}
            // 點擊確定後設置value
            onConfirm={(val)=>{
              handleConfirm(val)
              setValue;
            }}
          >
            {items => {
              if (items.every(item => item === null)) {
                return '未選擇'
              } else {
                return items.map(item => item?.label ?? '未選擇').join(' - ')
              }
            }}
          </Picker>
        </Space>
      </div>
    )
  }
)

