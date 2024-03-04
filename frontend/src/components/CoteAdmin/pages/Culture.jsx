import { useState, React } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';

const Culture = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
    return (
        <div className='grid-container'>
        
        <Header OpenSidebar={OpenSidebar}/>
         <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
         
         <main className='main-container'>
        <div className='main-title'>
            <h3>Culture</h3>
        </div>

    </main>
   
       </div>
    );
};

export default Culture;