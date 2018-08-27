import React, { Component } from 'react'
import logo from '../../images/logo.png'
import './nav.scss'

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faCoffee } from '@fortawesome/free-solid-svg-icons'

class Nav extends Component {
    render() {
        return (
            <nav className='container-fluid nav-anonymous'>
                <div className='row'>
                    <div className="col">
                        <img className='nav-logo' src={logo} alt="Logo do Site"/>
                    </div>
                    <div className="col">
                        b
                    </div>
                    <div className="col">
                        c
                    </div>
                </div>
            </nav>
        )
    }
}

export default Nav