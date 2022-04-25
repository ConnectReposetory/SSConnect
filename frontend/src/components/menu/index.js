import {useState} from "react";
import {Link, NavLink} from "react-router-dom";
import {ABOUT_PATH, AGENDA_PATH, PARTNER_PATH} from "../../routes";
import './styles.css'
function Menu() {

  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const menuClasses = ['menu'];
  if(hamburgerOpen){
    menuClasses.push('open')
  }

  const closeMenu = (e) => {
    setHamburgerOpen(false);
  }

  return (
      <div className={menuClasses.join(" ")}>
        <div className='hamburgerContainer'>
          <div className='hamburger' onClick={()=>setHamburgerOpen(!hamburgerOpen)}></div>
        </div>
        <ul>
          <li className='menuItem'>
            <NavLink onClick={closeMenu} activeClassName='active' to={AGENDA_PATH}>Agenda</NavLink>
          </li>
          <li>
            <NavLink onClick={closeMenu} activeClassName='active' to={ABOUT_PATH}>Over ons</NavLink>
          </li>
          <li>
            <NavLink onClick={closeMenu}  activeClassName='active' to={PARTNER_PATH}>Partners</NavLink>
          </li>
        </ul>
      </div>
  );
}

export default Menu
