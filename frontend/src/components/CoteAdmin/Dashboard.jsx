
import './Dashboard.css';
import { useState } from 'react'
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
//import MethodeStock from './page/Stock.jsx';
import Main from './pages/Main.jsx';
function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className='grid-container-dashboard'>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Header OpenSidebar={OpenSidebar}/>
      <Main/>
    </div>
  );
}

export default Dashboard;
