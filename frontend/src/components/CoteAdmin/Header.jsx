import React from 'react'
import { FcSearch} from "react-icons/fc";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import NotifCulture from './pages/Agriculture/NotifCulture';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSignOutAlt } from "react-icons/fa";
import { useUser } from '../UserContext';
import './Header.css'
function Header({ toggleSidebar }) {
  const userName  = useUser().user.nom;
  console.log("user",useUser().user.nom)
  const handleLogout = async () => {
    localStorage.removeItem('authToken');
    window.location.href = '/';
    // try {
    //   await axios.post('/logout');
    //   // Logout successful, redirect user to login page
    //   navigate('/');
    // } catch (error) {
    //   console.error('Logout failed:', error);
    //   // Handle logout failure
    // }
  };
  return (
    <header className='header d-flex align-items-center'>
    <span className='burger d-flex'> <GiHamburgerMenu  onClick={toggleSidebar} /></span>
    <div className='header-left d-flex me-auto'>
    <div className='search-container mx-auto '>
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
    </div>
    <div className='header-right d-flex ms-auto '>
      <NotifCulture/>
      <div class="dropdown text-end  ">
        <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle"/>
          <span style={{marginLeft:'5px'}}>{userName || 'User'}</span>
        </a>
        <ul class="dropdown-menu text-small">
          <li><a class="dropdown-item" href="/"> <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle"/><span style={{marginLeft:'5px'}}>Profile</span></a></li>
          <li><hr class="dropdown-divider"/></li>
          <li><a class="dropdown-item" href="/"style={{marginLeft:'5px'}} onClick={handleLogout}>Sign out <FaSignOutAlt /></a></li>
        </ul>
      </div>
    </div>
</header>
  )
}

export default Header;