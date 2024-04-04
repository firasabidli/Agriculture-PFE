
import './Dashboard.css';
import { useState } from 'react'
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
//import MethodeStock from './page/Stock.jsx';
import Main from './pages/Main.jsx';
function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [page, setPage] = useState('Home');
	
    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };
  return (
    // grid-container
    <div className='wrapper'> 
      <Sidebar isSidebarCollapsed={isSidebarCollapsed}  page={page} />
      <div className="flex-grow-1">
      <Header toggleSidebar={toggleSidebar}/>
      <Main/>
      </div>
    </div>
  );
}

export default Dashboard;
