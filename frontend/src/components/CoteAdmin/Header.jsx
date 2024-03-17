import React from 'react'
import { BsJustify}from 'react-icons/bs';
import { MdNotifications } from "react-icons/md";
import { FcSearch,FcPortraitMode } from "react-icons/fc";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
function Header({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon2' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
        <TextField
          placeholder="rechercher"
          className='search'
          type="search"
          variant="outlined"
          fullWidth
          size="small"
          InputProps={{
              startAdornment: (
                  <InputAdornment position="start">
                      <FcSearch className='icon'/>
                  </InputAdornment>
                    ),
                }}
        />
        </div>
        <div className='header-right'>
            <MdNotifications className='icon icon-header-notif'/>
            <FcPortraitMode className='icon icon-header-portrait'/>
        </div>
    </header>
  )
}

export default Header