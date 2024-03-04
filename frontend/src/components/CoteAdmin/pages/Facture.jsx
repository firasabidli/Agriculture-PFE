import { useState, React } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';

const Facture = () => {
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
            <h3>Facture</h3>
        </div>

    </main>
   
       </div>
    );
};

export default Facture;