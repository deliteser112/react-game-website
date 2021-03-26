import React from 'react';
import Logo from '../icons/Logo';
import MenuIcon from '../icons/MenuIcon';

const Nav = () => <nav className="nav-bar">
  <div className="flex-row">
    <Logo size="43" />
    <span className="brand-line heading-font"> Imba</span>
  </div>
  {/* <MenuIcon size="20" color="white" /> */}
</nav>;


export default Nav;