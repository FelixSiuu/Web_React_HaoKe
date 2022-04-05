import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Swiper } from 'antd-mobile'
import './index.css'
import Header from '../../componenets/Header'
import Footer from '../../componenets/Footer'
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'
// get swiper request
import { requestSwiper } from '../../apis/request.js'
// get group
import { requestGroup } from '../../apis/request.js'
// get news
import { requestNews } from '../../apis/request.js'
import { connect } from 'react-redux'
import { getCityAction } from '../../redux/actions/'

export default connect(
  state => ({
    cityInfo: state.cityInfo
  }),
  {getCityAction},
)(
  function Home() {
    // hook: useState
    const [swiper,setSwiper] = useState([])
    const [group, setGroup] = useState([])
    const [news, setNews] = useState([])
  
    // hook: useEffect 
    useEffect(() => {
      // 獲取後台輪播圖數據
      async function initSwiper(){
        const {data:{body}} = await requestSwiper()
        setSwiper(body)
      }
      initSwiper()
  
      // 獲取租房小組
      async function initGroup(){
        const {data: {body}} = await requestGroup()
        setGroup(body);
      }
      initGroup()
  
      // 獲取最新資訊
      async function initNews(){
        const {data:{body}} = await requestNews()
        setNews(body)
      }
      initNews()
  
      // 指定空[],相當於componentDidMount
    },[])
    
    const [navBar] = useState([
      { icon: nav1, title: '整租', pathName:'/houselist' },
      { icon: nav2, title: '合租', pathName:'/houselist' },
      { icon: nav3, title: '地圖找房', pathName:'/map' },
      { icon: nav4, title: '去出租' , pathName:'nav4' }
    ])
  
    return (
      <div>
        <Header></Header>
  
        {/* Swiper */}
        < Swiper autoplay loop >
          {
            swiper.map (item => ( 
              < Swiper.Item key = { item.id }>
                <img src={`http://localhost:8080${item.imgSrc}`} alt="" style={{width: '100%', verticalAlign: 'bottom'}} />
              </ Swiper.Item >
            ))
          }
        </ Swiper > 
  
        {/* nav bar */}
        <div className="navBar">
          {
            navBar.map((item,index) => {
              return (
                <div className="nav_item" key={index}>
                  <Link to={item.pathName}>
                    <img src={item.icon} alt="" />
                    <div>{item.title}</div>
                  </Link>
                </div>
              )
            })
          }
        </div>
  
        {/* rent group */}
        <div className="group">
          <div className="group_head">
            <h3>租房小組</h3>
            <Link to="/houselist">更多</Link>
          </div>
          <div className="group_body">
            {
              group.map(item => {
                return (
                  <div className="group_item" key={item.id}>
                    <div className="left">
                      <h4>{item.title}</h4>
                      <div>{item.desc}</div>
                    </div>
                    <div className="right">
                      <img src={`http://localhost:8080${item.imgSrc }`} alt="" />
                    </div>
                  </div>
                )
              })
            }
            
          </div>
        </div>
  
        {/* news */}
        <div className="news">
          <div className="news_head">
            <h3>最新資訊</h3>
          </div>
          {
            news.map(item => {
              return (
                <div className="news_item" key={item.id}>
                  <div className="left">
                    <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
                  </div>
                  <div className="right">
                    <h4 className="title">{item.title}</h4>
                    <div className="label">
                      <div className="label_left">{item.from}</div>
                      <div className="label_right">{item.date}</div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
  
        <Footer></Footer>
      </div>
    )
  }
)


