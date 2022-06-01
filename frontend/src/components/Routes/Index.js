import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Navbar from '../Navbar';
import BurgerMenu from '../BurgerMenu';
import IsLoggedBox from '../IsLoggedBox';
import Auth from '../../pages/Auth';
import Home from '../../pages/Home';
import Profile from '../../pages/Profile';
import Logout from '../../pages/Logout';
import headerLogo from'../../assets/headerLogo.png';
import footerLogo from'../../assets/footerLogo.png';

//
const Index = () => {
    

    return (
        
 
        <BrowserRouter>
            <div className='top-wrapper'>
            <header className="header">
                <div className="header__img-container">
                    <img className="header__logo" src={headerLogo} alt="logo Groupomania" />
                </div>
            </header>
            <BurgerMenu/>
            <IsLoggedBox />
            </ div>
            <Routes>
                <Route path="/auth/login" element={<Auth/>} />
                <Route path="/auth/logout" element={<Logout/>} />
                <Route path="/" element={<Home/>} />
                <Route path="/profile/*" element={<Profile/>} />
            </Routes>
            <footer className='footer'>
                <img className="footer__logo" src={footerLogo} alt="logo Groupomania" />
                <ul>
                    <li><a href="#">Mentions légales</a></li>  
                </ul>
                <ul>
                    <li><i className="fa fa-envelope-o" aria-hidden="true"></i><a href="mailto:contact@groupomania.com">Contact</a></li>
                </ul>
            </footer>
        </BrowserRouter>

    );
};

export default Index;