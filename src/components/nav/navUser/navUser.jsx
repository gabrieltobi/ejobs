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
                    <a href='/jobs'>
                        <div className='btn btn-link icon-left'>
                            <FontAwesomeIcon icon={faBriefcase} />
                            Minhas Vagas
                        </div>
                    </a>
                    <a href='/jobs'>
                        <div className='btn btn-link icon-left'>
                            <FontAwesomeIcon icon={faChartLine} />
                            Oportunidades
                        </div>
                    </a>
                </div>

                <div className='nav-actions'>
                    <a href='#'>
                        <div className='btn btn-link'>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                    </a>

                    <a href='#' onClick={this.logout}>
                        <div className='btn btn-link'>
                            {person.name}
                        </div>

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