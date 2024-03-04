
import './app2.css';
import { useState } from 'react'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'

import Home from './pages/Home.jsx';
import Main from './pages/Main.jsx';

function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className='grid-container'>
     {/* <Accueil></Accueil> */}
     <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Main/>
      

    </div>
  );
}

export default Dashboard;
