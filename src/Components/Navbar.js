// components/Navbar/index.js

import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./navbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to="/about" >
                        About
                    </NavLink>
                    <NavLink to="/leaderboards" activeStyle>
                        Leaderboards
                    </NavLink>
                    <NavLink to="/distribution" activeStyle>
                        Rank Distribution
                    </NavLink>
                    <NavLink to="/team" activeStyle>
                        Teams
                    </NavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                {/* <NavBtn>
                    <NavBtnLink to="/signin">
                        Sign In
                    </NavBtnLink>
                </NavBtn> */}
            </Nav>
        </>
    );
};

export default Navbar;
