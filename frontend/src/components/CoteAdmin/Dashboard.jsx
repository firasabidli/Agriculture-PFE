
import './Dashboard.css';
import { useState } from 'react'
<<<<<<< HEAD
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
//import MethodeStock from './page/Stock.jsx';
import Main from './pages/Main.jsx';
=======
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
 import Main from './pages/Main.jsx';

>>>>>>> 03a8d329d00de439c49d19af1209b5a97224ee03
function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    // grid-container
    <div className='grid-dashboard'> 
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Header OpenSidebar={OpenSidebar}/>
      <Main/>
    </div>
  );
}

export default Dashboard;
