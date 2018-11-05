import './nav.scss'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import NavAnonymus from './navAnonymus/navAnonymus'
import NavUser from './navUser/navUser'
import { connectToApp } from '../connectToApp/connectToApp'

import logo from '../../images/logo.png'

class Nav extends Component {
    render() {
        const { userLoaded, user, person } = this.props

        let nav = <NavAnonymus />

        if (user) {
            nav = <NavUser person={person} />
        }

        return (
            <nav className='pcd-nav border-bottom p-2 shadow-sm d-flex align-items-center'>
                <Link to='/' className='logo'>
                    <img src={logo} alt='Logo do PCD Jobs' />
                </Link>

                {userLoaded && nav}
            </nav>
        )
    }
}

export default connectToApp(Nav)