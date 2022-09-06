import React, { useEffect } from 'react';
import "./navbar.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { HiViewList } from "react-icons/hi"
import { NavLink } from "react-router-dom";
import Search from "./search";

const Navbar = () => {
  const [scrolled, setScrolled] = React.useState(false); //state understanding 

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true); //way to change the value of state default is false mention in 15
    }
    else {
      setScrolled(false);
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  })

  let x = ['navbar'];
  if (scrolled) {
    x.push('scrolled');
  }
  return (
    <header className={x.join(" ")}>
      <div class="navvcontainer">
        <div id="navst-box">
          <TwitterIcon className="twitterIcon" />
        </div>
        <div id="navnd-box">
          <Search />
        </div>

        <div id="navrd-box">
          <nav className="navigation">
            <ul>

              <li>
                <NavLink to="/viewMyTweet"><HiViewList />View My Tweet</NavLink>
              </li> 

              <li>
                <NavLink to="/AllUsers"><HiViewList />View Users</NavLink>
              </li>

              <li>
                <NavLink to="/home"><AiFillHome />Home</NavLink>
              </li>

              <li>
                <NavLink to="/logout"><AiOutlineLogout />Logout</NavLink>
              </li>



            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
  //ask to pratik 
};

export default Navbar;