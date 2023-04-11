import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.svg'

const Navbar = () => {
  // 第二步：建设 Navbar
  return (
    <nav className='navbar'>
      <div className='nav-center'> 
        {/* <Link to='/'>{logo}</Link>
        直接写 {logo} 无法注入图片，必须用 <img src=''> */}
      <Link to='/'>
        <img src={logo} alt='logo_image'></img>
      </Link>
        <ul className='nav-links'>
          <li>
            <Link to='/'>home</Link>
          </li>
          <li>
            <Link to='/about'>about</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
