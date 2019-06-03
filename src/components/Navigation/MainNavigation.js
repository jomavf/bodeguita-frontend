import React from 'react'
import { NavLink } from 'react-router-dom'

import './MainNavigation.css'

const mainNavigation = props => (
    <header className="main-navigation">
        <div className="main-navigation__logo">
            <h1>EasyProject</h1>
        </div>
        <nav className="main-navigation__items">
            <ul>
                <li><NavLink to="/auth">Authenticate</NavLink></li>
                {localStorage.token && <li><NavLink to="/products">Products</NavLink></li>}
                {localStorage.token && <li><NavLink to="/categories">Categories</NavLink></li>}
            </ul>
        </nav>
    </header>
)

export default mainNavigation