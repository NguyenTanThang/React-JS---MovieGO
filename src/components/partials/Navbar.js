import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {navbarScroll} from "../../utils";
import { authenticationService } from "../../_services";

const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <span class="material-icons">
        home
    </span>,
    cName: 'nav-text'
  },
  {
    title: 'Search',
    path: '/search',
    icon: <span class="material-icons">
        search
    </span>,
    cName: 'nav-text'
  },
  {
    title: 'Browse',
    path: '/browse',
    icon: <span class="material-icons">
        explore
    </span>,
    cName: 'nav-text'
  },
  {
    title: 'Images',
    path: '/images',
    icon: <span class="material-icons">
        image
    </span>,
    cName: 'nav-text'
  },
  {
    title: 'Sign In',
    path: '/sign-in',
    icon: <span class="material-icons">
        login
    </span>,
    cName: 'nav-text'
  },
  {
    title: 'Create Account',
    path: '/sign-up',
    icon: <span class="material-icons">
        person_add
    </span>,
    cName: 'nav-text'
  },
];

const SidebarDataLoggedIn = [
  {
    title: 'Home',
    path: '/',
    icon: <span class="material-icons">
        home
    </span>,
    cName: 'nav-text'
  },
  {
    title: 'Search',
    path: '/search',
    icon: <span class="material-icons">
        search
    </span>,
    cName: 'nav-text'
  },
  {
    title: 'Browse',
    path: '/browse',
    icon: <span class="material-icons">
        explore
    </span>,
    cName: 'nav-text'
  },
  {
    title: 'Images',
    path: '/images',
    icon: <span class="material-icons">
        image
    </span>,
    cName: 'nav-text'
  },
  ,
  {
    title: 'Watch Later',
    path: '/watch-later',
    icon: <span class="material-icons">
        favorite
    </span>,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <span class="material-icons">
        account_circle
    </span>,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: <span class="material-icons">
        logout
    </span>,
    cName: 'nav-text'
  },
];

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    navbarScroll()
  }, [])

  const showSidebar = () => setSidebar(!sidebar);

  const renderSideBar = () => {
    if (authenticationService.currentUserValue) {
      return SidebarDataLoggedIn.map((item, index) => {
        return (
          <li key={index} className={item.cName}>
            <Link to={item.path}>
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </li>
        );
      })
    } else {
      return SidebarData.map((item, index) => {
        return (
          <li key={index} className={item.cName}>
            <Link to={item.path}>
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </li>
        );
      })
    }
  }

  const renderMenuRight = () => {
    if (authenticationService.currentUserValue) {
      return (
        <ul>
              <li>
                <Link to='/profile' className="btn btn-dark">
                  PROFILE
                </Link>
              </li>
            </ul>
      )
    } else {
      return (
        <ul>
              <li>
                <Link to='/sign-in' className="btn btn-dark">
                  SIGN IN
                </Link>
              </li>
              <li>
                <Link to='/sign-up' className="btn btn-dark">
                  CREATE ACCOUNT
                </Link>
              </li>
            </ul>
      )
    }
  }

  return (
    <>
        <div className='navbar' id="navbar">
          <div className="container-fluid">
          <div className="navbar-menu-left">
            <div className="navbar-menu-toggle">
              <Link to='#' className='menu-bars'>
                <span class="material-icons" onClick={showSidebar}>
                    menu
                </span>
              </Link>
            </div>

            <div className="navbar-menu-brand">
              <Link to='/'>
                <h2>MOVIE<span className="text-color-primary">GO</span></h2>
              </Link>
            </div>
          </div>

          <div className="navbar-menu-right">
            {renderMenuRight()}
          </div>
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <span class="material-icons">
                    close
                </span>
              </Link>
            </li>
            {renderSideBar()}
          </ul>
        </nav>
    </>
  );
}

export default Navbar;