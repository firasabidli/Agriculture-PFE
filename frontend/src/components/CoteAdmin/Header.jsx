import React from 'react'
import 
 {BsFillBellFill, BsPersonCircle, BsJustify}
 from 'react-icons/bs'

function Header({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon2' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            
        </div>
        <div className='header-right'>
            <BsFillBellFill className='icon'/>
            
            <BsPersonCircle className='icon'/>
        </div>
    </header>
  )
}

export default Header