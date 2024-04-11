import React from 'react'
import { FcSearch} from "react-icons/fc";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import NotifCulture from './pages/Agriculture/NotifCulture';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSignOutAlt } from "react-icons/fa";
import { useUser } from '../UserContext';
import './Header.css'
import { Link } from 'react-router-dom';
function Header({ toggleSidebar }) {
  const userName  = useUser().user.nom;
  const userImage=useUser().user.image;
  const defaultImage = 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png';

  const getImageSource = () => {
    // Vérifie si userImage est une URL HTTP
    const isHttpUrl = userImage && userImage.startsWith('http');

    if (isHttpUrl) {
      return userImage;
    } else if (userImage) {
      return `http://localhost:3001/images/Utilisateur/Admin/${userImage}`;
    } else {
      return defaultImage;
    }
  };
  console.log("user",useUser().user.image)
  const handleLogout = async () => {
    localStorage.removeItem('authToken');
    window.location.href = '/';
  };
  return (
    <header className='header d-flex align-items-center'>
    <span className='burger d-flex'> <GiHamburgerMenu  onClick={toggleSidebar} /></span>
    <div className='header-left d-flex '>
    <div className='search-container  '>
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
        <Link class="d-block link-body-emphasis text-decoration-none dropdown-toggle " data-bs-toggle="dropdown" aria-expanded="false">
          <img src={getImageSource()}
            alt={userName} width="32" height="32" class="rounded-circle"/>
          <span style={{marginLeft:'5px'}}>{userName || 'User'}</span>
        </Link>
        <ul class="dropdown-menu text-small">
          <li><Link to="/admin/Profile" class="dropdown-item" href="/"> <img src={getImageSource()} alt="mdo" width="32" height="32" class="rounded-circle"/><span style={{marginLeft:'5px'}}>Profile</span></Link></li>
          <li><hr class="dropdown-divider"/></li>
          <li><a class="dropdown-item" href="/"style={{marginLeft:'5px'}} onClick={handleLogout}>se déconnecte <FaSignOutAlt /></a></li>
        </ul>
      </div>
    </div>
</header>
  )
}

export default Header;