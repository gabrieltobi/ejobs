import React, { Component } from 'react'
import logo from '../../../images/logo.png'
import './navLoading.scss'

class NavLoading extends Component {
    render() {
        return (
            <nav className='nav-loading'>
                <a className='nav-logo' href='/'>
                    <img src={logo} alt='Logo do Site' />
                </a>
            </nav>
        )
    }
}

export default NavLoading