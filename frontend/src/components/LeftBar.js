import "./LeftBar.css";
import { Link, useLocation} from "react-router-dom";
import { 
  HomeOutlined, HomeFilled,
  IdcardOutlined, IdcardFilled,
  PlusCircleOutlined, PlusCircleFilled
} from '@ant-design/icons'
import { useEffect, useState } from "react";
const logo = require('../images/icon.svg').default;

function LeftBar() {

  const location = useLocation()
  const [currentTab, setCurrentTab] = useState()

  useEffect(()=>{
    setCurrentTab(location.pathname.split('/')[1])
  }, [location])

  
  return (
    <div className="leftBarContent">
      <img src={logo} alt="web3" />
      <div className="menu">
          <Link to="/" className="link" >
          <div className="menuItems">
            {currentTab === '' ? <HomeFilled/> : <HomeOutlined/>}
          </div>
          </Link>
          <Link to="/my-blogs" className="link">
          <div className="menuItems">
            {currentTab === 'my-blogs' ? <IdcardFilled/> : <IdcardOutlined/>}
          </div>
          </Link>
          <Link to="/new-blog" className="link">
          <div className="menuItems">
            {currentTab === 'new-blog' ? <PlusCircleFilled/> : <PlusCircleOutlined/>}
          </div>
          </Link>
      </div>
      <div></div>
    </div>
  );
}

export default LeftBar;
