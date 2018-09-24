import './navUser.scss'

import React, { Component } from 'react'
import logo from '../../../images/logo.png'
import userNoPhoto from '../../../images/user-no-photo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faChartLine, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import firebase from 'firebase'

class NavUser extends Component {
    logout = () => {
        firebase.auth().signOut()
    }

    render() {
        const person = this.props.person || {}

        return (
            <nav className='nav-user'>
                <a className='nav-logo' href='/'>
                    <img src={logo} alt='Logo do Site' />
                </a>

                <div className='nav-actions'>
                    <a href='/jobs' className='btn btn-link'>
                        <FontAwesomeIcon icon={faBriefcase} className='mr-2' />
                        Minhas Vagas
                    </a>
                    <a href='/jobs' className='btn btn-link'>
                        <FontAwesomeIcon icon={faChartLine} className='mr-2' />
                        Oportunidades
                    </a>
                </div>

                <div className='nav-actions'>
                    <a className='btn btn-link' onClick={this.logout} role='button'>
                        <a href='#' className='btn btn-link' role='button'>
                            <FontAwesomeIcon icon={faEnvelope} className='mr-2' />
                            {person.name}
                        </a>

                        <img
                            className='nav-user-img'
                            src={person.photo || userNoPhoto}
                            alt='Foto do Usuário'
                        />
                    </a>
                </div>
            </nav>
        )
    }
}

export default NavUser