import React, { Component } from 'react'
import logo from '../../../images/logo.png'
import './nav.scss'

class Nav extends Component {
    render() {
        return (
            <nav className='nav-anonymous'>
                <a className='nav-logo' href='/'>
                    <img src={logo} alt='Logo do Site' />
                </a>

                <div className='nav-actions'>
                    <a href='/login'>
                        <button type='button' className='btn btn-secondary'>Empresas</button>
                    </a>
                    <a href='/signup'>
                        <button type='button' className='btn btn-primary'>Candidato</button>
                    </a>
                </div>
            </nav>
        )
    }
}

export default Nav