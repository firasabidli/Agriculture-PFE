import { useState, React } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Main from './Main';
const Home = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
    return (
        <div className='grid-container'>
        
        <Header OpenSidebar={OpenSidebar}/>
         <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
         
         
         <Main/>

    
   
       </div>
    );
};

export default Home;